function ChatMessage({ message, isOutgoing }) {
    return (
      <div style={{ 
        maxWidth: '60%', // Limit the width of messages
        margin: isOutgoing ? '10px 0 10px auto' : '10px auto 10px 0', // Right align if outgoing
        padding: '10px',
        backgroundColor: isOutgoing ? '#add8e6' : '#90ee90',
        textAlign: isOutgoing ? 'right' : 'left',
        borderRadius: '20px',
      }}>
        {message}
      </div>
    );
  }
  
  export default ChatMessage;
  