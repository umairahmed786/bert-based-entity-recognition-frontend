// NerComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NerComponent.css';

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prevText) => prevText + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayText}</span>;
};

const ConversationBubble = ({ type, text }) => {
  return (
    <div className={`user-input-bubble ${type}`}>
      {type === 'user' && <div>User: "{text}"</div>}
      {type === 'bot' && (
        <div>
          User: "{text}"
          <div>
            Response: <TypingEffect text={JSON.stringify(text)} />
          </div>
        </div>
      )}
      {type === 'error' && (
        <div>
          Error:
          <div>
            <TypingEffect text={text} />
          </div>
        </div>
      )}
    </div>
  );
};

const NerComponent = () => {
  const [inputText, setInputText] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleNerRequest = async () => {
    try {
      setLoading(true);

      // Create a new conversation entry for the user input
      const userConversation = { id: Date.now(), type: 'user', text: inputText };
      setConversations((prevConversations) => [...prevConversations, userConversation]);

      // Simulate a delay (1 second) to represent backend processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Fetch the response from the backend
      const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', { text: inputText });

      // Create a new conversation entry for the bot response
      const botConversation = { id: Date.now(), type: 'bot', text: response.data };
      setConversations((prevConversations) => [...prevConversations, botConversation]);
    } catch (error) {
      console.error('Error fetching response:', error);

      // Create a new conversation entry for the error response
      const errorConversation = { id: Date.now(), type: 'error', text: error.toString() };
      setConversations((prevConversations) => [...prevConversations, errorConversation]);
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  return (
    <div className="chat-container">
      <div className="user-input-history">
        {conversations.map((item) => (
          <ConversationBubble key={item.id} type={item.type} text={item.text} />
        ))}
      </div>
      <div className="user-input-container">
        <div className="form-group stylish-input d-flex flex-row">
          <input
            className="form-control centered-input mt-1"
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleTextChange}
          />
          <button
            className="btn btn-primary mb-2 mx-2"
            onClick={handleNerRequest}
            disabled={loading || !inputText.trim()}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NerComponent;
