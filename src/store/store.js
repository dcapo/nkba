import { Promise } from 'es6-promise';
import nba from 'nba';

let teamsCache = [];
let currentTeam = {};
let schedulesCache = {};

export default {

    fetchAllTeams() {
        return new Promise((resolve, reject) => {
            if (teamsCache.length) {
                resolve(teamsCache);
            } else {
                nba.stats.teamStats((error, data) => {
                    if (error) reject(error);
                    teamsCache = data;
                    resolve(teamsCache);
                });
            }
        });
    },

    fetchTeam(teamId) {
        return new Promise((resolve, reject) => {
            if (teamsCache.length && teamsCache[teamId]) {
                resolve(teamsCache[teamId]);
            } else {
                this.fetchAllTeams().then((teams) => {
                    resolve(teams.find(team => team.teamId == teamId));
                }).catch(error => reject(error));
            }
        });
    },

    fetchSchedule(teamId, season, seasonType) {
        return new Promise((resolve, reject) => {
            let key = `${teamId}.${season}.${seasonType}`;
            if (schedulesCache[key]) {
                resolve(schedulesCache[key]);
            } else {
                nba.stats.teamGameLog({ teamId, season, seasonType }, (error, data) => {
                    if (error) reject(error);
                    schedulesCache[key] = data;
                    resolve(data);
                });
            }
        })
    },

    fetchPlayByPlay(gameId) {
        return new Promise((resolve, reject) => {
            nba.stats.playByPlay({ gameId }, (error, data) => {
                if (error) reject(error);
                resolve(data.playByPlay);
            });
        });
    },

    fetchBoxScore(gameId) {
        return new Promise((resolve, reject) => {
            nba.stats.boxScoreSummary({ gameId }, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    }

}

