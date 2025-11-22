
## CarioAI – AI-Powered Job Assistance Platform
CarioAI is a one-stop AI job-seeker portal that brings `resume analysis`, `ATS scoring`, `job search`, `mock interviews`, `HR interview prep` and `tech news` into a single intelligent platform.
Built with React + Vite and Node.js for backend, it uses AI tools to help users prepare smarter and faster without switching between multiple websites.
________________________________________

<img width="1898" height="956" alt="image" src="https://github.com/user-attachments/assets/2f16790c-1c96-4a86-9ee2-cb2058cdeeac" />

<img width="1904" height="1033" alt="image" src="https://github.com/user-attachments/assets/b1f2e865-4b0c-4bb5-be3a-5fe3c834b08b" />

<img width="1900" height="1042" alt="image" src="https://github.com/user-attachments/assets/5e2ae91b-23ca-4206-a381-f0bbdde8bf27" />



### 🚀 Features
#### 📄 ATS Resume Score
-	Upload your resume and get an instant ATS score.
-	Highlights missing keywords and suggests improvements.
-	Shows tools/skills to add for a better match.
  
#### 🤖 AI Mock Interviews
-	Let our AI generate mock quiz questions based on your job description.
-	Get feedback on answers and tips to improve them.
  
#### 👔 HR Interview Q&A
-	Prepare with commonly asked interview questions.
-	Switch between HR Questions, Technical Questions and Behavioral Questions.
  
#### 🔍 Smart Job Search
-	Fetches jobs from multiple job portals.
-	Filters based on role, skills, and location.
-	Clean UI displaying job title, company, salary range, and job description.
  
#### 📰 AI Tech News
-	Stay updated with trending AI & tech news.
-	Helps job seekers stay industry-ready.

  ---
  
`🔑 Users must enter an API key (Gemini/AI key). It	Ensures privacy and secure personal data access.`
________________________________________
### 🛠️ Tech Stack
#### Frontend
-	React (Vite)
-	Tailwind CSS
-	Gemini API for AI features
- JSearch API

#### Backend
- Node.js 
- Express.js
- Multer – Middleware for handling file uploads (PDF/Resume upload)
- pdf-parse – PDF parsing library for extracting text from uploaded resumes

________________________________________

### 🚦 Getting Started
#### 1️⃣ Clone the project

```python
git clone https://github.com/sajalsangal/cario-ai.git
cd carioai
```

#### 2️⃣ Setup Environment Variables
Create a `.env` file in backend directory

```python
PORT=5000
GEMINI_MODEL=gemini-2.5-flash-lite
JSEARCH_API_KEY=your_jsearch_api_key
GENERATE_TEMPORARY_KEY=AIzaSyC4R1OqPpsAJaLISBEST92mLxF7mT0yH8wQ `fake key, includes as easter egg`
GEMINI_KEY=your_gemini_api_key
```

Create a `.env` file in frontend directory

```python
VITE_BACKEND_URL=http://localhost:5000
VITE_NEWS_API_KEY=your_newsapi.org_key
VITE_TEMPORARY_KEY=AIzaSyC4R1OqPpsAJaLISBEST92mLxF7mT0yH8wQ `fake key`
```
#### 3️⃣ Install dependencies and run project
Run these code lines in shell

```python
cd backend
npm install
node server.js
```

```python
cd frontend
npm install
npm run dev
```

4️⃣ Your app will run at:
http://localhost:5173
________________________________________
🌐 Live Project
🔗 https://cario-ai.vercel.app
