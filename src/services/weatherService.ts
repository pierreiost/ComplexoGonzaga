import { parseISO } from 'date-fns';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { pictocodeToString } from '../constants/weatherCodes';

const PELOTAS_LAT = -31.77;
const PELOTAS_LON = -52.34;

const METEOBLUE_API_KEY = 'W1HFf0IOLYdtAJlG'; // sem ponto no final
const METEOBLUE_API_URL = `https://my.meteoblue.com/packages/current?lat=${PELOTAS_LAT}&lon=${PELOTAS_LON}&apikey=${METEOBLUE_API_KEY}&format=json`;

export interface WeatherData {
  temperatura: number;
  dataHora: string;
  condicaoClima: string;
}

export const fetchWeatherData = async (): Promise<WeatherData> => {
  const response = await fetch(METEOBLUE_API_URL);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro HTTP: ${response.status} - ${errorText || response.statusText}`);
  }

  const data = await response.json();

  if (!data || !data.data_current) {
    throw new Error('Dados da API inválidos.');
  }

  const temperatura = data.data_current.temperature;
  const pictocode = data.data_current.pictocode;
  const timeString = data.data_current.time;

  if (temperatura == null) {
    throw new Error('Temperatura não encontrada.');
  }

  const condicaoClima = pictocodeToString[pictocode] || 'Condição Desconhecida';

  let dataHoraLocal = new Date();
  if (timeString) {
    try {
      dataHoraLocal = parseISO(timeString);
      dataHoraLocal = new Date(dataHoraLocal.getTime() - (3 * 60 * 60 * 1000)); // Ajuste de fuso
    } catch (e) {
      console.error("Erro ao parsear hora:", e);
    }
  }

  const dataHora = format(dataHoraLocal, "dd 'de' MMMM 'de' HH:mm", { locale: ptBR });

  return {
    temperatura,
    condicaoClima,
    dataHora
  };
};