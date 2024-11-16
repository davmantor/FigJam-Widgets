const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI Configuration
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Route to Generate Poll
app.post("/generatePoll", async (req, res) => {
    try {
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({ error: "Comment is required." });
        }

        const prompt = `
        Turn the following comment into a Likert-scale poll question and options. 
        The output format should be:

        Question: <poll question>
        Options:
        - Option 1
        - Option 2
        - Option 3
        - Option 4
        - Option 5

        Comment: "${comment}"`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            max_tokens: 300,
            messages: [
                {
                    role: "system",
                    content: `You are a poll generation assistant that formats Likert-scale questions and options.`,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        if (response && response.choices && response.choices.length > 0) {
            const generatedText = response.choices[0].message.content.trim();
            const lines = generatedText.split("\n").map((line) => line.trim());
            const question = lines[0].replace("Question:", "").trim();
            const labels = lines
                .slice(1)
                .filter((line) => line.startsWith("-"))
                .map((line) => line.replace("-", "").trim());

            return res.json({ question, labels });
        } else {
            throw new Error("Failed to get a valid response from GPT-4");
        }
    } catch (error) {
        console.error("Error generating poll:", error);
        res.status(500).json({ error: "Failed to generate poll." });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
