import axiosInstance from '../../../utils/axios/axiosInstance';

export const fetchFreePracticeData = async (year: number, raceNumber: number, practiceNumber: number) => {
    const url = `/${year}/${raceNumber}/fp${practiceNumber}`;

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (_) {
        return null;
    }
};