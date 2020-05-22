<template>
    <el-container>
        <el-container>
            <el-aside width="200px">
                <side/>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Side from './side.vue'

    export default {
        name: "Index",
        components: {
            Side
        }
    }
</script>

<style scoped>

</style>
