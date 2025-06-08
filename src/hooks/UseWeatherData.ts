// src/hooks/useWeatherData.ts
import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/wheaterService';

export const useWeatherData = () => {
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [condicaoClima, setCondicaoClima] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { temperatura, condicaoClima } = await fetchWeatherData();
        setTemperatura(temperatura);
        setCondicaoClima(condicaoClima);
      } catch (err: any) {
        console.error("Erro:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { temperatura, condicaoClima, loading, error };
};