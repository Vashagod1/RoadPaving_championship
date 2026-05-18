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

export const mockDashboardData: DashboardData = {
    sections: [
        {
            id: 1,
            name: "Участок №1 (км 45 - км 50)",
            status: "working",
            weather: { temp: 18, condition: "sunny", rainInHours: null },
            greenWindow: "08:00 - 22:00 (Полное окно)",
            recommendedTons: 120
        },
        {
            id: 2,
            name: "Участок №2 (км 52 - км 58)",
            status: "stopped",
            weather: { temp: 12, condition: "rain", rainInHours: 0 },
            greenWindow: "Окно закрыто (Осадки)",
            recommendedTons: 0
        },
        {
            id: 3,
            name: "Участок №3 (км 60 - км 65)",
            status: "warning",
            weather: { temp: 15, condition: "cloudy", rainInHours: 3 },
            greenWindow: "Доступно до 14:00 (Осталось 3 часа!)",
            recommendedTons: 45
        },
        {
            id: 4,
            name: "Участок №4 (км 70 - км 72)",
            status: "working",
            weather: { temp: 16, condition: "sunny", rainInHours: null },
            greenWindow: "08:00 - 20:00",
            recommendedTons: 90
        },
        {
            id: 5,
            name: "Участок №5 (км 85 - км 90)",
            status: "maintenance",
            weather: { temp: 14, condition: "cloudy", rainInHours: null },
            greenWindow: "Технический перерыв",
            recommendedTons: 0
        }
    ],
    factories: [
        { id: 1, name: "АБЗ Семейный", capacity: "60 тонн/час", distanceToM11: "15 км" },
        { id: 2, name: "АБЗ Северный", capacity: "40 тонн/час", distanceToM11: "32 км" },
        { id: 3, name: "АБЗ Центральный", capacity: "80 тонн/час", distanceToM11: "8 км" }
    ],
    mechanicTasks: [
        { id: 101, sectionId: 2, task: "Срочное ТО асфальтоукладчика (простой из-за дождя)", status: "pending" },
        { id: 102, sectionId: 5, task: "Плановый осмотр катков", status: "in_progress" }
    ]
};