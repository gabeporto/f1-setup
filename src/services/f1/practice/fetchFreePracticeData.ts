import axios from 'axios';
import axiosInstance from '../../../utils/axios/axiosInstance';

export const fetchFreePracticeData = async (year: number, raceNumber: number, practiceNumber: number) => {
    const url = `/${year}/${raceNumber}/fp${practiceNumber}`;

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erro ao buscar dados do treino livre');
        } else {
            throw new Error('Erro desconhecido ao buscar dados do treino livre');
        }
    }
};