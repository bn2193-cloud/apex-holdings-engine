'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IronSummitPortal() {
  const [formData, setFormData] = useState({ name: '', email: '', focus: 'Wealth Accumulation & Growth' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/iron-summit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStatus('success');
      else setStatus('idle');
    } catch (error) {
      setStatus('idle');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#060D09', color: '#cbd5e1', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glows (Hard-coded) */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: '#1A4B2C', filter: 'blur(150px)', opacity: 0.3, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: '#FFD700', filter: 'blur(180px)', opacity: 0.1, pointerEvents: 'none' }}></div>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(6,13,9,0.7)', backdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #1A4B2C, #000)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '2px' }}>
               <span style={{ color: '#FFD700', fontSize: '14px', fontWeight: 'bold' }}>IS</span>
             </div>
             <span style={{ fontSize: '18px', letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' }}>Iron Summit</span>
          </div>
          <Link href="/" style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', textDecoration: 'none' }}>Exit to Lobby</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10, paddingTop: '120px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(255,215,0,0.3)', backgroundColor: 'rgba(255,215,0,0.05)', width: 'fit-content' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFD700' }}></span>
            <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#FFD700', textTransform: 'uppercase', fontWeight: 'bold' }}>Fiduciary Standard Architecture</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight