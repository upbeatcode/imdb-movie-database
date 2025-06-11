import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header style={{ 
      padding: '20px', 
      background: '#1e1e1e', 
      borderBottom: '1px solid #444',
      marginBottom: '20px'
    }}>
      {/* App Title (Clickable for Home) */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px'
        }}
      >
        <h1 
          style={{ margin: 0, cursor: 'pointer' }} 
          onClick={() => navigate("/")}
        >
          Movie Database
        </h1>
        <button 
          onClick={() => navigate("/")}
          style={{
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Home
        </button>
      </div>

      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span 
          onClick={() => navigate("/")} 
          style={{ 
            cursor: 'pointer', 
            color: '#007bff',
            fontWeight: 'bold'
          }}
        >
          Home
        </span>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <span key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#666' }}>/</span>
              <span
                onClick={() => !isLast && navigate(routeTo)}
                style={{
                  cursor: isLast ? 'default' : 'pointer',
                  color: isLast ? '#ffffff' : '#007bff',
                  fontWeight: isLast ? 'normal' : 'bold'
                }}
              >
                {decodeURIComponent(name).replace(/-/g, ' ')}
              </span>
            </span>
          );
        })}
      </div>
    </header>
  );
}


export default Header;