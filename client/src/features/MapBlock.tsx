import {useEffect, useRef} from 'react';
import {mockDashboardData} from '../services/mockData';

declare global {
    interface Window {
        ymaps: any;
    }
}

export const MapBlock = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.ymaps || !mapRef.current) return;

        window.ymaps.ready(() => {
            const map = new window.ymaps.Map(mapRef.current, {
                center: [56.9200, 36.1000],
                zoom: 10,
                controls: ['zoomControl', 'fullscreenControl']
            });

            mockDashboardData.factories.forEach(factory => {
                const placemark = new window.ymaps.Placemark(factory.coordinates, {
                    balloonContent: `<b>${factory.name}</b><br/>Мощность: ${factory.capacity}`,
                    iconContent: '🏭'
                }, {
                    preset: 'islands#blueIndustryIcon'
                });
                map.geoObjects.add(placemark);
            });

            mockDashboardData.sections.forEach(section => {
                let strokeColor = '#4caf50';
                if (section.status === 'stopped') strokeColor = '#f44336';
                if (section.status === 'warning') strokeColor = '#ff9800';

                const polyline = new window.ymaps.Polyline(section.coordinates, {
                    balloonContent: `
            <b>${section.name}</b><br/>
            Статус: ${section.status.toUpperCase()}<br/>
            Погода: ${section.weather.condition === 'rain' ? '🌧️ Дождь' : '☀️ Ясно'}<br/>
            Окно: ${section.greenWindow}
          `
                }, {
                    strokeColor: strokeColor,
                    strokeWidth: 6,
                    strokeOpacity: 0.8
                });

                map.geoObjects.add(polyline);
            });
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '400px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
            <div ref={mapRef} style={{width: '100%', height: '100%'}}/>
        </div>
    );
};