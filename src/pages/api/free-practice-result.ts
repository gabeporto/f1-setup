import { NextApiRequest, NextApiResponse } from 'next';
import { fetchFreePracticeData } from '../../services/f1/results/fetchFreePracticeData';
import { transformFreePracticeData } from '../../utils/data/transformData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { year, race, practiceNumber } = req.query;

    if (!year || !race) {
        return res.status(400).json({ error: 'Ano e número da corrida são obrigatórios' });
    }

    try {
        const freePracticeData = await fetchFreePracticeData(Number(year), Number(race), Number(practiceNumber));
        const transformedData = transformFreePracticeData(freePracticeData, Number(practiceNumber));
        return res.status(200).json(transformedData);
    } catch (error) {
        console.error("Erro ao buscar dados do treino:", error);
        return res.status(500).json({error : 'Erro ao buscar dados do treino.'});
    }
}
