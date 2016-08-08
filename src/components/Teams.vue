<template>
    <div class="teams">
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
