'use client'

import React, { useState, useEffect } from 'react'
import { Cloud, Sun, Droplet, Wind, CloudRain, CloudLightning, CloudSnow } from 'lucide-react'

interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
    };
}

async function getWeatherData(): Promise<WeatherData> {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
        throw new Error('OpenWeather API key is missing');
    }

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Arcozelo,Vila Nova de Gaia,PT&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
        throw new Error(`OpenWeather API Error: ${response.status}`);
    }

    return response.json();
}

const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
        case '01d':
        case '01n':
            return <Sun className="w-16 h-16 text-yellow-600" />
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return <Cloud className="w-16 h-16 text-gray-400" />
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return <CloudRain className="w-16 h-16 text-blue-400" />
        case '11d':
        case '11n':
            return <CloudLightning className="w-16 h-16 text-yellow-400" />
        case '13d':
        case '13n':
            return <CloudSnow className="w-16 h-16 text-white" />
        case '50d':
        case '50n':
            return <Wind className="w-16 h-16 text-gray-400" />
        default:
            return <Cloud className="w-16 h-16 text-gray-400" />
    }
}

const Weather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getWeatherData();
                setWeatherData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };

        fetchWeather();
    }, []);

    if (error) {
        return (
            <div className="col-span-3 bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                <p className="text-red-500 mb-2">Error fetching weather data</p>
                <p className="text-gray-400 text-sm">{error}</p>
            </div>
        )
    }

    if (!weatherData) {
        return (
            <div className="col-span-3 bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center justify-center">
                <p className="text-gray-400">Loading weather data...</p>
            </div>
        )
    }

    return (
        <div className="col-span-3 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">Weather in Arcozelo</h2>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-4xl font-bold text-gray-200">{Math.round(weatherData.main.temp)}°C</p>
                    <p className="text-lg text-gray-400">{weatherData.weather[0].description}</p>
                </div>
                {getWeatherIcon(weatherData.weather[0].icon)}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <Cloud className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="mt-1 text-gray-300">{weatherData.clouds.all}%</p>
                    <p className="text-xs text-gray-500">Clouds</p>
                </div>
                <div>
                    <Droplet className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="mt-1 text-gray-300">{weatherData.main.humidity}%</p>
                    <p className="text-xs text-gray-500">Humidity</p>
                </div>
                <div>
                    <Wind className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="mt-1 text-gray-300">{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
                    <p className="text-xs text-gray-500">Wind</p>
                </div>
            </div>
        </div>
    )
}

export default Weather

