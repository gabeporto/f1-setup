import axios from 'axios';
import axiosInstance from '../../../utils/axios/axiosInstance';

export const fetchSprintData = async (year: number, raceNumber: number, raceType: string) => {
    const url = `/${year}/${raceNumber}/sprint/${raceType}`;

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao buscar dados da corrida sprint');
        } else {
            throw new Error('Erro desconhecido ao buscar dados da corrida sprint');
        }
    }
};