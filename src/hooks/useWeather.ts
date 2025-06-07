import { useState, useEffect } from 'react';
import WeatherService from '../services/weather';
import { WeatherData } from '../types/weather';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await WeatherService.getTemperature();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return {
    weatherData,
    loading,
    error,
    refetch: fetchWeather,
  };
};

export default useWeather;