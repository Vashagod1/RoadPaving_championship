import { mockDashboardData } from '../services/mockData';

function Dashboard() {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Панель диспетчера: Асфальт-План (Трасса М-11)</h2>
            </header>

            <h3>Активные участки укладки</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {mockDashboardData.sections.map(section => (
                    <div key={section.id} style={{
                        padding: '15px',
                        borderRadius: '8px',
                        backgroundColor: '#white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        borderLeft: `6px solid ${
                            section.status === 'working' ? '#4caf50' :
                                section.status === 'stopped' ? '#f44336' :
                                    section.status === 'warning' ? '#ff9800' : '#2196f3'
                        }`
                    }}>
                        <h4>{section.name}</h4>
                        <p>Статус: <strong>{section.status.toUpperCase()}</strong></p>
                        <p>Погода: {section.weather.condition === 'rain' ? '🌧️ Дождь' : section.weather.condition === 'sunny' ? '☀️ Ясно' : '☁️ Облачно'}, {section.weather.temp}°C</p>
                        <p style={{ fontSize: '14px', color: '#666' }}>{section.greenWindow}</p>
                        <p>Рекомендовано: <strong>{section.recommendedTons} т смесь</strong></p>
                    </div>
                ))}
            </div>

            <h3>Асфальтобетонные заводы (АБЗ)</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                {mockDashboardData.factories.map(factory => (
                    <div key={factory.id} style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h4>🏭 {factory.name}</h4>
                        <p>Мощность: {factory.capacity}</p>
                        <p>Дистанция до М-11: {factory.distanceToM11}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;