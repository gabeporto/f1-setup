import axiosF1Instance from '../../../utils/axios/axiosInstance';

export const fetchSprintData = async (year: number, raceNumber: number, raceType: string) => {
    const url = `/${year}/${raceNumber}/sprint/${raceType}`;

    try {
        const response = await axiosF1Instance.get(url);
        return response.data;
    } catch (_) {
        return null;
    }
};