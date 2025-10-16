// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const charCount = document.getElementById('charCount');
const recordBtn = document.getElementById('recordBtn');
const stopRecordBtn = document.getElementById('stopRecordBtn');
const attachBtn = document.getElementById('attachBtn');
const apiBtn = document.getElementById('apiBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const cancelSettings = document.getElementById('cancelSettings');
const saveSettings = document.getElementById('saveSettings');
const themeSelect = document.getElementById('themeSelect');
const fontSize = document.getElementById('fontSize');
const apiKey = document.getElementById('apiKey');

// State
let isRecording = false;
let recognition = null;
let mediaRecorder = null;
let audioChunks = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadSettings();
});

function initializeApp() {
    // Auto-resize textarea
    messageInput.addEventListener('input', autoResizeTextarea);
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            messageInput.value = transcript;
            autoResizeTextarea();
            updateCharCount();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            stopRecording();
        };
        
        recognition.onend = function() {
            stopRecording();
        };
    } else {
        recordBtn.style.display = 'none';
    }
}

function setupEventListeners() {
    // Send message
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Character count
    messageInput.addEventListener('input', updateCharCount);
    
    // Voice recording
    recordBtn.addEventListener('click', startRecording);
    stopRecordBtn.addEventListener('click', stopRecording);
    
    // File attachment
    attachBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,.pdf,.txt,.doc,.docx';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        };
        input.click();
    });
    
    // API button
    apiBtn.addEventListener('click', function() {
        showApiInfo();
    });
    
    // Settings modal
    settingsBtn.addEventListener('click', function() {
        settingsModal.classList.add('show');
    });
    
    closeSettings.addEventListener('click', closeSettingsModal);
    cancelSettings.addEventListener('click', closeSettingsModal);
    
    saveSettings.addEventListener('click', function() {
        saveSettingsToStorage();
        closeSettingsModal();
        applySettings();
    });
    
    // Close modal on outside click
    settingsModal.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            closeSettingsModal();
        }
    });
    
    // Theme change
    themeSelect.addEventListener('change', applyTheme);
    fontSize.addEventListener('change', applyFontSize);
}

function autoResizeTextarea() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
}

function updateCharCount() {
    const count = messageInput.value.length;
    charCount.textContent = `${count}/2000`;
    
    if (count > 1800) {
        charCount.style.color = '#e74c3c';
    } else if (count > 1500) {
        charCount.style.color = '#f39c12';
    } else {
        charCount.style.color = '#666';
    }
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    messageInput.value = '';
    autoResizeTextarea();
    updateCharCount();
    
    // Disable send button
    sendBtn.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = generateBotResponse(message);
        addMessage(botResponse, 'bot');
        sendBtn.disabled = false;
    }, 1500 + Math.random() * 1000);
}

function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `
        <div>${formatMessage(content)}</div>
        <div class="message-time">${new Date().toLocaleTimeString()}</div>
    `;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessage(content) {
    // Simple formatting for links and basic markdown
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateBotResponse(userMessage) {
    // Simple response generation (replace with actual AI API call)
    const responses = [
        "That's an interesting question! Let me think about that...",
        "I understand what you're asking. Here's what I think...",
        "Great question! Based on my knowledge...",
        "I'd be happy to help with that. Let me explain...",
        "That's a good point. Here's my perspective...",
        "I see what you mean. Let me provide some insights...",
        "Thanks for sharing that! Here's what I can tell you...",
        "I appreciate your question. Let me break this down..."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some context-aware responses
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        return "Hello! I'm MyGenAI Chatbot. How can I assist you today?";
    } else if (userMessage.toLowerCase().includes('help')) {
        return "I'm here to help! You can ask me questions, have conversations, or get assistance with various topics. What would you like to know?";
    } else if (userMessage.toLowerCase().includes('thank')) {
        return "You're welcome! I'm glad I could help. Is there anything else you'd like to know?";
    } else if (userMessage.toLowerCase().includes('bye') || userMessage.toLowerCase().includes('goodbye')) {
        return "Goodbye! It was great chatting with you. Feel free to come back anytime!";
    }
    
    return randomResponse + " " + userMessage + " is something I can definitely help you explore further.";
}

function startRecording() {
    if (!recognition) return;
    
    isRecording = true;
    recordBtn.style.display = 'none';
    stopRecordBtn.style.display = 'inline-flex';
    
    try {
        recognition.start();
    } catch (error) {
        console.error('Error starting speech recognition:', error);
        stopRecording();
    }
}

function stopRecording() {
    isRecording = false;
    recordBtn.style.display = 'inline-flex';
    stopRecordBtn.style.display = 'none';
    
    if (recognition) {
        recognition.stop();
    }
}

function handleFileUpload(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        alert('File type not supported. Please upload images, PDFs, or text files.');
        return;
    }
    
    // Add file message
    addMessage(`📎 Uploaded file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`, 'user');
    
    // Here you would typically send the file to your API
    console.log('File uploaded:', file);
}

function showApiInfo() {
    const apiInfo = `
        <div style="text-align: left; font-family: monospace; background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            <h4>API Usage</h4>
            <p><strong>Endpoint:</strong> POST /api/chat</p>
            <p><strong>Headers:</strong></p>
            <pre>Content-Type: application/json
Authorization: Bearer YOUR_API_KEY</pre>
            <p><strong>Request Body:</strong></p>
            <pre>{
  "message": "Your message here",
  "conversation_id": "optional"
}</pre>
            <p><strong>Response:</strong></p>
            <pre>{
  "response": "Bot response",
  "conversation_id": "uuid"
}</pre>
        </div>
    `;
    
    addMessage(apiInfo, 'bot');
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('chatbotSettings') || '{}');
    
    if (settings.theme) {
        themeSelect.value = settings.theme;
        applyTheme();
    }
    
    if (settings.fontSize) {
        fontSize.value = settings.fontSize;
        applyFontSize();
    }
    
    if (settings.apiKey) {
        apiKey.value = settings.apiKey;
    }
}

function saveSettingsToStorage() {
    const settings = {
        theme: themeSelect.value,
        fontSize: fontSize.value,
        apiKey: apiKey.value
    };
    
    localStorage.setItem('chatbotSettings', JSON.stringify(settings));
}

function applySettings() {
    applyTheme();
    applyFontSize();
}

function applyTheme() {
    const theme = themeSelect.value;
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
}

function applyFontSize() {
    const size = fontSize.value;
    const sizes = {
        small: '14px',
        medium: '16px',
        large: '18px'
    };
    
    document.documentElement.style.fontSize = sizes[size];
}

function closeSettingsModal() {
    settingsModal.classList.remove('show');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        messageInput.focus();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeSettingsModal();
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden && isRecording) {
        stopRecording();
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}