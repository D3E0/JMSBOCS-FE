<template>
    <div id="app">
        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>

    export default {
        name: "app",
        components: {},
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
        color: #2c3e50;
    }
</style>
