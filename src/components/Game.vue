<template>
    <div class="game">
        <div class="loading" v-if="!readyToDisplay">
            <spinner></spinner>
            <div class="loading__message">Doing Some North Korean Math...</div>
        </div>
        <div v-else>
            <div class="heading">
                <div class="heading__team heading__team--home">
                    <img class="team-icon"
                        :src="teamIconUrl(homeTeam.teamId)" />
                    <div>
                        <h3>{{ homeTeam.teamName }}</h3>
                        <div>{{ homeTeam.w }}-{{ homeTeam.l }}</div>
                    </div>
                </div>
                <div class="median">
                    <span class="vs">VS.</span>
                    <div class="game-date">{{ gameDate }}</div>
                </div>
                <div class="heading__team">
                    <img class="team-icon"
                        :src="teamIconUrl(awayTeam.teamId)" />
                    <div>
                        <h3>{{ awayTeam.teamName }}</h3>
                        <div>{{ awayTeam.w }}-{{ awayTeam.l }}</div>
                    </div>
                </div>
            </div>
            <div class="game-table-parent">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>{{ boxScore.lineScore[0].teamAbbreviation }}</th>
                            <th>{{ boxScore.lineScore[1].teamAbbreviation }}</th>
                        </tr>
                    </thead> 

                    <tbody>
                        <tr :class="classForNKRow()">
                            <th>North Korean Score</th>
                            <th class="different-outcome">
                                <span v-show="northKoreanOutcomeIsDifferent">
                                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                    <span class="different-outcome--message" v-show="northKoreanOutcomeIsDifferent">Outcome is different!</span>
                                </span>
                            </th>
                            <td>{{ northKoreanStats.score.home }}</td>
                            <td>{{ northKoreanStats.score.away }}</td>
                        </tr>
                        <tr>
                            <th>American Score</th>
                            <th></th>
                            <td>{{ americanScore.home }}</td>
                            <td>{{ americanScore.away }}</td>
                        </tr>
                        <tr>
                            <th>Dunks (+3)</th>
                            <th></th>
                            <td>{{ northKoreanStats.dunks[teams.HOME] }}</td>
                            <td>{{ northKoreanStats.dunks[teams.AWAY] }}</td>
                        </tr>
                            <th>Missed Free Throws (-1)</th>
                            <th></th>
                            <td>{{ northKoreanStats.missedFreeThrows[teams.HOME] }}</td>
                            <td>{{ northKoreanStats.missedFreeThrows[teams.AWAY] }}</td>
                        </tr>
                        <tr>
                            <th>Buzzer Beaters (+8)</th>
                            <th></th>
                            <td>{{ northKoreanStats.buzzerBeaters[teams.HOME] }}</td>
                            <td>{{ northKoreanStats.buzzerBeaters[teams.AWAY] }}</td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </div>
    </div>
</template>

<script>

import store from '../store/store';
import Game from '../models/Game';
import NorthKoreanStats from '../models/NorthKoreanStats';
import Score from '../models/Score';
import * as constants from '../Constants';
import Spinner from './Spinner.vue';

export default {
    components: { Spinner }, 
    data() {
        return {
            readyToDisplay: false,
            playByPlay: [],
            boxScore: {
                gameInfo: [{ gameDate: ''}],
                gameSummary: [{}],
                lineScore: [{}, {}]
            },
            homeTeam: {},
            awayTeam: {},
            northKoreanStats: new NorthKoreanStats(new Game([]))
        };
    },

    computed: {
        gameDate() {
            let fullDate = this.boxScore.gameInfo[0].gameDate;
            // slice off the day of the week
            return fullDate.slice(fullDate.indexOf(',') + 1);
        },
        americanScore() {
            return new Score(this.boxScore.lineScore[0].pts,
                             this.boxScore.lineScore[1].pts);
        },
        teams() {
            return constants.teams;
        },
        northKoreanOutcomeIsDifferent() {
            return this.americanScore.winningTeam() !==
                   this.northKoreanStats.score.winningTeam();
        }
    },

    methods: {
        teamIconUrl(teamId) {
            if (teamId) {
                return constants.icons.urlForTeam(teamId);
            }
            return '';
        },
        classForNKRow() {
            return this.northKoreanOutcomeIsDifferent ? 'danger' : 'warning'; 
        }
    },

    route: {
        data(transition) {
            let gameId = transition.to.params.id;
            return store.fetchBoxScore(gameId).then(boxScore => {
                return Promise.all([
                    store.fetchPlayByPlay(gameId),
                    store.fetchTeam(boxScore.gameSummary[0].homeTeamId),
                    store.fetchTeam(boxScore.gameSummary[0].visitorTeamId)
                ]).then(([playByPlay, homeTeam, awayTeam]) => {
                    this.readyToDisplay = true;
                    let game = new Game(playByPlay);
                    let northKoreanStats = new NorthKoreanStats(game);
                    return { boxScore, playByPlay, homeTeam, 
                             awayTeam, northKoreanStats };
                });
            });
        }
    }
}
</script>

<style scoped>
    .loading__message {
        text-align: center;
    }
    .heading {
        display: flex;
        align-items: center;
        margin: 30px 0px;
    }
    .heading .team-icon {
        height: 40px;
        width: 40px;
        margin: 0px 10px;
    }
    .heading h3 {
        margin: 0px;
    }
    .heading__team {
        display: flex;
        align-items: center;
        height: 70px; 
        flex: 1;
    }
    .heading__team--home {
        justify-content: flex-end;
    }
    .median {
        padding: 0px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .vs {
        font-weight: lighter;
        font-size: 30px;
    }
    .game-table-parent {
        padding: 0px 30px;
    }
    .different-outcome {
        text-align: right;
    }
    .different-outcome--message {
        margin-right: 50px;
    }
</style>
