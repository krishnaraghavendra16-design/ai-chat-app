try {
    // 1. Corrected the fetch URL to include your API key
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }]
        })
    });

    const data = await response.json();
    
    // 2. Added safety checks to prevent crashes if the API returns an error
    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from AI.";

    return new Response(JSON.stringify({ reply: aiMessage }), {
        headers: { 'Content-Type': 'application/json' },
    });
} catch (error) {
    console.error("Fetch error:", error); // This will show in your Netlify logs
    return new Response(JSON.stringify({ reply: 'Failed to fetch' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
}