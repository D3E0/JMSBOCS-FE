<template>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo"
             :router="true">
        <el-menu-item index="detail" :route="{path:'detail'}">
            <i class="el-icon-menu"/>
            <span slot="title">作业详情</span>
        </el-menu-item>
        <el-menu-item index="history" :route="{path:'history'}" v-if="isTeacher">
            <i class="el-icon-menu"/>
            <span slot="title">学生已提交作业</span>
        </el-menu-item>
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
