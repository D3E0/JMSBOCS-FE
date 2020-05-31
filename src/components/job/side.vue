<template>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo"
             :router="true">
        <el-menu-item index="detail" :route="{path:'detail'}">
            <i class="el-icon-menu"/>
            <span slot="title">作业详情</span>
        </el-menu-item>
        <el-menu-item index="history" :route="{path:'history'}" v-if="myCourse">
            <i class="el-icon-menu"/>
            <span slot="title">学生已提交作业</span>
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
                id: store.getters.id,
                myCourse: false
            };
        }, created() {
            this.fetchData();
        }, methods: {
            fetchData() {
                jobInfo(this.$route.params.id).then(response => {
                    this.myCourse = parseInt(response.data.teacherId) === parseInt(store.getters.id);
                }).catch(error => {
                    this.$message.error(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>
