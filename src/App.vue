<template>
    <div id="app">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="1" class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">系统通知</span>
                    </el-menu-item>
                    <el-menu-item index="2" :disabled="false">
                        <i class="el-icon-menu"></i>
                        <span slot="title">朋友私信</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <notify></notify>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import notify from "./components/notify.vue";

    export default {
        name: "app",
        components: {
            notify
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
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
