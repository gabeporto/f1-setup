import { NextApiRequest, NextApiResponse } from 'next';
import { fetchRaceData } from '../../utils/race/fetchRaceData';
import { transformRaceData } from '../../utils/race/transformRaceData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { year, race } = req.query;

    if (!year || !race) {
        return res.status(400).json({ error: 'Ano e número da corrida são obrigatórios' });
    }

    try {
        const qualyData = await fetchRaceData(Number(year), Number(race), "qualy");
        const raceData = await fetchRaceData(Number(year), Number(race), "race");
        const transformedData = transformRaceData(qualyData, raceData);
        return res.status(200).json(transformedData);
    } catch (error) {
        return res.status(500).json({error : 'Erro ao buscar dados da corrida.'});
    }
}
