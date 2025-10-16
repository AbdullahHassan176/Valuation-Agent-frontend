import { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Valuation Agent Frontend</h1>
      <p>Welcome to the Valuation Agent Workspace frontend.</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link href="/health">
          <a style={{ color: 'blue', textDecoration: 'underline' }}>
            Check Backend Health
          </a>
        </Link>
        <Link href="/runs/new">
          <a style={{ color: 'blue', textDecoration: 'underline' }}>
            Create New Run
          </a>
        </Link>
        <Link href="/curves">
          <a style={{ color: 'blue', textDecoration: 'underline' }}>
            Curves Dashboard
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Home
