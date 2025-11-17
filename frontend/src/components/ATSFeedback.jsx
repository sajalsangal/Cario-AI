import React from 'react'

const ATSFeedback = ({ feedback }) => {
    if (!feedback) return null;
    if (feedback.error) return <p className="text-red-500">{feedback.error}</p>;

    const { score, skills_detected, missing_keywords, formatting_issues, summary } =
        feedback;


    return (
        <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">
                ATS Resume Analysis
            </h2>

            {score && (
                <p className="text-lg font-semibold mb-3">
                    Overall ATS Score:{" "}
                    {score > 75 ? (
                        <span className="text-green-600">{score}/100</span>
                    ):(
                        <span className="text-red-600">{score}/100</span>
                    )
                    }
                    
                </p>
            )}

            {summary && <p className="text-gray-700 mb-4 text-justify">{summary}</p>}

            {skills_detected && (
                <>
                    <h3 className="font-semibold text-gray-800">Detected Skills:</h3>
                    <div className="flex flex-wrap gap-2 my-2">
                        {skills_detected.map((s, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </>
            )}

            {missing_keywords && (
                <>
                    <h3 className="font-semibold text-gray-800 mt-4">Missing Keywords:</h3>
                    <ul className="list-disc ml-6 text-red-600">
                        {missing_keywords.map((k, i) => (
                            <li key={i}>{k}</li>
                        ))}
                    </ul>
                </>
            )}

            {formatting_issues && (
                <>
                    <h3 className="font-semibold text-gray-800 mt-4">Formatting Issues:</h3>
                    <ul className="list-disc ml-6 text-yellow-700">
                        {formatting_issues.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                </>
            )}

            {/* {feedback.rawText && (
                <details className="mt-4">
                    <summary>Raw Gemini Output</summary>
                    <pre className="text-xs bg-gray-100 p-3 rounded-lg overflow-auto">{feedback.rawText}</pre>
                </details>
            )} */}

        </div>

    )
}

export default ATSFeedback
