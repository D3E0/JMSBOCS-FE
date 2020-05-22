<template>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="profile">
            <i class="el-icon-menu"/>
            <span slot="title">个人资料</span>
        </el-menu-item>
        <el-menu-item index="password">
            <i class="el-icon-menu"/>
            <span slot="title">密码修改</span>
        </el-menu-item>
        <el-menu-item index="notify">
            <i class="el-icon-menu"/>
            <span slot="title">消息中心</span>
        </el-menu-item>
<!--        <el-menu-item index="qiniu" v-if="isTeacher">-->
<!--            <i class="el-icon-menu"/>-->
<!--            <span slot="title">七牛云</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="add" v-if="isTeacher">-->
<!--            <i class="el-icon-menu"/>-->
<!--            <span slot="title">添加用户</span>-->
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
