<template>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
             :router="true">
        <el-menu-item index="/subject/list" :route="{path:'/subject/list'}">
            <i class="el-icon-menu"></i>
            <span slot="title">我的课程</span>
        </el-menu-item>
        <el-menu-item index="/subject/create" :route="{path:'/subject/create'}">
            <i class="el-icon-menu"></i>
            <span slot="title">创建课程</span>
        </el-menu-item>
        <el-menu-item index="/subject/manage" :route="{path:'/subject/manage'}">
            <i class="el-icon-menu"></i>
            <span slot="title">课程管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "SubjectSide"
    }
</script>

<style scoped>

</style>