import {useState} from 'react';
import {useNavigate, useLocation, Outlet} from 'react-router-dom';

const menuItems = [
    {path: '/dashboard', label: 'Панель', icon: '⊞'},
    {path: '/sites', label: 'Участки', icon: '▦'},
    {path: '/map', label: 'Карта', icon: '🗺'},
    {path: '/alerts', label: 'Предупреждения', icon: '▲'},
];

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            backgroundColor: '#0f1115',
            color: '#e0e0e0',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <aside style={{
                width: collapsed ? '60px' : '220px',
                backgroundColor: '#16181d',
                borderRight: '1px solid #222',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{padding: '20px', borderBottom: '1px solid #222'}}>
                    <h3 style={{margin: 0, fontSize: '14px', letterSpacing: '1px'}}>Асфальт план</h3>
                </div>
                <div style={{padding: '20px', borderBottom: '1px solid #222', fontWeight: 'normal'}}>
                    <h3 style={{margin: 0, fontSize: '14px', letterSpacing: '1px', fontWeight: 'normal'}}>Смирнов
                        Алексей</h3>
                </div>


                <nav style={{flex: 1, padding: '10px 0'}}>
                    {menuItems.map(item => {
                        const active = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                style={{
                                    width: '100%',
                                    padding: collapsed ? '12px 0' : '12px 20px',
                                    background: active ? 'rgba(0,126,174,0.15)' : 'transparent',
                                    border: 'none',
                                    color: active ? '#00a8e8' : '#888',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    gap: '12px',
                                    fontSize: '14px',
                                    borderLeft: active ? '3px solid #00a8e8' : '3px solid transparent',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{fontSize: '16px'}}>{item.icon}</span>
                                {!collapsed && <span>{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                <div style={{padding: '15px', borderTop: '1px solid #222', fontSize: '12px'}}>
                    {!collapsed && (
                        <>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #333',
                                    color: '#888',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    width: '100%',
                                }}
                            >
                                Выйти
                            </button>
                        </>
                    )}
                </div>
            </aside>

            <main style={{flex: 1, overflow: 'auto', padding: '24px'}}>
                <Outlet/>
            </main>
        </div>
    );
}