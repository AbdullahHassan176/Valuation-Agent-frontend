import { NextPage } from 'next'
import { useState, useEffect } from 'react'

interface HealthResponse {
  ok: boolean
  service: string
  api_base_url?: string
}

const Health: NextPage = () => {
  const [healthData, setHealthData] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:8000'
    
    fetch(`${backendBase}/healthz`)
      .then(response => response.json())
      .then(data => {
        setHealthData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Backend Health Check</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      
      {healthData && (
        <div>
          <h2>Backend Response:</h2>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(healthData, null, 2)}
          </pre>
        </div>
      )}
      
      <p>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          ← Back to Home
        </a>
      </p>
    </div>
  )
}

export default Health
