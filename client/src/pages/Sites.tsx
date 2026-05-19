import {useState, useEffect} from 'react';
import type {RoadSection} from "../services/mockData.ts";

const sectionsData: RoadSection[] = [
    {
        id: 1,
        name: "Участок №1 (км 45 - км 50)",
        status: "working",
        weather: {temp: 18, condition: "sunny", rainInHours: null},
        greenWindow: "08:00 - 22:00",
        recommendedTons: 120,
        coordinates: []
    },
    {
        id: 2,
        name: "Участок №2 (км 52 - км 58)",
        status: "stopped",
        weather: {temp: 12, condition: "rain", rainInHours: 0},
        greenWindow: "Окно закрыто",
        recommendedTons: 0,
        coordinates: []
    },
    {
        id: 3,
        name: "Участок №3 (км 60 - км 65)",
        status: "warning",
        weather: {temp: 15, condition: "cloudy", rainInHours: 3},
        greenWindow: "Доступно до 14:00",
        recommendedTons: 45,
        coordinates: []
    },
    {
        id: 4,
        name: "Участок №4 (км 70 - км 72)",
        status: "working",
        weather: {temp: 16, condition: "sunny", rainInHours: null},
        greenWindow: "08:00 - 20:00",
        recommendedTons: 90,
        coordinates: []
    },
];

const weatherTimeline = [
    {time: '00:00-04:00', status: 'allowed' as const},
    {time: '04:00-08:00', status: 'allowed' as const},
    {time: '08:00-12:00', status: 'allowed' as const},
    {time: '12:00-16:00', status: 'warning' as const},
    {time: '16:00-20:00', status: 'forbidden' as const},
    {time: '20:00-00:00', status: 'forbidden' as const},
];

const weatherStatusColors = {
    allowed: '#4caf50',
    warning: '#ffeb3b',
    forbidden: '#f44336',
};

const weatherStatusLabels = {
    allowed: 'разрешено',
    warning: 'опасно',
    forbidden: 'запрещено',
};

interface Truck {
    id: string;
    location: string;
    weight: number;
    temp: number;
    time: string;
    status: 'в пути' | 'разгрузка' | 'погрузка';
}

const trucksBySection: Record<number, Truck[]> = {
    1: [
        {id: 'TR-001', location: 'км 47', weight: 24.5, temp: 148, time: '14:32', status: 'разгрузка'},
        {id: 'TR-004', location: 'км 48', weight: 26.0, temp: 152, time: '14:28', status: 'в пути'},
        {id: 'TR-007', location: 'км 45', weight: 22.8, temp: 150, time: '14:15', status: 'погрузка'},
    ],
    2: [
        {id: 'TR-002', location: 'км 54', weight: 0, temp: 0, time: '--:--', status: 'погрузка'},
        {id: 'TR-005', location: 'км 56', weight: 0, temp: 0, time: '--:--', status: 'погрузка'},
    ],
    3: [
        {id: 'TR-003', location: 'км 62', weight: 25.2, temp: 145, time: '14:05', status: 'в пути'},
        {id: 'TR-008', location: 'км 64', weight: 23.5, temp: 149, time: '13:58', status: 'разгрузка'},
    ],
    4: [
        {id: 'TR-006', location: 'км 71', weight: 27.0, temp: 151, time: '14:40', status: 'разгрузка'},
        {id: 'TR-009', location: 'км 70', weight: 24.0, temp: 147, time: '14:33', status: 'в пути'},
        {id: 'TR-010', location: 'км 72', weight: 25.5, temp: 150, time: '14:20', status: 'погрузка'},
    ],
};

const statusColors: Record<string, string> = {
    'в пути': '#2196f3',
    'разгрузка': '#4caf50',
    'погрузка': '#ff9800',
};

