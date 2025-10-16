import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RunStatus, PVBreakdown } from '../../src/sdk'

const RunDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [runStatus, setRunStatus] = useState<RunStatus | null>(null)
  const [pvBreakdown, setPvBreakdown] = useState<PVBreakdown | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [polling, setPolling] = useState(true)

  const fetchRunStatus = async () => {
    if (!id || typeof id !== 'string') return

    try {
      const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:8000'
      const response = await fetch(`${backendBase}/runs/${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setRunStatus(data)
      setError(null)

      // If run is completed, fetch the result
      if (data.status === 'completed') {
        await fetchRunResult()
        setPolling(false) // Stop polling when completed
      } else if (data.status === 'failed' || data.status === 'cancelled') {
        setPolling(false) // Stop polling on terminal states
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setPolling(false)
    } finally {
      setLoading(false)
    }
  }

  const fetchRunResult = async () => {
    if (!id || typeof id !== 'string') return

    try {
      const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:8000'
      const response = await fetch(`${backendBase}/runs/${id}/result`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setPvBreakdown(data)
    } catch (err) {
      console.error('Failed to fetch run result:', err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchRunStatus()
    }
  }, [id])

  useEffect(() => {
    if (!polling) return

    const interval = setInterval(() => {
      fetchRunStatus()
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(interval)
  }, [polling, id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'queued': return '#ffc107'
      case 'running': return '#17a2b8'
      case 'completed': return '#28a745'
      case 'failed': return '#dc3545'
      case 'cancelled': return '#6c757d'
      default: return '#6c757d'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'queued': return 'Queued'
      case 'running': return 'Running'
      case 'completed': return 'Completed'
      case 'failed': return 'Failed'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Loading Run Details...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Error</h1>
        <div style={{ color: 'red', padding: '1rem', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
          {error}
        </div>
        <div style={{ marginTop: '1rem' }}>
          <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
            ← Back to Home
          </a>
        </div>
      </div>
    )
  }

  if (!runStatus) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Run Not Found</h1>
        <div style={{ marginTop: '1rem' }}>
          <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
            ← Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Run Details: {runStatus.id}</h1>
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h2>Status</h2>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            border: `2px solid ${getStatusColor(runStatus.status)}`
          }}>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: getStatusColor(runStatus.status),
              marginBottom: '0.5rem'
            }}>
              {getStatusText(runStatus.status)}
            </div>
            {polling && (
              <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                Auto-refreshing every 2 seconds...
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2>Timestamps</h2>
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <div><strong>Created:</strong> {new Date(runStatus.created_at).toLocaleString()}</div>
            <div><strong>Updated:</strong> {new Date(runStatus.updated_at).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {runStatus.error_message && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Error Message</h2>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            {runStatus.error_message}
          </div>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h2>Request Details</h2>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          <pre style={{ margin: 0, fontSize: '0.9rem' }}>
            {JSON.stringify(runStatus.request, null, 2)}
          </pre>
        </div>
      </div>

      {pvBreakdown && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Valuation Result</h2>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#d4edda', 
            borderRadius: '4px',
            border: '1px solid #c3e6cb'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Total PV:</strong> {pvBreakdown.total_pv.toLocaleString()}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Components:</strong>
              <ul style={{ margin: '0.5rem 0 0 1rem' }}>
                {Object.entries(pvBreakdown.components).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
              <div><strong>Market Data Hash:</strong> {pvBreakdown.market_data_hash}</div>
              <div><strong>Model Hash:</strong> {pvBreakdown.model_hash}</div>
              <div><strong>Calculated At:</strong> {new Date(pvBreakdown.calculated_at).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <a 
          href="/runs/new" 
          style={{ 
            color: 'white', 
            backgroundColor: '#007bff', 
            padding: '0.5rem 1rem', 
            textDecoration: 'none', 
            borderRadius: '4px' 
          }}
        >
          Create New Run
        </a>
        <a 
          href="/" 
          style={{ 
            color: '#007bff', 
            padding: '0.5rem 1rem', 
            textDecoration: 'underline' 
          }}
        >
          ← Back to Home
        </a>
      </div>
    </div>
  )
}

export default RunDetail
