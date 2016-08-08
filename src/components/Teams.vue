<template>
    <div class="teams">
        <div class="heading">
            <a href="http://deadspin.com/5988085/north-korea-invented-its-own-totally-different-way-of-scoring-basketball-games">
                <img class="heading--flag" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_North_Korea.svg/640px-Flag_of_North_Korea.svg.png">
            </a>
            <span class="heading--title">NKBA Scoring</span>
        </div>
        <div class="welcome alert">
            <div><strong>Welcome to the NKBA!</strong></div>
            <span>
                View scores and stats according to North Korean basketball rules!
            </span>
        </div>
        <h2>Teams</h2>
        <table class="teams-table table">
            <tbody>
                <tr v-for="team in teams" v-link="{ name: 'schedule', params: { id: team.teamId }}">
                    <td class="team-td">
                        <img :src="iconUrlForTeam(team.teamId)"> 
                        <span>{{ team.teamName }}</span>
                    </td>
                </tr>
            </tbody>
        </ul>
    </div>
</template>

<script>

import store from '../store/store';
import * as constants from '../Constants';

export default {
    data() {
        return {
            teams: []
        }
    },
    methods: {
        iconUrlForTeam(teamId) {
            if (teamId) {
                return constants.icons.urlForTeam(teamId);
            }
            return '';
        }
    },
    events: {
        'teams-fetched': function(teams) {
            this.teams = teams;
        }
    }
}
</script>

<style scoped>
    .teams {
        height: 100%;
        overflow-y: auto;
        background-color: #333333;
        padding: 0px 10px;
        color: white;
    }

    .heading {
        padding: 10px 0px;
        display: flex;
        align-items: center;
    }

    .heading--flag {
        height: 30px;
        margin-right: 10px;
    }

    .heading--title {
        font-weight: lighter;
        font-size: 20px;
    }

    .welcome {
        margin-top: 10px;
        background-color: white;
        color: black;
    }

    a {
        color: inherit;
    }

    .teams-table td {
        border: 1px solid #5a5a5a;
    }
    
    .team-td {
        list-style-type: none;
        background-color: inherit;
        cursor: pointer;
    }

    .team-td img {
        width: 21px;
        height: 21px;
    }
</style>
