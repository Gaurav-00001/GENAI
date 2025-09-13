# MyGenAI Chatbot Website

A modern, responsive chatbot interface inspired by Gradio's design, built with HTML, CSS, and JavaScript.

## Features

- **Modern UI Design**: Clean, gradient-based interface similar to Gradio
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Real-time Chat**: Interactive messaging with typing indicators
- **Voice Input**: Speech-to-text functionality (browser supported)
- **File Upload**: Support for images, PDFs, and text files
- **Settings Panel**: Customizable theme and font size
- **API Integration Ready**: Built-in API documentation and key management
- **Dark/Light Theme**: Toggle between themes
- **Keyboard Shortcuts**: Quick access with Ctrl+K to focus input

## Files Structure

- `index.html` - Main HTML structure
- `styles.css` - Complete styling with responsive design
- `script.js` - Interactive functionality and features

## How to Use

1. **Open the Website**: Simply open `index.html` in your web browser
2. **Start Chatting**: Type your message in the input field and press Enter or click Send
3. **Voice Input**: Click the microphone icon to use speech-to-text
4. **Upload Files**: Click the paperclip icon to attach files
5. **Settings**: Click the settings icon to customize theme and preferences
6. **API Info**: Click "Use via API" to see integration documentation

## Customization

### Themes
- Light theme (default)
- Dark theme
- Auto theme (follows system preference)

### Font Sizes
- Small (14px)
- Medium (16px) - default
- Large (18px)

### API Integration
The website is ready for API integration. Replace the `generateBotResponse()` function in `script.js` with your actual API calls.

## Browser Compatibility

- Chrome/Edge (recommended for voice features)
- Firefox
- Safari
- Mobile browsers

## Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Ctrl/Cmd + K` - Focus message input
- `Escape` - Close modals

## Technical Features

- **Auto-resizing textarea** for comfortable typing
- **Character counter** with visual feedback
- **Typing indicators** for better UX
- **Message timestamps** for conversation history
- **Local storage** for settings persistence
- **Service Worker ready** for PWA capabilities
- **Accessibility features** with proper ARIA labels

## Integration with Your Gradio Bot

To connect this frontend with your actual Gradio chatbot at `https://gauravvv01-mygenaichatbot.hf.space`, you would need to:

1. Replace the mock `generateBotResponse()` function with actual API calls
2. Add your API endpoint URL
3. Handle authentication if required
4. Implement proper error handling

The website is designed to be easily customizable and ready for production use!
