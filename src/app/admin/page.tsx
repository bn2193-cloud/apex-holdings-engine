/* Add this inside the .grid div in your Mission Control page */
<div className="stat-card" style={{ gridColumn: 'span 2', position: 'relative', overflow: 'hidden' }}>
  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '20px', letterSpacing: '1px' }}>LEAD PENETRATION RADAR</div>
  <svg viewBox="0 0 400 200" style={{ width: '100%', height: '150px' }}>
    <circle cx="200" cy="180" r="150" fill="none" stroke="#1A4B2C" strokeWidth="1" strokeDasharray="5,5" />
    <circle cx="200" cy="180" r="100" fill="none" stroke="#1A4B2C" strokeWidth="1" strokeDasharray="5,5" />
    <circle cx="200" cy="180" r="50" fill="none" stroke="#1A4B2C" strokeWidth="1" strokeDasharray="5,5" />
    {/* Dynamic Data Points */}
    {dossiers.map((_, i) => (
      <circle 
        key={i}
        cx={100 + (Math.random() * 200)} 
        cy={50 + (Math.random() * 100)} 
        r="4" 
        fill="#FFD700" 
        style={{ opacity: 0.6, filter: 'blur(2px)' }}
      >
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
      </circle>
    ))}
  </svg>
  <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '9px', color: '#1A4B2C', fontWeight: 'bold' }}>SCANNING REGIONAL VAULTS...</div>
</div>