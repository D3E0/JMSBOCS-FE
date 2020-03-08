<template>
    <el-container>
        <el-header>
            <Head/>
        </el-header>
        <el-main>
            <router-view></router-view>
            <!--<router-view></router-view>-->
            <!--                <home></home>-->
            <!--</el-main>-->
            <!--<el-aside width="200px">-->
            <!--<course-side></course-side>-->
            <!--</el-aside>-->
            <!--<el-main>-->
            <!--                <router-view></router-view>-->
            <!--                <login></login>-->
        </el-main>
    </el-container>
</template>

<script>
    import Head from "@/components/layout/Head.vue"

    export default {
        name: "index",
        components: {Head},
    }
</script>

<style scoped>

</style>