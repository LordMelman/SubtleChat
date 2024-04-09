// ChatMessage.js
function ChatMessage({ message, isOutgoing }) {
    return (
      <div style={{ 
        textAlign: isOutgoing ? 'right' : 'left', 
        margin: '10px', 
        padding: '5px', 
        backgroundColor: isOutgoing ? '#add8e6' : '#90ee90',
        display: 'inline-block',
        borderRadius: '10px',
      }}>
        {message}
      </div>
    );
  }
  
  export default ChatMessage;
  