import {useState} from 'react';
import {mockDashboardData, type RoadSection} from '../services/mockData';

const statusColors: Record<string, string> = {
    working: '#4caf50',
    stopped: '#f44336',
    warning: '#ff9800',
    maintenance: '#2196f3',
};

const statusLabels: Record<string, string> = {
    working: 'Работает',
    stopped: 'Остановлен',
    warning: 'Внимание',
    maintenance: 'ТО',
};

const weatherIcons: Record<string, string> = {
    sunny: '☀️',
    rain: '🌧️',
    cloudy: '☁️',
};

const sectionsData: RoadSection[] = [
    ...mockDashboardData.sections,
    {
        id: 6,
        name: "Участок №4 (км 92 - км 96)",
        status: "working",
        weather: {temp: 19, condition: "sunny", rainInHours: null},
        greenWindow: "08:00 - 20:00",
        recommendedTons: 110,
        coordinates: []
    },
    {
        id: 7,
        name: "Участок №5 (км 98 - км 102)",
        status: "warning",
        weather: {temp: 13, condition: "cloudy", rainInHours: 5},
        greenWindow: "Доступно до 13:00",
        recommendedTons: 60,
        coordinates: []
    }
];

interface TransportRecord {
    id: string;
    location: string;
    weight: number;
    temp: number;
    time: string;
    status: 'в пути' | 'доставлен' | 'погрузка';
}

const transportData: TransportRecord[] = [
    {id: 'TR-001', location: 'Участок №1, км 45', weight: 24.5, temp: 148, time: '14:32', status: 'в пути'},
    {id: 'TR-002', location: 'Участок №1, км 47', weight: 26.0, temp: 152, time: '14:28', status: 'доставлен'},
    {id: 'TR-003', location: 'Участок №2, км 52', weight: 22.8, temp: 145, time: '14:15', status: 'погрузка'},
    {id: 'TR-004', location: 'Участок №3, км 61', weight: 25.2, temp: 150, time: '14:05', status: 'в пути'},
    {id: 'TR-005', location: 'Участок №1, км 48', weight: 23.5, temp: 149, time: '13:58', status: 'доставлен'},
];

