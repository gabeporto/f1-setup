import axios from 'axios';
import axiosInstance from '../axios/axiosInstance';

export const fetchRaceData = async (year: number, raceNumber: number, raceType: string) => {
    const url = `/${year}/${raceNumber}/${raceType}`;

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao buscar dados da corrida');
        } else {
            throw new Error('Erro desconhecido ao buscar dados da corrida');
        }
    }
};