import { RACES_WITH_SPRINT } from "@/utils/f1/races";
import { fetchFreePracticeData } from "./results/fetchFreePracticeData";
import { fetchSprintData } from "./results/fetchSprintData";
import { fetchRaceData } from "./results/fetchRaceData";

export const fetchRaceResults = async (year: number, raceNumber: number) => {

    if(!raceNumber || raceNumber <= 0 || raceNumber > 24) return null;
    if(!year) year = 2025;

    // SPRINT
    if(RACES_WITH_SPRINT.includes(raceNumber)) {   
        // Get all weekend results data
        const freePracticeOneData = await fetchFreePracticeData(year, raceNumber, 1); // Free Practice 1
        const sprintQualyData = await fetchSprintData(year, raceNumber, "qualy"); // Sprint Qualifying
        const sprintData = await fetchSprintData(year, raceNumber, "race"); // Sprint
        const qualyData = await fetchRaceData(year, raceNumber, "qualy"); // Qualifying Race
        const raceData = await fetchRaceData(year, raceNumber, "race"); // Race

        return {
            freePracticeOneData: freePracticeOneData,
            sprintQualyData: sprintQualyData,
            sprintData: sprintData,
            qualyData: qualyData,
            raceData: raceData,
            isRaceWithSprint: true
        }
        
    // WITHOUT SPRINT
    } else {
        const freePracticeOneData = await fetchFreePracticeData(year, raceNumber, 1); // Free Practice 1
        const freePracticeTwoData = await fetchFreePracticeData(year, raceNumber, 2); // Free Practice 2
        const freePracticeThreeData = await fetchFreePracticeData(year, raceNumber, 3); // Free Practice 3
        const qualyData = await fetchRaceData(year, raceNumber, "qualy"); // Qualifying Race
        const raceData = await fetchRaceData(year, raceNumber, "race"); // Race

        return {
            freePracticeOneData: freePracticeOneData,
            freePracticeTwoData: freePracticeTwoData,
            freePracticeThreeData: freePracticeThreeData,
            qualyData: qualyData,
            raceData: raceData,
            isRaceWithSprint: false
        }
    }
};