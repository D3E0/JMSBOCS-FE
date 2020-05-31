<template>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo"
             :router="true">
        <el-menu-item index="announcement" :route="{path:'announcement'}">
            <i class="el-icon-menu"/>
            <span slot="title">课程公告</span>
        </el-menu-item>
        <el-menu-item index="resource" :route="{path:'resource'}">
            <i class="el-icon-menu"/>
            <span slot="title">课程资源</span>
        </el-menu-item>
        <el-menu-item index="courseChapter" :route="{path:'chapter'}">
            <i class="el-icon-menu"/>
            <span slot="title">课时</span>
        </el-menu-item>
        <el-menu-item index="courseJob" :route="{path:'job'}">
            <i class="el-icon-menu"/>
            <span slot="title">课程作业</span>
        </el-menu-item>
        <el-menu-item index="comment" :route="{path:'comment'}">
            <i class="el-icon-menu"/>
            <span slot="title">课程讨论</span>
        </el-menu-item>

<!--        <el-menu-item index="score" :route="{path:'course'}">-->
<!--            <i class="el-icon-menu"/>-->
<!--            <span slot="title">课程成绩</span>-->
<!--        </el-menu-item>-->

        <el-menu-item index="userHome" :route="{path:'userHome'}">
            <i class="el-icon-menu"/>
            <span slot="title">联系老师</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import store from '@/store'
    import {courseInfo,} from "@/api/course";

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
                courseInfo(this.$route.params.cid).then(response => {
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
