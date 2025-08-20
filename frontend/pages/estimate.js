import { useEffect, useMemo, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://gradesense.up.railway.app';

export default function EstimatePage() {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontUrl, setFrontUrl] = useState(null);
  const [backUrl, setBackUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const disabled = useMemo(() => !frontFile || !backFile || submitting, [frontFile, backFile, submitting]);

  useEffect(() => {
    if (frontFile) setFrontUrl(URL.createObjectURL(frontFile));
    else setFrontUrl(null);
  }, [frontFile]);

  useEffect(() => {
    if (backFile) setBackUrl(URL.createObjectURL(backFile));
    else setBackUrl(null);
  }, [backFile]);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const fd = new FormData();
      fd.append('front', frontFile);
      fd.append('back', backFile);
      // Optional: include metadata
      // fd.append('card_meta', JSON.stringify({ year: '2022', set: 'Donruss', player: 'Joe Burrow' }));

      const res = await fetch(`${API_BASE}/api/estimate`, {
        method: 'POST',
        body: fd
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container">
      <header className="header">
        <a href="/" aria-label="Back to home" style={{display:'inline-flex', alignItems:'center', gap:8}}>
          <img src="/logo.png" alt="GradeSense" className="logo" />
          <div className="brand">GradeSense</div>
        </a>
        <span style={{marginLeft:'auto'}} className="badge">MVP</span>
      </header>

      <section className="grid" style={{marginTop:24}}>
        <form className="card grid" onSubmit={onSubmit}>
          <h2 style={{marginTop:0}}>Estimate Grade</h2>

          <div className="row">
            <div>
              <div className="label">Front image (required)</div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="input"
                onChange={(e)=>setFrontFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            <div>
              <div className="label">Back image (required)</div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="input"
                onChange={(e)=>setBackFile(e.target.files?.[0] || null)}
                required
              />
            </div>
          </div>

          <div className="preview" style={{marginTop:8}}>
            {frontUrl && <div><div className="label">Front preview</div><img src={frontUrl} alt="Front preview" /></div>}
            {backUrl && <div><div className="label">Back preview</div><img src={backUrl} alt="Back preview" /></div>}
          </div>

          <div style={{display:'flex', gap:12, alignItems:'center', marginTop:12}}>
            <button className="btn" disabled={disabled} type="submit">
              {submitting ? 'Analyzing…' : 'Run Estimate'}
            </button>
            {error && <span style={{color:'#B00020', fontWeight:600}}>Error: {error}</span>}
          </div>

          <p className="disclaimer">
            All grade outputs are estimates for educational purposes only and are not affiliated with or guaranteed by PSA or BGS.
          </p>
        </form>

        <div className="card">
          <h3 style={{marginTop:0}}>Result</h3>
          {!result && <p style={{color:'#4B4B4B'}}>Upload both images and run the estimate to see results here.</p>}
          {result && (
            <div className="grid">
              <div className="kv"><div>Request ID</div><div>{result.request_id}</div></div>
              <div className="kv"><div>Estimated Grade</div><div style={{fontWeight:700, fontSize:24}}>{result.estimated_grade?.toFixed?.(1) ?? result.estimated_grade}</div></div>
              <div className="kv"><div>Centering</div><div>{result.subgrades?.centering}</div></div>
              <div className="kv"><div>Corners</div><div>{result.subgrades?.corners}</div></div>
              <div className="kv"><div>Edges</div><div>{result.subgrades?.edges}</div></div>
              <div className="kv"><div>Surface</div><div>{result.subgrades?.surface}</div></div>
              {result.notes && <div className="kv"><div>Notes</div><div>{result.notes}</div></div>}
              <p className="disclaimer">{result.disclaimer}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
