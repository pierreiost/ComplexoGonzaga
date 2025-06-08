import { METEOBLUE_API_KEY, METEOBLUE_API_URL } from '../constants/api';
import { WeatherData } from '../types/weather';

export class WeatherService {
  static async getTemperature(): Promise<WeatherData> {
    try {
      const response = await fetch(`${METEOBLUE_API_URL}&apikey=${METEOBLUE_API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        temperature: data.temperature || 0,
        location: data.location || 'Desconhecido',
        condition: data.condition || 'N/A',
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Erro ao buscar temperatura:', error);
      throw new Error('Falha ao carregar dados meteorológicos');
    }
  }
}

export default WeatherService;