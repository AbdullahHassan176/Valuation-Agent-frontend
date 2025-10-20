import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tool_call?: string;
  tool_parameters?: any;
}

interface ChatPanelProps {
  runId: string;
}

export default function ChatPanel({ runId }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:9000/chat/${runId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: ChatMessage = {
          type: 'assistant',
          content: data.response,
          timestamp: data.timestamp,
          tool_call: data.tool_call,
          tool_parameters: data.tool_parameters
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorData = await response.json();
        const errorMessage: ChatMessage = {
          type: 'system',
          content: `Error: ${errorData.detail || 'Failed to process message'}`,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        type: 'system',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to send message'}`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleExampleClick = (example: string) => {
    setInputMessage(example);
  };

  const formatMessage = (message: ChatMessage) => {
    if (message.type === 'system') {
      return (
        <div style={{
          padding: '0.5rem',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px',
          fontSize: '0.9rem',
          margin: '0.5rem 0'
        }}>
          {message.content}
        </div>
      );
    }

    if (message.type === 'user') {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '0.5rem 0'
        }}>
          <div style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '18px 18px 4px 18px',
            maxWidth: '70%',
            wordWrap: 'break-word'
          }}>
            {message.content}
          </div>
        </div>
      );
    }

    // Assistant message
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        margin: '0.5rem 0'
      }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          color: '#212529',
          padding: '0.75rem 1rem',
          borderRadius: '18px 18px 18px 4px',
          maxWidth: '70%',
          wordWrap: 'break-word',
          border: '1px solid #dee2e6'
        }}>
          {message.tool_call && (
            <div style={{
              fontSize: '0.8rem',
              color: '#6c757d',
              marginBottom: '0.5rem',
              fontStyle: 'italic'
            }}>
              🔧 {message.tool_call}
              {message.tool_parameters && (
                <span style={{ marginLeft: '0.5rem' }}>
                  ({JSON.stringify(message.tool_parameters)})
                </span>
              )}
            </div>
          )}
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </div>
        </div>
      </div>
    );
  };

  const examples = [
    "Show me the run status",
    "Run parallel +1bp sensitivity",
    "Explain this valuation",
    "Export Excel now"
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}
      >
        {isOpen ? '🔼 Hide Chat' : '💬 Chat Assistant'}
      </button>

      {isOpen && (
        <div style={{
          marginTop: '1rem',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* Chat Header */}
          <div style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6',
            borderRadius: '8px 8px 0 0'
          }}>
            <h4 style={{ margin: 0, color: '#495057' }}>Valuation Assistant</h4>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#6c757d' }}>
              I can help with run status, sensitivity analysis, explanations, and exports. 
              I cannot price new instruments or perform unauthorized calculations.
            </p>
          </div>

          {/* Messages */}
          <div style={{
            height: '400px',
            overflowY: 'auto',
            padding: '1rem',
            backgroundColor: '#ffffff'
          }}>
            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: '#6c757d',
                fontStyle: 'italic',
                margin: '2rem 0'
              }}>
                Start a conversation! Try one of the examples below.
              </div>
            )}
            
            {messages.map((message, index) => (
              <div key={index}>
                {formatMessage(message)}
              </div>
            ))}
            
            {isLoading && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                margin: '0.5rem 0'
              }}>
                <div style={{
                  backgroundColor: '#f8f9fa',
                  color: '#212529',
                  padding: '0.75rem 1rem',
                  borderRadius: '18px 18px 18px 4px',
                  border: '1px solid #dee2e6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #007bff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '0.5rem'
                    }}></div>
                    Processing...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Examples */}
          <div style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #dee2e6'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.5rem' }}>
              Try these examples:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: '#495057'
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{
            padding: '1rem',
            borderTop: '1px solid #dee2e6',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about this valuation..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: isLoading || !inputMessage.trim() ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading || !inputMessage.trim() ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

