import { NextApiRequest, NextApiResponse } from 'next';
import { fetchSprintData } from '../../utils/sprint/fetchSprintData';
import { transformSprintData } from '../../utils/data/transformData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { year, race } = req.query;

    if (!year || !race) {
        return res.status(400).json({ error: 'Ano e número da corrida são obrigatórios' });
    }

    try {
        const sprintQualyData = await fetchSprintData(Number(year), Number(race), "qualy");
        const sprintData = await fetchSprintData(Number(year), Number(race), "race");
        const transformedData = transformSprintData(sprintQualyData, sprintData);
        return res.status(200).json(transformedData);
    } catch (error) {
        return res.status(500).json({error : 'Erro ao buscar dados da corrida.'});
    }
}
