<template>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo"
             :router="true">
        <el-menu-item index="list" :route="{path:'list'}">
            <i class="el-icon-menu"/>
            <span slot="title">我的课程</span>
        </el-menu-item>
        <el-menu-item index="create" :route="{path:'create'}" v-if="isTeacher">
            <i class="el-icon-menu"/>
            <span slot="title">创建课程</span>
        </el-menu-item>
        <el-menu-item index="manage" :route="{path:'manage'}" v-if="isTeacher">
            <i class="el-icon-menu"/>
            <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="favor" :route="{path:'favor'}" v-if="isStudent">
            <i class="el-icon-menu"/>
            <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item index="chapter" :route="{path:'chapter'}" v-if="isTeacher">
            <i class="el-icon-menu"/>
            <span slot="title">课时管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import store from '@/store'
    import {jobInfo,} from "@/api/job";

    export default {
        name: "Side",
        data() {
            return {
                isTeacher: store.getters.isTeacher,
                isStudent: store.getters.isStudent,
                id: store.getters.id,
                myCourse: false,
            };
        }, created() {
            // this.fetchData();
        }, methods: {
            fetchData() {
                jobInfo(this.$route.params.id).then(response => {
                    this.myCourse = response.data.teacherId === this.id;
                }).catch(error => {
                    this.$message.error(error);
                });

            }
        }
    }
</script>

<style scoped>

</style>
