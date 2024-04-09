// InsightFetcher.js
import React, { useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage'; // Import the ChatMessage component

function InsightFetcher() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]); // Store messages as an array

  const fetchInsight = async () => {
    const outgoingMessage = { text: userInput, isOutgoing: true };
    setMessages([...messages, outgoingMessage]); // Add user input as outgoing message

    try {
      const response = await axios.post('http://127.0.0.1:8000/get_insight/', { user_prompt: userInput });
      const incomingMessage = { text: response.data.insight, isOutgoing: false };
      setMessages([...messages, outgoingMessage, incomingMessage]); // Add both messages
    } catch (error) {
      console.error('Error fetching insight:', error);
      const errorMessage = { text: 'Failed to fetch insight.', isOutgoing: false };
      setMessages([...messages, outgoingMessage, errorMessage]); // Show error as incoming message
    }
    setUserInput(''); // Clear input after sending
  };

  return (
    <div>
      
      <div style={{ maxHeight: '700px', overflowY: 'scroll' }}> {/* Make message history scrollable */}
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isOutgoing={msg.isOutgoing} />
        ))}
      </div>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Text Message"
      />
      <button onClick={fetchInsight}>Send</button>
    </div>
  );
}

export default InsightFetcher;
