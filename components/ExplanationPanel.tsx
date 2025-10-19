import React, { useState } from 'react';

interface Citation {
  doc_name: string;
  section_id: string;
  paragraph_id: string;
  content: string;
  relevance_score: number;
}

interface ExplanationData {
  run_id: string;
  explanation: string;
  citations: Citation[];
  confidence_score: number;
  has_sufficient_policy: boolean;
  generated_at: string;
  warning?: string;
}

interface ExplanationPanelProps {
  runId: string;
}

export default function ExplanationPanel({ runId }: ExplanationPanelProps) {
  const [explanation, setExplanation] = useState<ExplanationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchExplanation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/explain/${runId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch explanation: ${response.statusText}`);
      }
      
      const data = await response.json();
      setExplanation(data);
      setIsOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatConfidenceScore = (score: number) => {
    const percentage = Math.round(score * 100);
    if (percentage >= 80) return { text: 'High', color: '#28a745' };
    if (percentage >= 60) return { text: 'Medium', color: '#ffc107' };
    return { text: 'Low', color: '#dc3545' };
  };

  const getCitationId = (citation: Citation) => {
    return `${citation.doc_name}_${citation.section_id}_${citation.paragraph_id}`;
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={fetchExplanation}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Generating Explanation...' : 'Explain Valuation'}
      </button>

      {error && (
        <div style={{
          marginTop: '0.5rem',
          padding: '0.75rem',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {explanation && isOpen && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 style={{ margin: 0, color: '#495057' }}>Valuation Explanation</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6c757d'
              }}
            >
              ×
            </button>
          </div>

          {explanation.warning && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: '#fff3cd',
              color: '#856404',
              borderRadius: '4px',
              border: '1px solid #ffeaa7'
            }}>
              <strong>⚠️ Warning:</strong> {explanation.warning}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '0.5rem'
            }}>
              <strong>Confidence Score:</strong>
              <span style={{
                color: formatConfidenceScore(explanation.confidence_score).color,
                fontWeight: 'bold'
              }}>
                {formatConfidenceScore(explanation.confidence_score).text} ({Math.round(explanation.confidence_score * 100)}%)
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
              Generated at: {new Date(explanation.generated_at).toLocaleString()}
            </div>
          </div>

          <div style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #dee2e6',
            lineHeight: '1.6'
          }}>
            {explanation.explanation.split('\n').map((paragraph, index) => (
              <p key={index} style={{ margin: paragraph.startsWith('•') ? '0.5rem 0' : '1rem 0' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {explanation.citations.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Policy References:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {explanation.citations.map((citation, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #dee2e6',
                      borderLeft: '4px solid #007bff'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <strong style={{ color: '#007bff' }}>
                        {citation.doc_name} - {citation.section_id}.{citation.paragraph_id}
                      </strong>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#6c757d',
                        backgroundColor: '#e9ecef',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px'
                      }}>
                        {Math.round(citation.relevance_score * 100)}% relevant
                      </span>
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#495057',
                      lineHeight: '1.4'
                    }}>
                      {citation.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

