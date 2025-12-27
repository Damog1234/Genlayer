import { useState, useEffect, useCallback } from 'react';

export default function GenLayerRankCheck() {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  // The Logo you provided
  const LOGO_URL = "https://files.oaiusercontent.com/file-afS1w3m1mUisKqGvTzK3Wv?se=2025-12-27T16%3A22%3A01Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D0f3938be-238d-4be7-8314-998845014f34.webp&sig=G/V7K99q13qf0V2XUbe/w%2BrvQ%2BOf7eJvG6%2BUz0/u7uA%3D";

  const getRankData = (lvl) => {
    if (lvl >= 54) return { label: 'SINGULARITY 🎖️🎊', color: '#22C55E' };
    if (lvl >= 36) return { label: 'BRAIN', color: '#A855F7' };
    if (lvl >= 18) return { label: 'SYNAPSE', color: '#3B82F6' };
    if (lvl >= 7)  return { label: 'NEURON', color: '#FB923C' };
    return { label: 'MOLECULE', color: '#FACC15' };
  };

  const getNextXP = (lvl) => 5 * (lvl ** 2) + 50 * lvl + 100;

  const handleSearch = useCallback(async (targetName, isSilent = false) => {
    const searchTarget = targetName || query;
    if (!searchTarget) return;
    
    if (isSilent) setIsRefreshing(true);
    else setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s for 2G/3G stability

      const res = await fetch(`/api/stats?username=${encodeURIComponent(searchTarget)}`, { 
        signal: controller.signal 
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setError('');
        setLastUpdated(new Date().toLocaleTimeString());
      } else if (!isSilent) {
        setError("User not found in Top 2000.");
      }
    } catch (e) {
      if (!isSilent) setError("Connection slow. Re-trying...");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [query]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => handleSearch(user.username, true), 120000);
    return () => clearInterval(interval);
  }, [user, handleSearch]);

  const activeColor = user ? getRankData(user.level).color : '#333';

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. LOGO AS BACKGROUND (SUBTLE) */}
      <img src={LOGO_URL} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '900px', opacity: '0.04', pointerEvents: 'none', zIndex: '0' }} alt="" />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: '1' }}>
        
        {/* 2. LOGO BOLDLY AT THE TOP */}
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <img src={LOGO_URL} style={{ width: '120px', marginBottom: '15px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} alt="GenLayer Logo" />
          <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '4px', margin: '0' }}>GENLAYER RANK CHECK</h1>
          {isRefreshing && (
            <div style={{ marginTop: '10px', fontSize: '10px', color: '#22C55E', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <span className="live-dot"></span> LIVE REFRESHING DATA
            </div>
          )}
        </header>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
          
          {/* SEARCH & RESULT AREA */}
          <div style={{ flex: '1', minWidth: '320px', maxWidth: '500px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              <input 
                style={{ flex: 1, padding: '18px', borderRadius: '15px', border: `2px solid ${activeColor}`, backgroundColor: 'rgba(15,15,15,0.8)', color: '#fff', fontSize: '16px' }}
                placeholder="Discord Username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={() => handleSearch()} style={{ padding: '0 30px', backgroundColor: '#fff', color: '#000', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                {loading ? '...' : 'SCAN'}
              </button>
            </div>

            {error && <p style={{ color: '#ff4444', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

            {user && (
              <div style={{ background: 'rgba(10,10,10,0.95)', padding: '40px', borderRadius: '45px', border: `3px solid ${getRankData(user.level).color}`, textAlign: 'center', backdropFilter: 'blur(15px)', boxShadow: `0 0 30px ${getRankData(user.level).color}22` }}>
                <img 
                  src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/0.png`} 
                  style={{ width: '100px', height: '100px', borderRadius: '50%', border: `4px solid ${getRankData(user.level).color}`, marginBottom: '20px' }}
                />
                
                {/* NAME IN ROLE COLOR */}
                <h2 style={{ color: getRankData(user.level).color, fontSize: '42px', fontWeight: '900', margin: '0' }}>
                  {user.username.toUpperCase()}
                </h2>
                <p style={{ color: '#555', fontSize: '14px', margin: '5px 0' }}>TOP 2000 RANK: #{user.rank}</p>

                {/* PROGRESS BAR */}
                <div style={{ textAlign: 'left', margin: '30px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                    <span style={{color: getRankData(user.level).color, fontWeight: 'bold'}}>LEVEL {user.level}</span>
                    <span>{user.message_xp} / {getNextXP(user.level)} XP</span>
                  </div>
                  <div style={{ width: '100%', height: '14px', background: '#1a1a1a', borderRadius: '20px', overflow: 'hidden' }}>
                    <div style={{ 
                        width: `${Math.min((user.message_xp / getNextXP(user.level)) * 100, 100)}%`, 
                        height: '100%', 
                        background: getRankData(user.level).color, 
                        transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: `0 0 15px ${getRankData(user.level).color}AA`
                    }}></div>
                  </div>
                </div>

                <h1 style={{ color: getRankData(user.level).color, fontSize: '32px', fontWeight: '900', fontStyle: 'italic', margin: '0' }}>
                  {getRankData(user.level).label}
                </h1>
                <p style={{ fontSize: '9px', color: '#333', marginTop: '20px' }}>UPDATED: {lastUpdated}</p>
              </div>
            )}
          </div>

          {/* 3. RANKING STRUCTURE LISTING */}
          <div style={{ width: '320px', background: 'rgba(10,10,10,0.85)', padding: '35px', borderRadius: '35px', border: '1px solid #222', height: 'fit-content' }}>
            <h3 style={{ fontSize: '12px', color: '#444', marginBottom: '25px', letterSpacing: '2px', textAlign: 'center' }}>RANK CLASSIFICATION</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontWeight: 'bold', fontSize: '16px' }}>
              <div style={{ color: '#FACC15', borderLeft: '4px solid #FACC15', paddingLeft: '15px' }}>Molecule level 1-6</div>
              <div style={{ color: '#FB923C', borderLeft: '4px solid #FB923C', paddingLeft: '15px' }}>Neuron level 7-17</div>
              <div style={{ color: '#3B82F6', borderLeft: '4px solid #3B82F6', paddingLeft: '15px' }}>Synapse level 18-35</div>
              <div style={{ color: '#A855F7', borderLeft: '4px solid #A855F7', paddingLeft: '15px' }}>Brain level 36-53</div>
              <div style={{ color: '#22C55E', borderLeft: '4px solid #22C55E', paddingLeft: '15px' }}>Singularity🎖️🎊 level 54 upward</div>
            </div>
            <p style={{ marginTop: '30px', fontSize: '11px', color: '#444', fontStyle: 'italic', textAlign: 'center' }}>
              Scanning Top 2000 Members...
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        .live-dot {
          height: 8px; width: 8px; background-color: #22C55E; border-radius: 50%;
          display: inline-block; animation: blink 1s infinite;
        }
        @keyframes blink {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
                              }
