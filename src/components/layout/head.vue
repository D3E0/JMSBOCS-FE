<template>
    <el-menu :default-active="$route.path.split('/')[1]" mode="horizontal" @select="handleSelect" :router="true">
        <span id="s_title" class="logo">基于微服务架构的网络课程平台</span>
        <el-menu-item index="home" :route="{path:'/home'}">
            <i class="fa fa-home fa-fw"/>&nbsp;首页
        </el-menu-item>
        <el-menu-item index="subject" :route="{path:'/subject'}">
            <i class="fa fa-book fa-fw"/>&nbsp;课程
        </el-menu-item>
        <el-menu-item index="jobList" :route="{path:'/jobList'}">
            <i class="fa fa-tasks fa-fw"/>&nbsp;作业
        </el-menu-item>

        <el-submenu index="5" class="layout-right">
            <template slot="title">
                <i class="fa fa-user fa-fw"/>{{name}}
            </template>
            <el-menu-item index="user" :route="{path:'/user'}">个人信息</el-menu-item>
            <el-menu-item index="user" :route="{path:'/admin'}">系统管理</el-menu-item>
            <el-menu-item index="logout" :route="{path:this.$route.path}">退出登录</el-menu-item>
        </el-submenu>

        <el-menu-item index="notify" class="layout-right" :route="{path:'/user/notify'}">
            <i class="fa fa-bell-o fa-fw"/>
        </el-menu-item>
    </el-menu>

</template>

<script>
    import store from '@/store'

    export default {
        name: "Head",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                name: store.getters.name
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                if (key === "logout") {
                    this.onLogout();
                }
            },
            onLogout() {
                this.$store.dispatch('Logout').then(() => {
                    this.$message({
                        message: '登出成功',
                        type: 'success'
                    });
                    console.info('success');
                    this.$router.push({path: '/xx'})
                }).catch(error => {
                    console.info(error);
                    this.$message.error('登出失败');
                })
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
