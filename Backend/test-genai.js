require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

async function test(modelName) {
    try {
        console.log("Testing:", modelName);
        const res = await ai.models.generateContent({
            model: modelName,
            contents: 'hello',
        });
        console.log(modelName, "SUCCESS", res.text);
    } catch (e) {
        console.log(modelName, "ERROR", e.message);
    }
}

async function run() {
    await test("gemini-3-flash-preview");
    await test("gemini-2.5-flash");
}

run();
