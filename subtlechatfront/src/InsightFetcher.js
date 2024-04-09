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
      <div style={{ maxHeight: '1000px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isOutgoing={msg.isOutgoing} />
        ))}
        {isTyping && <div style={{ fontStyle: 'italic', color: '#AAA', textAlign: 'left' }}>Typing...</div>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}> {/* Right-align input and button */}
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Text message"
          style={{ marginRight: '10px', padding: '10px', width: 'calc(100% - 120px)' }} // Ensure input field is appropriately sized
        />
        <button onClick={fetchInsight} style={{ padding: '10px 20px' }}>Send</button>
      </div>
    </div>
  );
}

export default InsightFetcher;
