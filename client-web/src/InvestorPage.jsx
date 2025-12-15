import React, { useState, useEffect } from 'react';

const InvestorPage = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimate(true), 500);
    }, []);

    return (
        <div style={{
            background: '#000',
            minHeight: '100vh',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            overflowX: 'hidden',
            paddingBottom: 100
        }}>
            {/* Navbar Minimal */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 40px',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.05em' }}>
                    KHET<span style={{ color: '#22C55E' }}>BANDHU</span>
                    <span style={{ fontSize: 10, marginLeft: 8, background: '#22C55E', color: 'black', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>INVESTOR</span>
                </div>
                <div style={{ fontSize: 12, opacity: 0.6, letterSpacing: '0.1em' }}>CONFIDENTIAL • SERIES A</div>
            </nav>

            {/* Hero Section */}
            <div style={{ padding: '100px 40px', maxWidth: 1200, margin: '0 auto' }}>
                <h1 style={{
                    fontSize: 'clamp(40px, 6vw, 80px)',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(to right, #fff, #666)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: 24,
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                    Transforming India's <br />
                    <span style={{ color: '#22C55E', WebkitTextFillColor: '#22C55E' }}>$27 Billion</span> Agriculture Economy
                </h1>
                <p style={{
                    fontSize: 20,
                    opacity: 0.7,
                    maxWidth: 600,
                    lineHeight: 1.6,
                    marginBottom: 60,
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}>
                    Democratizing farm mechanization for the 86% of Indian farmers who cannot afford to buy equipment. The "Uber for Tractors" is here.
                </p>

                {/* Bento Grid Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 24,
                    marginBottom: 100
                }}>
                    {[
                        { label: 'Total Addressable Market', value: '$27.3B', sub: 'By 2030 (CAGR 8.5%)' },
                        { label: 'Target Audience', value: '86%', sub: 'Small & Marginal Farmers (<2ha)' },
                        { label: 'Mechanization Gap', value: '45%', sub: 'Vs. USA (95%) & China (57%)' },
                        { label: 'Revenue Efficiency', value: '+30%', sub: 'Income increase for Owners' }
                    ].map((stat, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: 32,
                            borderRadius: 24,
                            opacity: animate ? 1 : 0,
                            transform: animate ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.1}s`
                        }}>
                            <div style={{ fontSize: 13, color: '#888', marginBottom: 8, letterSpacing: '0.05em' }}>{stat.label.toUpperCase()}</div>
                            <div style={{ fontSize: 48, fontWeight: 700, color: '#fff', marginBottom: 4, letterSpacing: '-0.03em' }}>{stat.value}</div>
                            <div style={{ fontSize: 13, color: '#22C55E' }}>{stat.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Deep Dive Section - Grid Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center', marginBottom: 120 }}>
                    {/* Chart 1: The Problem (Pie Logic Visualization) */}
                    <div style={{
                        opacity: animate ? 1 : 0,
                        transition: 'all 0.8s ease 0.8s'
                    }}>
                        <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 20 }}>The Fragmentation Problem</h3>
                        <p style={{ fontSize: 16, opacity: 0.7, marginBottom: 40, lineHeight: 1.6 }}>
                            Indian agriculture is dominated by small landholdings. Ownership of heavy machinery is economically unviable for 86% of farmers, creating a massive inefficiency trap.
                        </p>

                        {/* Custom CSS Bar Chart for Landholdings */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[
                                { label: 'Small/Marginal (<2ha)', value: 86, color: '#EF4444' },
                                { label: 'Medium (2-10ha)', value: 13, color: '#F59E0B' },
                                { label: 'Large (>10ha)', value: 1, color: '#22C55E' }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                                        <span>{item.label}</span>
                                        <span style={{ fontWeight: 700 }}>{item.value}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                                        <div style={{
                                            width: animate ? `${item.value}%` : 0,
                                            height: '100%',
                                            background: item.color,
                                            borderRadius: 4,
                                            transition: `width 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${1 + i * 0.2}s`
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 24, padding: 16, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 12, fontSize: 14, color: '#FCA5A5' }}>
                            🚨 <strong>Insight:</strong> Traditional ownership models fail here. Rental is the <i>only</i> scalable solution.
                        </div>
                    </div>

                    {/* Impact Visual */}
                    <div style={{
                        position: 'relative',
                        height: 400,
                        background: 'linear-gradient(135deg, #111, #000)',
                        borderRadius: 32,
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'scale(1)' : 'scale(0.95)',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
                    }}>
                        {/* Animated Rings showing Market Expansion */}
                        <div style={{ position: 'absolute', width: 200, height: 200, border: '1px solid #22C55E', borderRadius: '50%', opacity: 0.2, animation: 'pulse 3s infinite' }} />
                        <div style={{ position: 'absolute', width: 300, height: 300, border: '1px solid #22C55E', borderRadius: '50%', opacity: 0.1, animation: 'pulse 3s infinite 0.5s' }} />
                        <div style={{ position: 'absolute', width: 400, height: 400, border: '1px solid #22C55E', borderRadius: '50%', opacity: 0.05, animation: 'pulse 3s infinite 1s' }} />

                        <div style={{ textAlign: 'center', zIndex: 10 }}>
                            <div style={{ fontSize: 60, fontWeight: 800, color: '#fff' }}>5.2%</div>
                            <div style={{ fontSize: 14, color: '#22C55E', letterSpacing: '0.2em', marginTop: 8 }}>CAGR GROWTH</div>
                            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Farm Rental Market</div>
                        </div>
                    </div>
                </div>

                {/* Comparison Section */}
                <div style={{ marginBottom: 100 }}>
                    <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 40, textAlign: 'center' }}>The Mechanization Gap = Opportunity</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, alignItems: 'flex-end', height: 300, maxWidth: 800, margin: '0 auto' }}>
                        {[
                            { label: 'USA', val: 95, color: '#333' },
                            { label: 'Brazil', val: 75, color: '#333' },
                            { label: 'INDIA', val: 45, color: '#22C55E', highlight: true }
                        ].map((d, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                                <div style={{ marginBottom: 12, fontWeight: 700, fontSize: 24, opacity: animate ? 1 : 0, transition: `opacity 0.5s ease ${1.5 + i * 0.2}s` }}>{d.val}%</div>
                                <div style={{
                                    width: '100%',
                                    height: animate ? `${d.val}%` : 0,
                                    background: d.color,
                                    borderRadius: '12px 12px 0 0',
                                    opacity: 0.8,
                                    transition: `height 1s cubic-bezier(0.16, 1, 0.3, 1) ${1.2 + i * 0.2}s`,
                                    position: 'relative'
                                }}>
                                    {d.highlight && (
                                        <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', background: '#22C55E', color: 'black', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                                            HUGE UPSIDE 🚀
                                        </div>
                                    )}
                                </div>
                                <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: '#888' }}>{d.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Now Section */}
                <div style={{ background: '#111', borderRadius: 32, padding: 60 }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Why KhetBandhu Now?</h3>
                        <p style={{ opacity: 0.6 }}>The perfect storm of digital adoption and policy support.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
                        {[
                            { icon: '📱', title: 'Digital Penetration', desc: 'Rural internet usage has surpassed urban India. Farmers are online and ready.' },
                            { icon: '🚜', title: 'Policy Push', desc: 'Govt "Sub-Mission on Agricultural Mechanization" actively promotes custom hiring centers.' },
                            { icon: '⚡', title: 'Power Shift', desc: 'Farm power availability rising to 4kW/ha. Shift from manual to machine is accelerating.' }
                        ].map((item, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'white' }}>{item.title}</h4>
                                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.5 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Footer */}
                <div style={{ textAlign: 'center', marginTop: 100 }}>
                    <p style={{ fontSize: 14, letterSpacing: '0.2em', color: '#666', marginBottom: 20 }}>JOIN THE REVOLUTION</p>
                    <div style={{ fontSize: 40, fontWeight: 800, color: 'white' }}>
                        KhetBandhu is building the <br />
                        <span style={{ color: '#22C55E' }}>OS for Indian Agriculture.</span>
                    </div>
                </div>

            </div>

            <style>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.2; }
          50% { transform: scale(1); opacity: 0.1; }
          100% { transform: scale(0.8); opacity: 0.2; }
        }
      `}</style>
        </div>
    );
};

export default InvestorPage;
