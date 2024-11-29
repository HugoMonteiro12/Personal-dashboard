import React, {useEffect, useState} from 'react';
import {
    Cloud,
    Sun,
    Droplet,
    Wind,
    CloudLightning,
    CloudSnow,
    MapPin,
    Sunrise,
    Sunset,
    Thermometer,
    CloudFog,
    CloudDrizzle,
    CloudHail,
    MoonStar,
    CloudMoon,
    CloudSunRain,
    CloudMoonRain,
    Cloudy
} from 'lucide-react';

interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
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
    sys: {
        sunrise: number;
        sunset: number;
    };
}

interface ForecastData {
    dt: number;
    main: {
        temp: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
}

async function getWeatherData(): Promise<WeatherData> {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Arcozelo,Vila Nova de Gaia,PT&units=metric&appid=4b4cb2cb1db7201e667dcfd47ce0b47a`
    );

    if (!response.ok) {
        throw new Error(`OpenWeather API Error: ${response.status}`);
    }

    return response.json();
}

async function getForecastData(): Promise<ForecastData[]> {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=Arcozelo,Vila Nova de Gaia,PT&units=metric&appid=4b4cb2cb1db7201e667dcfd47ce0b47a`
    );

    if (!response.ok) {
        throw new Error(`OpenWeather API Error: ${response.status}`);
    }

    const data = await response.json();

    return data.list.filter((item: ForecastData) => {
        const date = new Date(item.dt * 1000);
        return date.getHours() === 12;
    }).slice(0, 3);
}

const getWeatherIcon = (iconCode: string, size: 'sm' | 'lg' = 'lg') => {
    const className = size === 'lg' ? "w-12 h-12" : "w-6 h-6";

    switch (iconCode) {
        // Clear sky
        case '01d':
            return <Sun className={`${className} text-yellow-400`}/>
        case '01n':
            return <MoonStar className={`${className} text-gray-300`}/>

        // Few clouds
        case '02d':
            return <Sun className={`${className} text-yellow-400`}/>
        case '02n':
            return <CloudMoon className={`${className} text-gray-300`}/>

        // Scattered clouds
        case '03d':
        case '03n':
            return <Cloud className={`${className} text-gray-400`}/>

        // Broken clouds
        case '04d':
        case '04n':
            return <Cloudy className={`${className} text-gray-400`}/>

        // Shower rain
        case '09d':
            return <CloudDrizzle className={`${className} text-blue-400`}/>
        case '09n':
            return <CloudDrizzle className={`${className} text-blue-300`}/>

        // Rain
        case '10d':
            return <CloudSunRain className={`${className} text-blue-400`}/>
        case '10n':
            return <CloudMoonRain className={`${className} text-blue-300`}/>

        // Thunderstorm
        case '11d':
        case '11n':
            return <CloudLightning className={`${className} text-yellow-400`}/>

        // Snow
        case '13d':
        case '13n':
            return <CloudSnow className={`${className} text-white`}/>

        // Mist/Fog
        case '50d':
        case '50n':
            return <CloudFog className={`${className} text-gray-400`}/>

        // Hail (Additional weather condition)
        case 'hail':
            return <CloudHail className={`${className} text-blue-300`}/>

        // Default fallback
        default:
            return <Cloud className={`${className} text-gray-400`}/>
    }
}
const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {weekday: 'short'});
}

const Weather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [forecastData, setForecastData] = useState<ForecastData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [weather, forecast] = await Promise.all([
                    getWeatherData(),
                    getForecastData()
                ]);
                setWeatherData(weather);
                setForecastData(forecast);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <div className="col-span-3 bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                <p className="text-red-500 mb-2">Error fetching weather data</p>
                <p className="text-gray-400 text-sm">{error}</p>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className="col-span-3 bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading weather data...</div>
            </div>
        );
    }

    return (
        <div className="col-span-4 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-blue-400"/>
                <h1 className="text-xl font-semibold text-gray-200">Arcozelo, Vila Nova de Gaia</h1>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    {getWeatherIcon(weatherData.weather[0].icon, 'lg')}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-200">{Math.round(weatherData.main.temp)}°C</h2>
                        <p className="text-gray-400 capitalize">{weatherData.weather[0].description}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1">
                            <Droplet className="w-4 h-4 text-blue-400"/>
                            <span className="text-gray-300">{weatherData.main.humidity}%</span>
                        </div>
                        <p className="text-xs text-gray-500">Humidity</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1">
                            <Wind className="w-4 h-4 text-gray-400"/>
                            <span className="text-gray-300">{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
                        </div>
                        <p className="text-xs text-gray-500">Wind</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-700/20 rounded-xl">
                <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-400"/>
                    <div>
                        <p className="text-sm text-gray-400">Feels like</p>
                        <p className="text-lg font-semibold text-gray-200">{Math.round(weatherData.main.feels_like)}°C</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-400">
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Sunrise className="w-4 h-4 text-yellow-400"/>
                    <div>
                        <p className="text-sm text-gray-400">Sunrise</p>
                        <p className="text-lg font-semibold text-gray-200">{formatTime(weatherData.sys.sunrise)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Sunset className="w-4 h-4 text-orange-400"/>
                    <div>
                        <p className="text-sm text-gray-400">Sunset</p>
                        <p className="text-lg font-semibold text-gray-200">{formatTime(weatherData.sys.sunset)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-700">
                {forecastData.map((day) => (
                    <div key={day.dt} className="text-center">
                        <p className="text-sm font-medium text-gray-400 mb-1">{formatDay(day.dt)}</p>
                        <div className="flex justify-center mb-1">
                            {getWeatherIcon(day.weather[0].icon, 'sm')}
                        </div>
                        <p className="text-lg font-semibold text-gray-300">{Math.round(day.main.temp)}°C</p>
                        <p className="text-xs text-gray-500 capitalize">{day.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Weather;