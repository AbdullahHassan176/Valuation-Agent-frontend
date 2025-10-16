import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { IRSSpec, RunRequest } from '../../src/sdk'

const NewRun: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [runId, setRunId] = useState<string | null>(null)

  const [formData, setFormData] = useState<IRSSpec>({
    notional: 1000000,
    ccy: 'USD',
    payFixed: true,
    fixedRate: 0.05,
    floatIndex: 'USD-LIBOR-3M',
    effective: '2024-01-01',
    maturity: '2025-01-01',
    dcFixed: 'ACT/360',
    dcFloat: 'ACT/360',
    freqFixed: 'Q',
    freqFloat: 'Q',
    calendar: 'USD',
    bdc: 'FOLLOWING',
    csa: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const runRequest: RunRequest = {
        spec: formData,
        asOf: '2024-01-01',
        marketDataProfile: 'default',
        approach: ['discount_curve']
      }

      const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:8000'
      const response = await fetch(`${backendBase}/runs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(runRequest),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setRunId(result.id)
      
      // Redirect to run detail page
      router.push(`/runs/${result.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof IRSSpec, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Create New Valuation Run</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="notional">Notional Amount:</label>
          <input
            type="number"
            id="notional"
            value={formData.notional}
            onChange={(e) => handleInputChange('notional', parseFloat(e.target.value))}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label htmlFor="ccy">Currency:</label>
          <select
            id="ccy"
            value={formData.ccy}
            onChange={(e) => handleInputChange('ccy', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.payFixed}
              onChange={(e) => handleInputChange('payFixed', e.target.checked)}
            />
            Pay Fixed Rate
          </label>
        </div>

        <div>
          <label htmlFor="fixedRate">Fixed Rate:</label>
          <input
            type="number"
            id="fixedRate"
            step="0.0001"
            value={formData.fixedRate}
            onChange={(e) => handleInputChange('fixedRate', parseFloat(e.target.value))}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label htmlFor="floatIndex">Floating Index:</label>
          <select
            id="floatIndex"
            value={formData.floatIndex}
            onChange={(e) => handleInputChange('floatIndex', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="USD-LIBOR-3M">USD-LIBOR-3M</option>
            <option value="SOFR">SOFR</option>
            <option value="EUR-EURIBOR-3M">EUR-EURIBOR-3M</option>
            <option value="GBP-LIBOR-3M">GBP-LIBOR-3M</option>
          </select>
        </div>

        <div>
          <label htmlFor="effective">Effective Date:</label>
          <input
            type="date"
            id="effective"
            value={formData.effective}
            onChange={(e) => handleInputChange('effective', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label htmlFor="maturity">Maturity Date:</label>
          <input
            type="date"
            id="maturity"
            value={formData.maturity}
            onChange={(e) => handleInputChange('maturity', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label htmlFor="dcFixed">Fixed Leg Day Count:</label>
          <select
            id="dcFixed"
            value={formData.dcFixed}
            onChange={(e) => handleInputChange('dcFixed', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="ACT/360">ACT/360</option>
            <option value="ACT/365">ACT/365</option>
            <option value="30/360">30/360</option>
            <option value="ACT/ACT">ACT/ACT</option>
          </select>
        </div>

        <div>
          <label htmlFor="dcFloat">Floating Leg Day Count:</label>
          <select
            id="dcFloat"
            value={formData.dcFloat}
            onChange={(e) => handleInputChange('dcFloat', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="ACT/360">ACT/360</option>
            <option value="ACT/365">ACT/365</option>
            <option value="30/360">30/360</option>
            <option value="ACT/ACT">ACT/ACT</option>
          </select>
        </div>

        <div>
          <label htmlFor="freqFixed">Fixed Leg Frequency:</label>
          <select
            id="freqFixed"
            value={formData.freqFixed}
            onChange={(e) => handleInputChange('freqFixed', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="M">Monthly</option>
            <option value="Q">Quarterly</option>
            <option value="S">Semi-Annual</option>
            <option value="A">Annual</option>
          </select>
        </div>

        <div>
          <label htmlFor="freqFloat">Floating Leg Frequency:</label>
          <select
            id="freqFloat"
            value={formData.freqFloat}
            onChange={(e) => handleInputChange('freqFloat', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="M">Monthly</option>
            <option value="Q">Quarterly</option>
            <option value="S">Semi-Annual</option>
            <option value="A">Annual</option>
          </select>
        </div>

        <div>
          <label htmlFor="calendar">Calendar:</label>
          <select
            id="calendar"
            value={formData.calendar}
            onChange={(e) => handleInputChange('calendar', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        <div>
          <label htmlFor="bdc">Business Day Convention:</label>
          <select
            id="bdc"
            value={formData.bdc}
            onChange={(e) => handleInputChange('bdc', e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="FOLLOWING">Following</option>
            <option value="MODIFIED_FOLLOWING">Modified Following</option>
            <option value="PRECEDING">Preceding</option>
            <option value="MODIFIED_PRECEDING">Modified Preceding</option>
          </select>
        </div>

        <div>
          <label htmlFor="csa">CSA (Optional):</label>
          <input
            type="text"
            id="csa"
            value={formData.csa}
            onChange={(e) => handleInputChange('csa', e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', padding: '1rem', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
            Error: {error}
          </div>
        )}

        {runId && (
          <div style={{ color: 'green', padding: '1rem', backgroundColor: '#e6ffe6', borderRadius: '4px' }}>
            Run created successfully! ID: {runId}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '1rem',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {loading ? 'Creating Run...' : 'Create Run'}
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          ← Back to Home
        </a>
      </div>
    </div>
  )
}

export default NewRun
