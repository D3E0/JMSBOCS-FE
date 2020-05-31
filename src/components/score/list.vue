<template>
    <!--    课程归类-->
    <div v-loading="loading">
        <span class="headTitle">成绩列表</span>

        <el-form :model="form" :inline="true" style="margin-left: 25px;margin-top: 20px;">
            <el-form-item label="课程标题">
                <el-input v-model="form.keyword" :clearable="true"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="scoreList" :show-header="false" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table :data="props.row.jobs" style="width: 100%">
                        <el-table-column prop="jobId" label="序号">
                        </el-table-column>
                        <el-table-column prop="jobTitle" label="作业">
                            <template slot-scope="scope">
                                <el-link type="info"
                                         @click="onJobDetail(scope.$index, scope.row)">{{scope.row.jobTitle}}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="score" label="成绩">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div class="item">
                        <div class="title">
                            <el-button type="text" style="font-size: 18px"
                                       @click="onDetail(scope.$index, scope.row)">
                                {{scope.row.courseName}}
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination layout="total, prev, pager, next"
                           :current-page.sync="form.page"
                           @current-change="fetchData"
                           :total.sync="this.scoreCount">
            </el-pagination>
        </div>

        <el-dialog title="作业发布" :visible.sync="dialogFormVisible">
            <edit v-bind:job="{}" v-on:do-close="dialogFormVisible=false"/>
        </el-dialog>
    </div>
</template>

<script>
    import {scoreList} from '@/api/job'
    import edit from '@/components/job/edit.vue'
    import store from '@/store'

    export default {
        name: "List",
        components: {
            edit
        },
        computed: {},
        data() {
            return {
                form: {
                    keyword: "",
                    courseId: "",
                    page: 1,
                    limit: 10,
                },
                dialogFormVisible: false,
                loading: false,
                list: [],
                options: [],
                page: 1,
                count: 0,
                scoreCount: 0,
                isTeacher: store.getters.isTeacher,
                scoreList: [],
                jobData: [],
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                scoreList(this.form.keyword, this.form.page, this.form.limit).then(response => {
                    this.scoreCount = response.count;
                    this.scoreList = response.data;
                    console.info(response.data)
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            onDetail(index, obj) {
                this.$router.push(`/course/${obj.courseId}`);
            }, handleSearch() {
                this.form.page = 1;
                this.fetchData();
            }, onJobDetail(index, obj) {
                this.$router.push(`/job/${obj.jobId}`);
            },
        },
    }
</script>

<style scoped>
    @import "../../assets/course.css";

    .headTitle {
        font-size: 21px;
        font-weight: 500;
        margin: 20px 10px;
        line-height: 30px;
        padding: 5px 15px;
        text-align: left;
    }
</style>
