export const teams = {
    HOME: 0,
    AWAY: 1
};


export const icons = {
    urlForTeam(teamId) {
        if (this[teamId]) {
            return `http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/${this[teamId]}.png&h=80&w=80`;
        }
        return '';
    },
    1610612737: "Atl",
    1610612738: "Bos",
    1610612751: "Bkn",
    1610612766: "Cha",
    1610612741: "Chi",
    1610612739: "Cle",
    1610612742: "Dal",
    1610612743: "Den",
    1610612765: "Det",
    1610612744: "GS",
    1610612745: "Hou",
    1610612754: "Ind",
    1610612746: "LAC",
    1610612747: "LAL",
    1610612763: "Mem",
    1610612748: "Mia",
    1610612749: "Mil",
    1610612750: "Min",
    1610612740: "NO",
    1610612752: "NY",
    1610612760: "Okc",
    1610612753: "Orl",
    1610612755: "Phi",
    1610612756: "Phx",
    1610612757: "Por",
    1610612758: "Sac",
    1610612759: "SA",
    1610612761: "Tor",
    1610612762: "Utah",
    1610612764: "WSH"
};
