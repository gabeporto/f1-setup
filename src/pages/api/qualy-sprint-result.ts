import { NextApiRequest, NextApiResponse } from 'next';
import { fetchSprintData } from '../../services/f1/results/fetchSprintData';
import { transformSprintQualyData } from '../../utils/data/transformData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { year, race } = req.query;

    if (!year || !race) {
        return res.status(400).json({ error: 'Ano e número da corrida classificatória da sprint são obrigatórios' });
    }

    try {
        const sprintQualyData = await fetchSprintData(Number(year), Number(race), "qualy");
        const transformedData = transformSprintQualyData(sprintQualyData);
        return res.status(200).json(transformedData);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return res.status(500).json({error : 'Erro ao buscar dados da corrida classificatória da sprint.'});
    }
}
