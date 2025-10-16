import { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Valuation Agent Frontend</h1>
      <p>Welcome to the Valuation Agent Workspace frontend.</p>
      <Link href="/health">
        <a style={{ color: 'blue', textDecoration: 'underline' }}>
          Check Backend Health
        </a>
      </Link>
    </div>
  )
}

export default Home
