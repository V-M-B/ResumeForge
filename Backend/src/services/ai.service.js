const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

// Hand-written JSON schema for Gemini's responseSchema
// zodToJsonSchema was producing an empty schema, causing Gemini to ignore it
const interviewReportJsonSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            description: "The title of the job for which the interview report is generated"
        },
        matchScore: {
            type: "number",
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        },
        technicalQuestions: {
            type: "array",
            description: "Technical questions that can be asked in the interview",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The technical question" },
                    intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
                    answer: { type: "string", description: "How to answer this question, what points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "array",
            description: "Behavioral questions that can be asked in the interview",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The behavioral question" },
                    intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
                    answer: { type: "string", description: "How to answer this question, what points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: "array",
            description: "List of skill gaps in the candidate's profile",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string", description: "The skill the candidate is lacking" },
                    severity: { type: "string", enum: ["low", "medium", "high"], description: "How important is this skill gap" }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            description: "A day-wise preparation plan for the candidate",
            items: {
                type: "object",
                properties: {
                    day: { type: "number", description: "The day number, starting from 1" },
                    focus: { type: "string", description: "The main focus of this day" },
                    tasks: {
                        type: "array",
                        items: { type: "string" },
                        description: "Tasks to do on this day"
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate a comprehensive interview preparation report for a candidate.
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Please provide:
- A job title
- A match score (0-100)
- At least 5 technical questions with intention and model answers
- At least 3 behavioral questions with intention and model answers
- Skill gaps with severity levels
- A 7-day preparation plan with daily tasks`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportJsonSchema,
        }
    })

    let parsed = JSON.parse(response.text)
    if (Array.isArray(parsed)) {
        parsed = parsed[0]
    }

    return parsed
}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--single-process"
        ]
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = {
        type: "object",
        properties: {
            html: {
                type: "string",
                description: "The HTML content of the resume which can be converted to PDF"
            }
        },
        required: ["html"]
    }

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        
                        CRITICAL FORMATTING RULES:
                        - The HTML must have ZERO margin and ZERO padding on the body and html elements. Use: html, body { margin: 0; padding: 0; }
                        - The candidate's name should be at the very top with margin-top: 0 and padding-top: 0.
                        - Use a compact, tight layout. Line height should be 1.4 to 1.5 max.
                        - Section margins should be small (8px to 12px between sections).
                        - Use a clean sans-serif font like Arial or Calibri.
                        - Font size: Name 20px, Section headings 13px bold uppercase, Body text 11px.
                        - Use a thin colored line (2px) under the name as a divider.
                        - Section headings should have a subtle bottom border.
                        - Keep everything left-aligned and clean. No centered text except the name and contact info.
                        - Contact info (email, phone, location) should be on ONE line right below the name, separated by " | ".
                        - DO NOT use excessive padding, margins, or whitespace anywhere.
                        
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience.
                        The content should not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        Keep the design simple, professional, and ATS friendly.
                        The resume should ideally be 1 page long when converted to PDF. Focus on quality rather than quantity.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePdfSchema,
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }