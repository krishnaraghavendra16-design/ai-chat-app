document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('user-input');
    const window = document.getElementById('chat-window');
    
    if (input.value.trim() !== "") {
        const msg = document.createElement('p');
        msg.textContent = "You: " + input.value;
        window.appendChild(msg);
        input.value = "";
    }
});