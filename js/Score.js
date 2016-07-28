export default class {
    constructor(home, away) {
        this.home = home;
        this.away = away;
    }

    static fromString(string) {
        const parts = string.split(" - ");
        return new this(parts[1], parts[0]);
    }

    margin() {
        return this.home - this.away;
    }

    scoreHome(points) {
        this.home += points;
    }

    scoreAway(points) {
        this.away += points;
    }
}
