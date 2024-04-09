import React, { useState } from 'react';
import axios from 'axios';

function InsightFetcher() {
  const [userPrompt, setUserPrompt] = useState('');
  const [insight, setInsight] = useState('');

  const fetchInsight = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/get_insight/', { user_prompt: userPrompt });
      setInsight(response.data.insight);
    } catch (error) {
      console.error('Error fetching insight:', error);
      setInsight('Failed to fetch insight.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={fetchInsight}>Get Insight</button>
      {insight && <div><strong>Insight:</strong> {insight}</div>}
    </div>
  );
}

export default InsightFetcher;
