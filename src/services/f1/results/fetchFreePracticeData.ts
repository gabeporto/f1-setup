import axiosF1Instance from '../../../utils/axios/axiosInstance';

export const fetchFreePracticeData = async (year: number, raceNumber: number, practiceNumber: number) => {
    const url = `/${year}/${raceNumber}/fp${practiceNumber}`;

    try {
        const response = await axiosF1Instance.get(url);
        return response.data;
    } catch (_) {
        return null;
    }
};