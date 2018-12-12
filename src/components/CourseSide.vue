<template>
    <el-menu default-active="1" class="el-menu-vertical-demo"
             :router="true">
        <el-menu-item index="1" :route="{path:'/course/announcement', params: { courseId: cid }}">
            <i class="el-icon-menu"></i>
            <span slot="title">课程公告</span>
        </el-menu-item>
        <el-menu-item index="2" :route="{path:'/course/resource',params: { courseId: cid }}">
            <i class="el-icon-menu"></i>
            <span slot="title">课程资源</span>
        </el-menu-item>
        <el-menu-item index="3" :route="{path:'/course/comment',params: { courseId: cid }}">
            <i class="el-icon-menu"></i>
            <span slot="title">课程讨论</span>
        </el-menu-item>
        <el-menu-item index="4" :route="{path:'/course/userhome',params: { courseId: cid }}">
            <i class="el-icon-menu"></i>
            <span slot="title">联系老师</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "CourseSide",
        props: ['uid', 'isTch', 'cid'],
        methods: {},
        computed: {}
    }
</script>

<style scoped>

</style>