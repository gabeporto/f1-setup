import axiosInstance from '../../../utils/axios/axiosInstance';

export const fetchRaceData = async (year: number, raceNumber: number, raceType: string) => {
    const url = `/${year}/${raceNumber}/${raceType}`;

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (_) {
        return null;
    }
};