<template>
    <div id="app">
        <div class="sidebar">
            <teams></teams> 
        </div>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Teams from './Teams.vue';
import Schedule from './Schedule.vue';
import store from '../store/store.js';

export default {
    components: { Teams, Schedule },
    ready() {
        store.fetchAllTeams().then(teams => {
            this.$broadcast('teams-fetched', teams);
        }).catch(error => {
            alert(error);
        });
    }
}
</script>

<style>
    body {
        overflow: hidden;
    }
    #app {
        height: 100vh;
        display: flex;
        will-change: width;
    }
    .sidebar {
        width: 280px;
    }
    .main-content {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        flex: 1;
    }
</style>
