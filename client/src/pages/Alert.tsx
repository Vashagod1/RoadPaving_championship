import {useState} from 'react';

interface Alert {
    id: number;
    title: string;
    site: string;
    time: string;
    criticality: 'warning' | 'critical';
    description: string;
}

const alertsData: Alert[] = [
    {
        id: 1,
        title: 'Описание предупреждения',
        site: 'Участок №3 (км 60 - км 65)',
        time: '14:32:15',
        criticality: 'warning',
        description: 'Ожидается ухудшение погодных условий через 3 часа',
    },
    {
        id: 2,
        title: 'Описание предупреждения',
        site: 'Участок №2 (км 52 - км 58)',
        time: '13:45:02',
        criticality: 'critical',
        description: 'Критическая температура смеси ниже допустимой нормы',
    },
    {
        id: 3,
        title: 'Описание предупреждения',
        site: 'Участок №1 (км 45 - км 50)',
        time: '12:18:44',
        criticality: 'warning',
        description: 'Задержка поставки материалов — 45 минут',
    },
    {
        id: 4,
        title: 'Описание предупреждения',
        site: 'Участок №5 (км 85 - км 90)',
        time: '11:05:30',
        criticality: 'critical',
        description: 'Аварийная остановка катка Hamm HD+ 140i',
    },
    {
        id: 5,
        title: 'Описание предупреждения',
        site: 'Участок №4 (км 70 - км 72)',
        time: '10:22:11',
        criticality: 'warning',
        description: 'Превышение дневной квоты укладки на 12%',
    },
];

const criticalityConfig = {
    warning: {
        borderColor: '#f4d03f',
        leftBar: '#f4d03f',
        label: 'ВНИМАНИЕ',
    },
    critical: {
        borderColor: '#e74c3c',
        leftBar: '#e74c3c',
        label: 'КРИТИЧНО',
    },
};

export default function Alerts() {
    const [filter, setFilter] = useState<'all' | 'warning' | 'critical'>('all');

    const filteredAlerts = filter === 'all'
        ? alertsData
        : alertsData.filter(a => a.criticality === filter);

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h2 style={{
                    margin: 0,
                    fontSize: '20px',
                    color: '#fff',
                    fontWeight: 'bold'
                }}>
                    Оповещения
                </h2>

                {/* Filter Buttons */}
                <div style={{display: 'flex', gap: '8px'}}>
                    {(['all', 'warning', 'critical'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: '1px solid #2a2d35',
                                backgroundColor: filter === f ? '#007eae' : '#1e2127',
                                color: filter === f ? '#fff' : '#888',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: filter === f ? 'bold' : 'normal',
                                transition: 'all 0.2s',
                            }}
                        >
                            {f === 'all' ? 'Все' : f === 'warning' ? 'Внимание' : 'Критично'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Summary */}
            <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px'
            }}>
                <div style={{
                    backgroundColor: '#1e2127',
                    padding: '16px 24px',
                    borderRadius: '10px',
                    border: '1px solid #2a2d35',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#f4d03f'
                    }}/>
                    <div>
                        <div style={{fontSize: '12px', color: '#888'}}>Предупреждения</div>
                        <div style={{fontSize: '20px', fontWeight: 'bold', color: '#fff'}}>
                            {alertsData.filter(a => a.criticality === 'warning').length}
                        </div>
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#1e2127',
                    padding: '16px 24px',
                    borderRadius: '10px',
                    border: '1px solid #2a2d35',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#e74c3c'
                    }}/>
                    <div>
                        <div style={{fontSize: '12px', color: '#888'}}>Критические</div>
                        <div style={{fontSize: '20px', fontWeight: 'bold', color: '#fff'}}>
                            {alertsData.filter(a => a.criticality === 'critical').length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts List */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {filteredAlerts.map((alert) => {
                    const config = criticalityConfig[alert.criticality];

                    return (
                        <div
                            key={alert.id}
                            style={{
                                display: 'flex',
                                backgroundColor: '#2a2d35',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: `2px solid ${config.borderColor}`,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(4px)';
                                e.currentTarget.style.boxShadow = `0 4px 12px ${config.borderColor}30`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Left Color Bar */}
                            <div style={{
                                width: '8px',
                                backgroundColor: config.leftBar,
                                flexShrink: 0,
                            }}/>

                            {/* Content */}
                            <div style={{
                                flex: 1,
                                padding: '20px 24px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}>
                                {/* Title Row */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h3 style={{
                                        margin: 0,
                                        fontSize: '16px',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                    }}>
                                        {alert.title}
                                    </h3>
                                    <span style={{
                                        fontSize: '11px',
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        backgroundColor: `${config.borderColor}20`,
                                        color: config.borderColor,
                                        fontWeight: 'bold',
                                    }}>
                    {config.label}
                  </span>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                    fontSize: '13px',
                                    color: '#aaa',
                                }}>
                                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                        <span style={{color: '#666', minWidth: '70px'}}>Участок:</span>
                                        <span style={{color: '#fff'}}>{alert.site}</span>
                                    </div>
                                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                        <span style={{color: '#666', minWidth: '70px'}}>Время:</span>
                                        <span>{alert.time}</span>
                                    </div>
                                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                        <span style={{color: '#666', minWidth: '70px'}}>Критичность:</span>
                                        <span style={{color: config.borderColor, fontWeight: 'bold'}}>
                      {alert.criticality === 'warning' ? 'Средняя' : 'Высокая'}
                    </span>
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: '4px',
                                    padding: '10px 12px',
                                    backgroundColor: '#1e2127',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    color: '#ccc',
                                    borderLeft: `3px solid ${config.borderColor}`,
                                }}>
                                    {alert.description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredAlerts.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#555',
                }}>
                    <div style={{fontSize: '48px', marginBottom: '16px'}}>✓</div>
                    <div style={{fontSize: '16px'}}>Нет оповещений выбранного типа</div>
                </div>
            )}

            <div style={{
                marginTop: '32px',
                paddingTop: '16px',
                borderTop: '1px solid #222',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#555',
            }}>
                <span>СТАТУС СИСТЕМЫ: РАБОТАЕТ</span>
                <div style={{display: 'flex', gap: '16px'}}>
                    <span>Оповещения</span>
                    <span>Логи системы</span>
                    <span>Статус сети</span>
                    <span>v.2.4.22-PROD</span>
                </div>
            </div>
        </div>
    );
}