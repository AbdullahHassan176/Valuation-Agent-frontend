import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CurveNode {
  tenor: string
  maturity_date: string
  zero_rate: number
  discount_factor: number
  day_count: number
}

interface Curve {
  curve_id: string
  curve_type: string
  currency: string
  index: string
  as_of_date: string
  nodes: CurveNode[]
  version: number
}

const Curves: NextPage = () => {
  const [curves, setCurves] = useState<Curve[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bootstrapLoading, setBootstrapLoading] = useState(false)

  const fetchCurves = async () => {
    try {
      const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:8000'
      const response = await fetch(`${backendBase}/curves/`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const curveIds = await response.json()
      
      // Fetch details for each curve
      const curvePromises = curveIds.map(async (curveId: string) => {
        const curveResponse = await fetch(`${backendBase}/curves/${curveId}`)
        if (curveResponse.ok) {
          return curveResponse.json()
        }
        return null
      })
      
      const curveDetails = await Promise.all(curvePromises)
      setCurves(curveDetails.filter(Boolean))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const bootstrapCurve = async () => {
    setBootstrapLoading(true)
    setError(null)
    
    try {
      const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:8000'
      const requestBody = {
        curve_type: "USD_OIS",
        as_of_date: new Date().toISOString().split('T')[0],
        market_data_profile: "default"
      }
      
      const response = await fetch(`${backendBase}/curves/bootstrap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }
      
      // Refresh curves list
      await fetchCurves()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setBootstrapLoading(false)
    }
  }

  useEffect(() => {
    fetchCurves()
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Curves Dashboard</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={bootstrapCurve}
          disabled={bootstrapLoading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: bootstrapLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {bootstrapLoading ? 'Bootstrapping...' : 'Bootstrap USD OIS Curve'}
        </button>
      </div>

      {loading && <p>Loading curves...</p>}

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}

      {curves.length === 0 && !loading && (
        <p>No curves available. Click "Bootstrap USD OIS Curve" to create one.</p>
      )}

      {curves.map((curve) => (
        <div key={curve.curve_id} style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '1rem', 
          marginBottom: '1rem',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>{curve.curve_id}</h2>
          <p><strong>Type:</strong> {curve.curve_type}</p>
          <p><strong>Currency:</strong> {curve.currency}</p>
          <p><strong>Index:</strong> {curve.index}</p>
          <p><strong>As of Date:</strong> {new Date(curve.as_of_date).toLocaleDateString()}</p>
          <p><strong>Version:</strong> {curve.version}</p>
          <p><strong>Nodes:</strong> {curve.nodes.length}</p>
          
          <h3>Curve Nodes</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              border: '1px solid #ddd'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tenor</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Maturity Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Zero Rate</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Discount Factor</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Day Count</th>
                </tr>
              </thead>
              <tbody>
                {curve.nodes.map((node, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{node.tenor}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {new Date(node.maturity_date).toLocaleDateString()}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {(node.zero_rate * 100).toFixed(4)}%
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {node.discount_factor.toFixed(6)}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {node.day_count.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <p style={{ marginTop: '2rem' }}>
        <Link href="/">
          <a style={{ color: 'blue', textDecoration: 'underline' }}>
            ← Back to Home
          </a>
        </Link>
      </p>
    </div>
  )
}

export default Curves
