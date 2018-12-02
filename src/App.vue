<template>
    <div id="app">
        <el-container>
            <el-aside width="200px">
                <user-side v-bind:uid="uid" v-bind:is-tch="isTch"></user-side>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import userSide from "./components/userSide.vue";

    export default {
        name: "app",
        components: {
            userSide
        },
        data() {
            return {
                uid: this.$root.uid,
                isTch: this.$root.isTch,
            }
        }
    };
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
