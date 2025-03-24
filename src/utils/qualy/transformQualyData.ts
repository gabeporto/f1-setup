export const transformQualyData = (qualyData: any) => {
    const formattedPoleResult = {
        driver: qualyData.races.qualyResults[0].driverId,
        team: qualyData.races.qualyResults[0].teamId,
        time: qualyData.races.qualyResults[0].q3
    }

    const formattedRaceResult = qualyData.races.qualyResults.map((item: any) => ({
        position: item.gridPosition,
        driver: item.driver.driverId,
        team: item.team.teamId,
        time: item.q3 ?? item.q2 ?? item.q1,
    }));

    return {
        pole: formattedPoleResult,
        qualy: formattedRaceResult,
    };
};
