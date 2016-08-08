export default class {
    constructor(data) {
        this.homeSummary = data.homeSummary || '';
        this.awaySummary = data.awaySummary || '';
        this.scoringTeam = data.scoringTeam;
        this.points = data.points;
        this.period = data.period;
        this.time = data.time;
    }

    isDunk() {
        return this.points > 0 && 
           (this.homeSummary.includes('Dunk') || this.awaySummary.includes('Dunk'));
    }

    isMissedFreeThrow() {
        return (this.homeSummary.includes('MISS') && this.homeSummary.includes('Free Throw')) ||
            (this.awaySummary.includes('MISS') && this.awaySummary.includes('Free Throw'));
    }

    marksTheEndOfThePeriod() {
        return this.time === '0:00';
    }

    isBuzzerBeater() {
        return this.points > 0 && this.period >= 4 && this.time < '0:03';
    }
}
