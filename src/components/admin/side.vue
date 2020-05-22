<template>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="category">
            <i class="el-icon-menu"/>
            <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="user">
            <i class="el-icon-menu"/>
            <span slot="title">用户管理</span>
        </el-menu-item>
<!--        <el-menu-item index="teacher">-->
<!--            <i class="el-icon-menu"/>-->
<!--            <span slot="title">教师管理</span>-->
<!--        </el-menu-item>-->
    </el-menu>
</template>

<script>
    import store from '@/store'

    export default {
        name: "Side",
        data() {
            return {
                isTeacher: store.getters.isTeacher
            };
        }
    }
</script>

<style scoped>

</style>
