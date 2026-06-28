import React from 'react';

const HomeFooter = ({ footerLinks }) => {
  return (
    <>
      {/* Footer */}
      <footer style={{ 
        borderTop: '0.5px solid #222', 
        padding: '32px', 
        display: 'grid', 
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr', 
        gap: '32px' 
      }}>
        <div>
          <div style={{ fontSize: '17px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>🚀 Uplift Career</div>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', maxWidth: '200px' }}>India's all-in-one platform to learn, gain experience, and get hired.</p>
        </div>
        {footerLinks.map(col => (
          <div key={col.title}>
            <div style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '12px' }}>{col.title}</div>
            {col.links.map(link => (
              <div key={link} style={{ 
                fontSize: '13px', 
                color: '#888', 
                marginBottom: '8px', 
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => e.target.style.color = '#AFA9EC'}
              onMouseLeave={e => e.target.style.color = '#888'}>{link}</div>
            ))}
          </div>
        ))}
      </footer>

      <div style={{ 
        borderTop: '0.5px solid #222', 
        padding: '16px 32px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <p style={{ fontSize: '12px', color: '#555' }}>© 2026 Uplift Career. All rights reserved.</p>
        <p style={{ fontSize: '12px', color: '#555' }}>Made with love in India 🇮🇳</p>
      </div>
    </>
  );
};

export default HomeFooter;