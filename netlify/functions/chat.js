export const handler = async (event) => {
    try {
        const { message } = JSON.parse(event.body);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from AI.";

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: aiMessage })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: 'Failed to fetch from API' })
        };
    }
};