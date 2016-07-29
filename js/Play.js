export default class {
    
    constructor(data) {
        this.homeSummary = data.homeSummary ? data.homeSummary.toLowerCase() : '';
        this.awaySummary = data.awaySummary ? data.awaySummary.toLowerCase() : '';
        this.scoringTeam = data.scoringTeam;
        this.points = data.points;
        this.period = data.period;
        this.time = data.time;
    }

    isDunk() {
        return this.points && 
           (this.homeSummary.includes('dunk') || this.awaySummary.includes('dunk'));
    }

    isMissedFreeThrow() {
        return (this.homeSummary.includes('miss') && this.homeSummary.includes('free throw')) ||
            (this.awaySummary.includes('miss') && this.awaySummary.includes('free throw'));
    }

    marksTheEndOfThePeriod() {
        return this.time === '0:00';
    }
}
