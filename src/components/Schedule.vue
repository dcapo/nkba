<template>
    <div class="schedule">
        <div class="heading">
            <img class="team-icon" :src="teamIconUrl" />
            <h1>{{ team.teamName }}</h1>
        </div>
        <div class="form-group">
            <label for="seasonSelect">Season</label>
            <select id="seasonSelect" v-model="season" @change="onSeasonChange">
                <option value="2012-13">2011-12</option>
                <option value="2012-13">2012-13</option>
                <option value="2013-14">2013-14</option>
                <option value="2014-15">2014-15</option>
                <option value="2015-16">2015-16</option>
            </select>
            <select id="seasonTypeSelect" v-model="seasonType" @change="onSeasonTypeChange">
                <option value="Pre Season">Pre-Season</option>
                <option value="Regular Season">Regular Season</option>
                <option value="Playoffs">Playoffs</option>
            </select>
        </div>
        <div class="alert alert-danger" v-show="readyToDisplay && !schedule.length">No Data Found...</div>
        <table class="table table-striped table-bordered table-hover" v-show="schedule.length">
            <thead>
                <tr>
                    <th>Date</th> 
                    <th>Matchup</th> 
                    <th>Win/Loss</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in schedule" v-link="{ name: 'game', params: { id: game.gameId }}">
                    <td>{{ date(game) }}</td>
                    <td>{{ matchup(game) }}</td>
                    <td>{{ game.wl }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import store from '../store/store';
import * as constants from '../Constants';

export default {
    data() {
        return {
            season: '2015-16',
            seasonType: 'Regular Season',
            team: {},
            schedule: [],
            readyToDisplay: false
        }
    },
    events: {
        'teams-fetched': function(teams) {
            if (!this.$route.params.id || this.$route.params.id === ':id') {
                this.$router.go({
                    name: 'schedule',
                    params: { id: teams[0].teamId },
                    query: { season: this.season, seasonType: this.seasonType }
                });
            }
        }
    },
    computed: {
        teamIconUrl() {
            return constants.icons.urlForTeam(this.team.teamId);
        }
    },
    methods: {
        adjustQuery(query) {
            this.$router.go({
                name: 'schedule', 
                params: { id: this.team.teamId },
                query 
            });
        },
        onSeasonChange(e) {
            this.adjustQuery({
                season: e.target.value,
                seasonType: this.seasonType
            });
        },
        onSeasonTypeChange(e) {
            this.adjustQuery({
                season: this.season,
                seasonType: e.target.value
            });   
        },
        date(game) {
            return game.gameDate.slice(0, game.gameDate.indexOf(','));
        },
        matchup(game) {
            return game.matchup.split(' ').slice(1).join(' ');
        }
    },
    route: {
        data({ to }) {
            if (!(to.query.season && to.query.seasonType)) {
                this.$router.go({
                    name: 'schedule',
                    params: to.params,
                    query: { season: this.season, seasonType: this.seasonType }
                });
            }
            if (to.query.season) this.season = to.query.season;
            if (to.query.seasonType) this.seasonType = to.query.seasonType;

            let teamId = to.params.id;
            if (teamId && teamId !== ':id') {
                return Promise.all([
                    store.fetchTeam(teamId),
                    store.fetchSchedule(teamId, this.season, this.seasonType)
                ]).then(([team, schedule]) => {
                    this.readyToDisplay = true;
                    return { team, schedule };
                }).catch((error) => alert(error));
            }
        }
    }
}
</script>

<style scoped>
    .schedule {
        padding: 0px 10px;
    }

    .heading {
        display: flex;
        align-items: center;
        padding: 10px 0px;
    }

    .heading .team-icon {
        height: 40px;
        width: 40px;
        margin-right: 10px;
    }
</style>
