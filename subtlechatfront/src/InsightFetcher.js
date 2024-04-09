import React, { useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';

function InsightFetcher() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // Add isTyping state

  const fetchInsight = async () => {
    const outgoingMessage = { text: userInput, isOutgoing: true };
    setMessages([...messages, outgoingMessage]);
    setIsTyping(true); // Start showing typing indicator

    try {
      const response = await axios.post('http://127.0.0.1:8000/get_insight/', { user_prompt: userInput });
      const incomingMessage = { text: response.data.insight, isOutgoing: false };
      setMessages((prevMessages) => [...prevMessages, incomingMessage]); // Ensure we're working with the latest state
    } catch (error) {
      console.error('Error fetching insight:', error);
      const errorMessage = { text: 'Failed to fetch insight.', isOutgoing: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setIsTyping(false); // Hide typing indicator
    setUserInput(''); // Clear input after sending
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={fetchInsight}>Send</button>
      <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isOutgoing={msg.isOutgoing} />
        ))}
        {isTyping && <div style={{ fontStyle: 'italic', color: '#AAA' }}>Typing...</div>}
      </div>
    </div>
  );
}

export default InsightFetcher;
