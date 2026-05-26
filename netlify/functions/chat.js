export default async (req, context) => {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        
        // Safety check to ensure the path exists before accessing it
        const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

        return new Response(JSON.stringify({ reply: aiMessage }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};