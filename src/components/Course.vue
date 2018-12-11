<template>
    <div>
        <el-container>
            <el-header>
                <div style="font-size: 22px; text-align: left; margin-left: 40px">Java</div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <course-side></course-side>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import CourseSide from './CourseSide.vue'

    export default {
        name: "Course",
        components: {
            CourseSide
        }
    }
</script>

<style scoped>

</style>