<template>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <span id="s_title" class="logo">基于开放云储存的作业管理系统</span>
        <el-menu-item index="1">
            <i class="fa fa-home fa-fw"/>&nbsp;首页
        </el-menu-item>
        <el-menu-item index="2">
            <i class="fa fa-book fa-fw"/>&nbsp;课程
        </el-menu-item>
        <el-menu-item index="3">
            <i class="fa fa-tasks fa-fw"/>&nbsp;作业
        </el-menu-item>

        <el-submenu index="5" class="layout-right">
            <template slot="title">
                <i class="fa fa-user fa-fw"/>赵刚
            </template>
            <el-menu-item index="5-1">个人信息</el-menu-item>
            <el-menu-item index="5-2">退出登录</el-menu-item>
        </el-submenu>

        <el-menu-item index="4" class="layout-right">
            <i class="fa fa-bell-o fa-fw"/>
        </el-menu-item>
    </el-menu>

</template>

<script>
    export default {
        name: "Head",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted: function () {
            document.getElementById("s_title").removeAttribute("tabindex")
        }
    }
</script>

<style scoped>
    .logo {
        font-size: 20px;
        line-height: 60px;
        color: #000000;
        float: left;
        padding-right: 20px;
    }

    .layout-right {
        float: right;
    }

</style>