import { fetchScore } from "./score/fetchScore";


export const fetchDriverConstructorScore = async (year: number) => {
    if(!year) year = 2025;

    const driverScoreData = await fetchScore(year, "drivers");
    const constructorScoreData = await fetchScore(year, "constructors");

    return {
        drivers: driverScoreData,
        constructors: constructorScoreData,
    }
};