export default function Dashboard() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const activeSections = sectionsData.filter(s => s.status === 'working').length;
    const greenWindows = sectionsData.filter(s => s.status === 'working' && s.weather.condition !== 'rain').length;
    const warnings = sectionsData.filter(s => s.status === 'warning').length;

    const getVisibleSections = () => {
        const result = [];
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + sectionsData.length) % sectionsData.length;
            result.push({section: sectionsData[index], position: i, realIndex: index});
        }
        return result;
    };

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % sectionsData.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + sectionsData.length) % sectionsData.length);

    const visibleSections = getVisibleSections();

    return (
        <div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px'}}>
                <div style={{
                    backgroundColor: '#1e2127',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #2a2d35',
                    textAlign: 'center'
                }}>
                    <div style={{fontSize: '14px', color: '#aaa', marginBottom: '8px'}}>Активные участки</div>
                    <div style={{fontSize: '36px', fontWeight: 'bold', color: '#fff'}}>{activeSections}</div>
                </div>
                <div style={{
                    backgroundColor: '#1e2127',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #2a2d35',
                    textAlign: 'center'
                }}>
                    <div style={{fontSize: '14px', color: '#aaa', marginBottom: '8px'}}>Зелёные окна</div>
                    <div style={{fontSize: '36px', fontWeight: 'bold', color: '#4caf50'}}>
                        {greenWindows}<span style={{color: '#666', fontSize: '24px'}}>/{sectionsData.length}</span>
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#1e2127',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #2a2d35',
                    textAlign: 'center'
                }}>
                    <div style={{fontSize: '14px', color: '#aaa', marginBottom: '8px'}}>Кол-во предупреждений</div>
                    <div style={{fontSize: '36px', fontWeight: 'bold', color: '#f44336'}}>{warnings}</div>
                </div>
            </div>

            <div style={{marginBottom: '24px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <button
                        onClick={prevSlide}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '1px solid #333',
                            backgroundColor: '#1e2127',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a2d35')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e2127')}
                    >
                        ‹
                    </button>

                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        minHeight: '220px',
                    }}>
                        {visibleSections.map(({section, position, realIndex}) => {
                            const isCenter = position === 0;
                            const isSide = Math.abs(position) === 1;

                            return (
                                <div
                                    key={`${section.id}-${position}`}
                                    onClick={() => isSide && setCurrentIndex(realIndex)}
                                    style={{
                                        backgroundColor: isCenter ? '#1e2127' : '#16181d',
                                        padding: isCenter ? '24px' : '20px',
                                        borderRadius: '12px',
                                        border: isCenter
                                            ? `2px solid ${statusColors[section.status]}`
                                            : '1px solid #2a2d35',
                                        flex: 1,
                                        maxWidth: isCenter ? '380px' : '320px',
                                        opacity: isCenter ? 1 : 0.5,
                                        transform: isCenter ? 'scale(1)' : 'scale(0.92)',
                                        transition: 'all 0.3s ease',
                                        cursor: isSide ? 'pointer' : 'default',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '16px'
                                    }}>
                                        <h4 style={{margin: 0, fontSize: isCenter ? '16px' : '14px', color: '#fff'}}>
                                            {section.name.split('(')[0].trim()}
                                        </h4>
                                        <span style={{
                                            fontSize: '11px',
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            backgroundColor: `${statusColors[section.status]}20`,
                                            color: statusColors[section.status],
                                            fontWeight: 'bold',
                                        }}>
                      {statusLabels[section.status]}
                    </span>
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '10px',
                                        marginBottom: '12px',
                                        flex: 1,
                                    }}>
                                        <div style={{
                                            backgroundColor: '#0f1115',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{
                                                fontSize: '10px',
                                                color: '#666',
                                                textTransform: 'uppercase',
                                                marginBottom: '4px'
                                            }}>Макс. вес
                                            </div>
                                            <div style={{
                                                fontSize: isCenter ? '20px' : '16px',
                                                fontWeight: 'bold',
                                                color: '#fff'
                                            }}>{section.recommendedTons} т
                                            </div>
                                        </div>
                                        <div style={{
                                            backgroundColor: '#0f1115',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{
                                                fontSize: '10px',
                                                color: '#666',
                                                textTransform: 'uppercase',
                                                marginBottom: '4px'
                                            }}>До конца окна
                                            </div>
                                            <div style={{
                                                fontSize: isCenter ? '20px' : '16px',
                                                fontWeight: 'bold',
                                                color: '#fff'
                                            }}>1:30
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                                        <div style={{
                                            backgroundColor: '#0f1115',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            color: '#aaa',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}>
                                            {weatherIcons[section.weather.condition]} +{section.weather.temp}°C
                                        </div>
                                        <div style={{
                                            backgroundColor: '#0f1115',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            color: '#aaa',
                                        }}>
                                            3,1 м/с
                                        </div>
                                        <div style={{
                                            backgroundColor: '#0f1115',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            color: '#aaa',
                                        }}>
                                            70%
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={nextSlide}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '1px solid #333',
                            backgroundColor: '#1e2127',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a2d35')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e2127')}
                    >
                        ›
                    </button>
                </div>

                <div style={{display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px'}}>
                    {sectionsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            style={{
                                width: index === currentIndex ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: index === currentIndex ? '#007eae' : '#333',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        />
                    ))}
                </div>
            </div>

            <div>
                <div style={{
                    display: 'inline-block',
                    backgroundColor: '#1e2127',
                    padding: '10px 20px',
                    borderRadius: '8px 8px 0 0',
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: 'bold',
                }}>
                    Транспортировка материалов
                </div>
                <div style={{
                    backgroundColor: '#1e2127',
                    borderRadius: '0 12px 12px 12px',
                    border: '1px solid #2a2d35',
                    overflow: 'hidden',
                }}>
                    <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
                        <thead>
                        <tr style={{
                            backgroundColor: '#252830',
                            color: '#888',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                        }}>
                            <th style={{padding: '14px 16px', textAlign: 'left', fontWeight: 'normal'}}>ID</th>
                            <th style={{padding: '14px 16px', textAlign: 'left', fontWeight: 'normal'}}>Локация</th>
                            <th style={{padding: '14px 16px', textAlign: 'left', fontWeight: 'normal'}}>Вес</th>
                            <th style={{padding: '14px 16px', textAlign: 'left', fontWeight: 'normal'}}>Температура</th>
                            <th style={{padding: '14px 16px', textAlign: 'left', fontWeight: 'normal'}}>Время</th>
                            <th style={{padding: '14px 16px', textAlign: 'left', fontWeight: 'normal'}}>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transportData.map((record) => (
                            <tr
                                key={record.id}
                                style={{
                                    borderBottom: '1px solid #252830',
                                    transition: 'background-color 0.15s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#252830')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <td style={{
                                    padding: '14px 16px',
                                    color: '#fff',
                                    fontFamily: 'monospace'
                                }}>{record.id}</td>
                                <td style={{padding: '14px 16px', color: '#aaa'}}>{record.location}</td>
                                <td style={{
                                    padding: '14px 16px',
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>{record.weight} т
                                </td>
                                <td style={{
                                    padding: '14px 16px',
                                    color: record.temp > 150 ? '#ff9800' : '#4caf50'
                                }}>{record.temp}°C
                                </td>
                                <td style={{padding: '14px 16px', color: '#888'}}>{record.time}</td>
                                <td style={{padding: '14px 16px'}}>
                    <span style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        backgroundColor: record.status === 'доставлен' ? '#4caf5020' : record.status === 'в пути' ? '#2196f320' : '#ff980020',
                        color: record.status === 'доставлен' ? '#4caf50' : record.status === 'в пути' ? '#2196f3' : '#ff9800',
                        fontWeight: 'bold',
                    }}>
                      {record.status.toUpperCase()}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

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