import axios from 'axios';
import { mockDashboardData } from './mockData';

export interface Section {
    id: number;
    name: string;
    status: 'working' | 'stopped' | 'warning' | 'maintenance';
    weather: {
        temp: number;
        condition: 'sunny' | 'rain' | 'cloudy';
        rainInHours: number | null;
    };
    greenWindow: string;
    recommendedTons: number;
    coordinates: [number, number][];
}

export interface TransportRecord {
    id: string;
    location: string;
    weight: number;
    temp: number;
    time: string;
    status: 'в пути' | 'доставлен' | 'погрузка';
}

export interface Alert {
    id: number;
    title: string;
    site: string;
    time: string;
    criticality: 'warning' | 'critical';
    description: string;
}

export interface GreenWindowResponse {
    startTime: string;
    endTime: string;
    durationHours: number;
    riskLevel: 'low' | 'medium' | 'high';
}

export interface MaxTonsRequest {
    sectionId: number;
    availableHours: number;
    temp: number;
    layerThickness: number;
}

export interface MaxTonsResponse {
    maxTons: number;
    formula: string;
    compactionTime: number;
}

const API_URL = 'http://localhost:5000/api';
const USE_REAL_BACKEND = false;

export const getDashboardSections = async () => {
    if (!USE_REAL_BACKEND) {
        return mockDashboardData.sections;
    }

    const response = await axios.get(`${API_URL}/sections`);
    return response.data;
};