<template>
    <div style="margin-bottom: 30px" v-show="show">
        <span class="headTitle">为你推荐</span>
        <!--        <el-row style="margin-top: 20px">-->
        <!--            <el-col :span="6" v-for="(item, index) in list" :key="index" :offset="index > 0 ? 2 : 0">-->
        <!--                <el-card :body-style="{ padding: '0px'}">-->
        <!--                    <el-image :src="item.logo" style="height: 200px" fit="cover"/>-->
        <!--                    <div style="padding: 14px;">-->
        <!--                        <span>{{item.courseName}}</span>-->
        <!--                    </div>-->
        <!--                </el-card>-->
        <!--            </el-col>-->
        <!--        </el-row>-->
        <el-carousel type="card" height="300px">
            <el-carousel-item v-for="(item, index) in list" :key="index">
                <h3 style="text-align: center" @click="onDetail(item)">{{item.courseName}}</h3>
                <el-image :src="item.logo" fit="contain"/>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import {recommend} from '@/api/course'
    import store from '@/store'

    export default {
        name: "Recommend",
        computed: {
            // 计算属性的 getter
            show: function () {
                // `this` 指向 vm 实例
                return this.list.length > 0
            }
        },
        data() {
            return {
                isTeacher: store.getters.isTeacher,
                list: [],
            }
        },
        created() {
            if (!this.isTeacher) {
                this.fetchData();
            }
        },
        methods: {
            fetchData() {
                recommend().then(response => {
                    console.info(response);
                    this.list = response.data;
                }).catch(error => {
                    this.$message.error(error);
                })
            }
            ,
            onDetail(obj) {
                this.$router.push(`/course/${obj.courseId}/announcement`);
            }
        }
    }
</script>

<style scoped>
    .headTitle {
        font-size: 21px;
        font-weight: 500;
        line-height: 30px;
        padding: 5px 15px;
        text-align: left;
        margin: 20px 10px 10px;
    }

</style>
