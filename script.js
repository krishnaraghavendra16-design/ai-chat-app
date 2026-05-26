// script.js
document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const window = document.getElementById('chat-window');
    const userText = input.value;

    if (userText.trim() === "") return;

    // Display user message
    window.innerHTML += `<p><b>You:</b> ${userText}</p>`;
    input.value = "";

    // Send to secure backend
    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            body: JSON.stringify({ message: userText })
        });
        const data = await response.json();
        
        // Display AI response
        window.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
    } catch (err) {
        window.innerHTML += `<p style="color:red;">Error: Could not connect to AI.</p>`;
    }
});