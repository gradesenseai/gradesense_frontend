import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <img src="/logo.png" alt="GradeSense" className="logo" />
        <div className="brand">GradeSense</div>
      </header>

      <section className="grid" style={{marginTop: 24}}>
        <div className="card">
          <h1 style={{marginTop:0, marginBottom:8}}>Patent‑pending AI grading platform</h1>
          <p style={{color:'#4B4B4B', marginTop:0}}>
            Optimizing submissions, powering the hobby. Start an estimate by uploading front and back images of your card.
          </p>
          <div style={{marginTop:16}}>
            <Link href="/estimate" className="btn">Start Estimate</Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{marginTop:0}}>System Status</h3>
          <ul style={{marginTop:8}}>
            <li>Frontend: Vercel</li>
            <li>Backend: Railway</li>
            <li>API: <code>{process.env.NEXT_PUBLIC_API_BASE || 'https://gradesense.up.railway.app'}</code></li>
          </ul>
          <p className="disclaimer">Reminder: All grade outputs are estimates for educational purposes only and are not affiliated with or guaranteed by PSA or BGS.</p>
        </div>
      </section>
    </main>
  );
}
