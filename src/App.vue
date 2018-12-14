<template>
    <div id="app">
        <el-container>
            <el-main>
                <!--<router-view></router-view>-->
                <home></home>
                <!--</el-main>-->
                <!--<el-aside width="200px">-->
                <!--<course-side></course-side>-->
                <!--</el-aside>-->
                <!--<el-main>-->
                <!--<router-view></router-view>-->
                <!--<login></login>-->
            </el-main>
        </el-container>
    </div>
</template>
<script>
    // import Login from './components/Login.vue'
    import Home from "@/components/Home";

    export default {

        name: "app",
        components: {Home},
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
