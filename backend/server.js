// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// ---- Storage for uploaded resume (stored in RAM) ----
let uploadedResumeBuffer = null;

// ---- Multer setup ----
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ---- ENV Variables ----
const PORT = process.env.PORT || 5000;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

// ========================
// 1️⃣ UPLOAD RESUME FILE
// ========================
app.post("/upload-resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No PDF uploaded" });
  }

  uploadedResumeBuffer = req.file.buffer;

  return res.json({
    success: true,
    message: "Resume uploaded successfully",
    fileName: req.file.originalname,
  });
});

// ==============================
// 2️⃣ EXTRACT SKILLS FROM RESUME
// ==============================
app.post("/extract-skills", async (req, res) => {
  try {
    const {apiKey} = req.body;
    if (!uploadedResumeBuffer) {
      console.log("Enter a resume in pdf format");
      return res.status(400).json({ error: "No resume uploaded yet" });
    }

    // Parse text using pdf-parse
    const parsed = await pdfParse(uploadedResumeBuffer);
    const resumeText = parsed.text.trim();

    if (!resumeText) {
      return res
        .status(400)
        .json({ error: "Failed to extract text from PDF" });
    }

    // Gemini prompt
    const prompt = `
Extract ONLY the skills from the following resume.
Return strictly a JSON array.

Example:
["Python", "SQL", "Machine Learning"]

Resume:
"""${resumeText}"""
`;

    const url = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const gemResp = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { timeout: 30000 }
    );

    let rawText =
      gemResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse skills
    let skills = [];
    try {
      skills = JSON.parse(rawText);
    } catch {
      skills = rawText
        .split(/,|\n/)
        .map((s) => s.replace(/[\[\]"]/g, "").trim())
        .filter(Boolean);
    }

    skills = [...new Set(skills)];

    return res.json({ success: true, skills, raw: rawText });
  } catch (err) {
    console.error("Error in extract-skills:", err);
    return res.status(500).json({ error: "Skill extraction failed" });
  }
});

// =======================
// 3️⃣ FETCH MATCHING JOBS
// =======================
app.post("/fetch-jobs", async (req, res) => {
  const employmentMap = {
  "Fulltime": "FULLTIME",
  "Part-time": "PARTTIME",
  "Contract": "CONTRACTOR",
  "Internship": "INTERN",
  "all-types": ''
};

const timeframeMap = {
  "Today": "today",
  "Three Days": "3days",
  "This Week": "week",
  "This Month": "month",
  "All time": "all"
};

const experienceMap = {
  "No_experience": "no_experience",
  "Entry Level": "under_3_years_experience",
  "Mid Level": "more_than_3_years_experience",
  "No Degree": "no_degree",
  "all-experience" : ''
};

const remoteMap = {
  "true" : true,
  "false" : false
}

  try {
    const { apiKey, skills, fulltime, timeframe, experience, remotework } = req.body;
    const employmentType = employmentMap[fulltime] || "FULLTIME";
    const datePosted = timeframeMap[timeframe] || "all";
    const expValue = experienceMap[experience] || undefined;
    const remoteVal = remoteMap[remotework] || false;

    if (!skills?.length) {
      
      return res
        .status(400)
        .json({ error: "No skills provided to fetch jobs" });
    }

    // Ask Gemini for job titles
    const prompt = `
Skills: ${skills.join(", ")}

Return EXACTLY 3 real-world job titles in JSON array only.

["Data Analyst", "Backend Developer", "ML Engineer"]
`;

    const gemResp = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    let jobText =
      gemResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    jobText = jobText.replace(/```json|```/g, "").trim();

    let jobTitles = [];
    try {
      jobTitles = JSON.parse(jobText);
    } catch {
      jobTitles = jobText
        .split(/,|\n/)
        .map((t) => t.replace(/[\[\]"]/g, "").trim())
        .filter(Boolean);
    }

    jobTitles = [...new Set(jobTitles)].slice(0, 3);

    // Fetch jobs from JSearch
    const query = jobTitles.join(" OR ");

    const jResp = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query,
        num_pages: 1,
        country: "in",
        date_posted: datePosted,
        employment_types: employmentType,
        job_requirements: expValue,
        work_from_home : remoteVal

      },
      headers: {
        "X-RapidAPI-Key": process.env.JSEARCH_API_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    return res.json({
      jobTitles,
      jobs: jResp.data?.data || [],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Job fetch failed" });
  }
});

app.post("/analyze-resume", async (req, res) => {
  try {
    const { apiKey, jobDesc } = req.body;

    if (!uploadedResumeBuffer) {
      console.log("Enter a resume in pdf format");
      return res.status(400).json({ error: "No resume uploaded yet" });
    }

    const parsed1 = await pdfParse(uploadedResumeBuffer);
    const resumeText = parsed1.text.trim();

    if (!resumeText) {
      return res
        .status(400)
        .json({ error: "Failed to extract text from PDF" });
    }

    const prompt = `
You are an advanced Applicant Tracking System (ATS).
Evaluate the following resume text like an ATS would.

${jobDesc ? `Compare it against this Job Description:\n"""${jobDesc}"""\n` : ""}

Provide structured feedback as JSON with the following keys:
{
  "score": <number between 0 and 100>,
  "skills_detected": [list of top technical and soft skills],
  "missing_keywords": [skills or terms missing compared to the job description],
  "formatting_issues": [short bullet points of detected format issues],
  "summary": "2-3 line overall feedback on resume quality"
}

Resume Text:
"""${resumeText}"""
`;

    const url = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
      timeout: 40000,
    });

    // Extract raw model output
    let rawText =
      response?.data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("\n") || "";

    // 🧼 Clean Gemini formatting (remove markdown or ```json)
    rawText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/^\s+|\s+$/g, "");

    // Try parsing JSON output safely
    let parsed = {};
    try {
      parsed = JSON.parse(rawText);
    } catch (err) {
      console.warn("⚠️ Could not parse JSON. Returning raw output.");
      parsed = { rawText };
    }

    return res.json({ success: true, feedback: parsed });
  } catch (error) {
    console.error("❌ Error analyzing resume:", error?.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to analyze resume",
      details: error.message,
    });
  }
});

// --------------------------- Generate Questions ---------------------------
app.post("/api/generate", async (req, res) => {
  try {
    const { apiKey, jobDesc } = req.body;
    if (!jobDesc) {
      return res.status(400).json({ error: "Job description required" });
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const prompt = `
You are an AI interview assistant.
Based on the following job description, generate exactly 5 concise and specific interview questions.
Each question should be on a new line and contain no explanation or extra text.

Job Description:
${jobDesc}

Output format:
1. ...
2. ...
3. ...
4. ...
5. ...
`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000
    });

    const rawText =
      response?.data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("\n") || "";

    const questions = rawText
      .split(/\n+/)
      .map((q) => q.replace(/^\d+\s*[:.)-]?\s*/, "").trim()) // clean numbering
      .filter((q) => q && !/^output/i.test(q) && !/^here/i.test(q));

    if (questions.length === 0) throw new Error("No questions generated.");

    res.json({ questions });
  } catch (error) {
    console.error("❌ Error generating questions:", error?.response?.data || error.message);
    res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        error.message ||
        "Something went wrong while generating questions"
    });
  }
});

// --------------------------- Feedback Route ---------------------------
app.post("/api/feedback", async (req, res) => {
  try {
    const {apiKey, question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: "Question and answer required" });
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const prompt = `
You are an AI interview evaluator.
Analyze the candidate's answer to the given question.
Provide concise feedback in two sections:

Pros:
• 2–3 positive points about the answer

Cons:
• 2–3 short improvement points

Keep feedback structured and professional.

Question: ${question}
Answer: ${answer}
`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000
    });

    const feedback =
      response?.data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("\n") || "No feedback generated.";

    res.json({ feedback });
  } catch (error) {
    console.error("❌ Error generating feedback:", error?.response?.data || error.message);
    res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        error.message ||
        "Something went wrong while generating feedback"
    });
  }
});

// ROOT
app.get("/", (req, res) => res.send("Backend running…"));

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
