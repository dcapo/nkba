import * as constants from "../Constants";

export default class {
    constructor(home, away) {
        this.home = home;
        this.away = away;
    }

    static fromString(string) {
        const parts = string.split(" - ").map(part => parseInt(part));
        return new this(parts[1], parts[0]);
    }

    margin() {
        return this.home - this.away;
    }

    isTied() {
        return this.home === this.away;
    }

    winningTeam() {
        if (this.home > this.away) {
            return constants.teams.HOME;
        } else if (this.away > this.home) {
            return constants.teams.AWAY;
        }
    }

    losingTeam() {
        if (this.home < this.away) {
            return constants.teams.HOME;
        } else if (this.away < this.home) {
            return constants.teams.AWAY;
        }
    }

    tallyHome(points) {
        this.home += points;
    }

    tallyAway(points) {
        this.away += points;
    }

    tally(team, points) {
        if (team === constants.teams.HOME) {
            this.tallyHome(points);
        } else {
            this.tallyAway(points);
        }
    }
}
