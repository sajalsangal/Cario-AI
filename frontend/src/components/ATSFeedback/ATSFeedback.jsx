import React from 'react'

const ATSFeedback = ({ feedback }) => {
    if (!feedback) return null;
    if (feedback.error) return <p className="text-red-500">{feedback.error}</p>;

    const { score, skills_detected,experience, projects, missing_keywords, formatting_issues, summary } =
        feedback;


    return (
        <div className="mt-6 bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4 text-center">
                ATS Resume Analysis
            </h2>

            {score && (
                <p className="text-base sm:text-lg font-semibold mb-3">
                    Overall ATS Score:{" "}
                    {score > 75 ? (
                        <span className="text-green-600">{score}/100</span>
                    ) : (
                        <span className="text-red-600">{score}/100</span>
                    )
                    }

                </p>
            )}

            {summary && <p className="text-sm sm:text-base text-gray-700 mb-4 text-justify">{summary}</p>}

            {skills_detected && (
                <div>
                    <h3 className="font-semibold text-gray-800">Skills:</h3>
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
                </div>
            )}

            {experience && (
                <div>
                    <h3 className="font-semibold text-gray-800 mt-6">Experience:</h3>
                    <ol className="flex flex-wrap gap-2 ml-6 list-decimal text-sm sm:text-base mb-4 text-justify">
                    {experience.map((e,i) => (
                        <li key={i} className='text-green-600 '>{e}</li>
                    ))}
                    </ol>
                </div>
            )}

            {projects && (
                <div>
                    <h3 className="font-semibold text-gray-800 mt-6">Projects:</h3>
                    <ol className="flex flex-wrap gap-2 ml-6 list-decimal text-sm sm:text-base mb-4 text-justify">
                    {projects.map((p,i) => (
                        <li key={i} className='text-green-600 '>{p}</li>
                    ))}
                    </ol>
                </div>
            )}

            {missing_keywords && (
                <div>
                    <h3 className="font-semibold text-gray-800 mt-4">Missing Keywords:</h3>
                    <ul className="list-disc ml-6 text-red-600">
                        {missing_keywords.map((k, i) => (
                            <li key={i}>{k}</li>
                        ))}
                    </ul>
                </div>
            )}

            {formatting_issues && (
                <div>
                    <h3 className="font-semibold text-gray-800 mt-4">Formatting Issues:</h3>
                    <ul className="list-disc ml-6 text-yellow-700">
                        {formatting_issues.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ATSFeedback
