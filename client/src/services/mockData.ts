export interface WeatherInfo {
    temp: number;
    condition: 'sunny' | 'rain' | 'cloudy';
    rainInHours: number | null;
}

export interface RoadSection {
    id: number;
    name: string;
    status: 'working' | 'stopped' | 'warning' | 'maintenance';
    weather: WeatherInfo;
    greenWindow: string;
    recommendedTons: number;
}

export interface Factory {
    id: number;
    name: string;
    capacity: string;
    distanceToM11: string;
}

export interface MechanicTask {
    id: number;
    sectionId: number;
    task: string;
    status: 'pending' | 'in_progress' | 'completed';
}

export interface DashboardData {
    sections: RoadSection[];
    factories: Factory[];
    mechanicTasks: MechanicTask[];
}

export interface RoadSection {
    id: number;
    name: string;
    status: 'working' | 'stopped' | 'warning' | 'maintenance';
    weather: { temp: number; condition: 'sunny' | 'rain' | 'cloudy'; rainInHours: number | null };
    greenWindow: string;
    recommendedTons: number;
    coordinates: [number, number][];
}

export interface Factory {
    id: number;
    name: string;
    capacity: string;
    distanceToM11: string;
    coordinates: [number, number]; // Одиночная точка для завода
}

export const mockDashboardData: DashboardData = {
    sections: [
        {
            id: 1,
            name: "Участок №1 (км 140 - км 150)",
            status: "working",
            weather: { temp: 18, condition: "sunny", rainInHours: null },
            greenWindow: "08:00 - 22:00 (Полное окно)",
            recommendedTons: 120,
            coordinates: [[56.8584, 35.9006], [56.8900, 36.0100]] // Линия на карте
        },
        {
            id: 2,
            name: "Участок №2 (км 155 - км 165)",
            status: "stopped", // ТУТ ДОЖДЬ!
            weather: { temp: 12, condition: "rain", rainInHours: 0 },
            greenWindow: "Окно закрыто (Осадки)",
            recommendedTons: 0,
            coordinates: [[56.9100, 36.0500], [56.9500, 36.1800]]
        },
        {
            id: 3,
            name: "Участок №3 (км 170 - км 180)",
            status: "warning", // Дождь скоро
            weather: { temp: 15, condition: "cloudy", rainInHours: 3 },
            greenWindow: "Доступно до 19:30 (Осталось 3 часа)",
            recommendedTons: 45,
            coordinates: [[56.9700, 36.2200], [57.0200, 36.3500]]
        },
    ],
    factories: [
        {
            id: 1,
            name: "АБЗ Центральный",
            capacity: "80 тонн/час",
            distanceToM11: "8 км",
            coordinates: [56.8400, 36.1200]
        }
    ],
    mechanicTasks: []
};