export default function Sites() {
    const [selectedSection, setSelectedSection] = useState<RoadSection>(sectionsData[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [timeLeft, setTimeLeft] = useState(() => {
        const now = new Date();
        const target = new Date();
        target.setHours(16, 0, 0, 0);
        if (target <= now) target.setDate(target.getDate() + 1);
        return Math.floor((target.getTime() - now.getTime()) / 1000);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) return 28800;
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const currentTrucks = trucksBySection[selectedSection.id] || [];

    const sectionStats = {
        completedQuota: selectedSection.status === 'working' ? 94.3 : 0,
        canLay: selectedSection.status === 'working' ? 55.7 : 0,
    };

    return (
        <div>
            <div style={{marginBottom: '24px', position: 'relative'}}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                        backgroundColor: '#1e2127',
                        color: '#fff',
                        border: '1px solid #2a2d35',
                        borderRadius: '8px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        minWidth: '240px',
                    }}
                >
                    <span>{selectedSection.name.split('(')[0].trim()}</span>
                    <span style={{marginLeft: 'auto', fontSize: '12px'}}>{dropdownOpen ? '▲' : '▼'}</span>
                </button>

                {dropdownOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '4px',
                        backgroundColor: '#1e2127',
                        border: '1px solid #2a2d35',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        zIndex: 100,
                        minWidth: '240px',
                    }}>
                        {sectionsData.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    setSelectedSection(section);
                                    setDropdownOpen(false);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px 20px',
                                    backgroundColor: selectedSection.id === section.id ? '#252830' : 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    borderBottom: '1px solid #2a2d35',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: section.status === 'working' ? '#4caf50' :
                                        section.status === 'warning' ? '#ff9800' : '#f44336',
                                }}/>
                                {section.name.split('(')[0].trim()}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div style={{
                backgroundColor: '#1e2127',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #2a2d35',
                marginBottom: '20px',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <span style={{fontSize: '16px', color: '#fff', fontWeight: 'bold'}}>
                        Прогноз погоды на 24 часа
                    </span>
                    <div style={{display: 'flex', gap: '16px', fontSize: '13px'}}>
                        {Object.entries(weatherStatusLabels).map(([key, label]) => (
                            <span key={key} style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#aaa'}}>
                                <span style={{
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '2px',
                                    backgroundColor: weatherStatusColors[key as keyof typeof weatherStatusColors],
                                    display: 'inline-block',
                                }}/>
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    height: '28px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '12px'
                }}>
                    {weatherTimeline.map((slot, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                backgroundColor: weatherStatusColors[slot.status],
                                marginRight: i < weatherTimeline.length - 1 ? '2px' : 0,
                            }}
                        />
                    ))}
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#888',
                    marginBottom: '20px'
                }}>
                    {weatherTimeline.map((slot, i) => (
                        <span key={i} style={{flex: 1, textAlign: 'center'}}>{slot.time}</span>
                    ))}
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                    <div style={{
                        backgroundColor: '#0f1115',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #2a2d35',
                        textAlign: 'center',
                    }}>
                        <div style={{fontSize: '13px', color: '#888', marginBottom: '8px'}}>температура воздуха</div>
                        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#fff'}}>
                            +{selectedSection.weather.temp}°C
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: '#0f1115',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #2a2d35',
                        textAlign: 'center',
                    }}>
                        <div style={{fontSize: '13px', color: '#888', marginBottom: '8px'}}>скорость ветра</div>
                        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#fff'}}>3,1 м/с</div>
                    </div>
                    <div style={{
                        backgroundColor: '#0f1115',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #2a2d35',
                        textAlign: 'center',
                    }}>
                        <div style={{fontSize: '13px', color: '#888', marginBottom: '8px'}}>процент риска дождя</div>
                        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#fff'}}>
                            {selectedSection.weather.rainInHours !== null ? `${selectedSection.weather.rainInHours * 10}%` : '0%'}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px'}}>
                <div style={{
                    backgroundColor: '#1e2127',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #2a2d35',
                }}>
                    <div style={{fontSize: '12px', color: '#888', marginBottom: '12px', lineHeight: '1.4'}}>
                        до следующего этапа погоды
                    </div>
                    <div style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: timeLeft < 3600 ? '#f44336' : timeLeft < 7200 ? '#ff9800' : '#fff',
                        fontFamily: 'monospace',
                        letterSpacing: '2px',
                    }}>
                        {formatTime(timeLeft)}
                    </div>
                    <div style={{fontSize: '11px', color: '#666', marginTop: '8px'}}>
                        {timeLeft < 3600 ? '⚠️ Скоро ухудшение!' : 'Следующий этап: 16:00'}
                    </div>
                </div>

                <div style={{
                    backgroundColor: '#1e2127',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #2a2d35',
                }}>
                    <div style={{fontSize: '12px', color: '#888', marginBottom: '12px', lineHeight: '1.4'}}>
                        выполненная квота
                    </div>
                    <div style={{fontSize: '32px', fontWeight: 'bold', color: '#fff'}}>
                        {sectionStats.completedQuota} <span style={{fontSize: '16px', color: '#888'}}>т</span>
                    </div>
                </div>

                <div style={{
                    backgroundColor: '#1e2127',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #2a2d35',
                }}>
                    <div style={{fontSize: '12px', color: '#888', marginBottom: '12px', lineHeight: '1.4'}}>
                        можно уложить за остаток времени:
                    </div>
                    <div style={{fontSize: '32px', fontWeight: 'bold', color: '#fff'}}>
                        {sectionStats.canLay} <span style={{fontSize: '16px', color: '#888'}}>т</span>
                    </div>
                </div>
            </div>

            <div>
                <div style={{
                    backgroundColor: '#2a2d35',
                    padding: '12px 20px',
                    borderRadius: '12px 12px 0 0',
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    border: '1px solid #3a3d45',
                    borderBottom: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <span>Грузовой транспорт на участке</span>
                    <span style={{
                        fontSize: '12px',
                        color: '#888',
                        fontWeight: 'normal',
                        backgroundColor: '#1e2127',
                        padding: '4px 12px',
                        borderRadius: '6px',
                    }}>
                        {currentTrucks.length} {currentTrucks.length === 1 ? 'грузовик' : currentTrucks.length < 5 ? 'грузовика' : 'грузовиков'}
                    </span>
                </div>
                <div style={{
                    backgroundColor: '#1e2127',
                    borderRadius: '0 0 12px 12px',
                    border: '1px solid #2a2d35',
                    overflow: 'hidden',
                }}>
                    <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
                        <thead>
                        <tr style={{
                            backgroundColor: '#2a2d35',
                            color: '#888',
                            fontSize: '13px',
                        }}>
                            <th style={{
                                padding: '12px 16px',
                                textAlign: 'left',
                                fontWeight: 'normal',
                                width: '80px'
                            }}>ID
                            </th>
                            <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: 'normal'}}>Локация</th>
                            <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: 'normal'}}>Вес</th>
                            <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: 'normal'}}>Температура</th>
                            <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: 'normal'}}>Время</th>
                            <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: 'normal'}}>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentTrucks.map((truck) => (
                            <tr
                                key={truck.id}
                                style={{
                                    borderBottom: '1px solid #252830',
                                    transition: 'background-color 0.15s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#252830')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <td style={{
                                    padding: '14px 16px',
                                    color: '#888',
                                    fontFamily: 'monospace'
                                }}>{truck.id}</td>
                                <td style={{padding: '14px 16px', color: '#fff'}}>{truck.location}</td>
                                <td style={{padding: '14px 16px', color: '#fff'}}>
                                    {truck.weight > 0 ? `${truck.weight} т` : '—'}
                                </td>
                                <td style={{
                                    padding: '14px 16px',
                                    color: truck.temp > 150 ? '#ff9800' : truck.temp > 0 ? '#4caf50' : '#888'
                                }}>
                                    {truck.temp > 0 ? `${truck.temp}°C` : '—'}
                                </td>
                                <td style={{padding: '14px 16px', color: '#888'}}>{truck.time}</td>
                                <td style={{padding: '14px 16px'}}>
                                        <span style={{
                                            fontSize: '11px',
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            backgroundColor: `${statusColors[truck.status]}20`,
                                            color: statusColors[truck.status],
                                            fontWeight: 'bold',
                                        }}>
                                            {truck.status.toUpperCase()}
                                        </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {currentTrucks.length === 0 && (
                        <div style={{
                            padding: '40px',
                            textAlign: 'center',
                            color: '#555',
                            fontSize: '14px',
                        }}>
                            Нет активных грузовиков на этом участке
                        </div>
                    )}
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