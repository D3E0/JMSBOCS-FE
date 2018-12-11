<template>
    <el-container>
        <el-container>
            <el-aside width="200px">
                <subject-side></subject-side>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import SubjectSide from './SubjectSide.vue'

    export default {
        name: "Subject",
        components: {
            SubjectSide
        }
    }
</script>

<style scoped>

</style>