import axiosF1Instance from '../../../utils/axios/axiosInstance';

export const fetchScore = async (year: number, type: string) => {
    const url = `/${year}/${type}-championship`;

    try {
        const response = await axiosF1Instance.get(url);
        return response.data;
    } catch (_) {
        return null;
    }
};