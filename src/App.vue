<template>
    <div id="app">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="comment" class="el-menu-vertical-demo"
                         @select="onSelect" :router="true">
                    <el-menu-item index="notify">
                        <i class="el-icon-menu"></i>
                        <span slot="title">系统通知</span>
                    </el-menu-item>
                    <el-menu-item index="comment" :disabled="false">
                        <i class="el-icon-menu"></i>
                        <span slot="title">评论</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
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
        },
        methods: {
            onSelect(index, indexPath) {
                console.info(index, indexPath);
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
