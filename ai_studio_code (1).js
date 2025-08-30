document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const initialMessageContainer = document.getElementById('initial-message-container');
    const thinkingIndicator = document.getElementById('thinking-indicator');
    const menuButton = document.getElementById('menu-button');
    const newChatButton = document.getElementById('new-chat-button');
    const sidebar = document.getElementById('sidebar');
    const settingsButton = document.getElementById('settings-button');
    const aboutValoriaButton = document.getElementById('about-valoria-button');
    const settingsModal = document.getElementById('settings-modal');
    const aboutModal = document.getElementById('about-modal');
    const modelToggle = document.getElementById('model-toggle');

    let chatHistory = [];
    let isInitialMessageShown = true;

    // --- Local Storage ---
    const saveChatHistory = () => {
        localStorage.setItem('keystoneChatHistory', JSON.stringify(chatHistory));
    };

    const loadChatHistory = () => {
        const storedHistory = localStorage.getItem('keystoneChatHistory');
        if (storedHistory) {
            chatHistory = JSON.parse(storedHistory);
            chatHistory.forEach(message => appendMessage(message.text, message.sender, false)); // Don't save again on load
            if (chatHistory.length > 0) {
                initialMessageContainer.classList.add('hidden');
                isInitialMessageShown = false;
            }
        }
    };

    const clearChatHistory = () => {
        chatHistory = [];
        localStorage.removeItem('keystoneChatHistory');
        chatContainer.innerHTML = '';
        initialMessageContainer.classList.remove('hidden');
        isInitialMessageShown = true;
    };

    // --- UI Functions ---
    const appendMessage = (text, sender, save = true) => {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('chat-bubble');
        messageBubble.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageBubble.innerHTML = sender === 'ai' 
            ? `<span>${text}</span><button class="tts-button" data-text="${text}">🔊</button>`
            : `<span>${text}</span>`;
        chatContainer.appendChild(messageBubble);

        if (save) {
            chatHistory.push({ text, sender });
      