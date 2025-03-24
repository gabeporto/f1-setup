export const transformRaceData = (qualyData: any, raceData: any) => {
    const formattedPoleResult = {
        driver: qualyData.races.qualyResults[0].driverId,
        team: qualyData.races.qualyResults[0].teamId,
        time: qualyData.races.qualyResults[0].q3
    }

    const formattedRaceResult = raceData.races.results.map((item: any) => ({
        position: item.position,
        driver: item.driver.driverId,
        team: item.team.teamId,
        time: item.time,
    }));

    return {
        pole: formattedPoleResult,
        race: formattedRaceResult,
    };
};
