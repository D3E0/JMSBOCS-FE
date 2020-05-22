<template>
    <el-container>
        <el-header>
            <Head/>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import Head from "@/components/layout/head.vue"

    export default {
        name: "index",
        components: {Head},
    }
</script>

<style scoped>

</style>
