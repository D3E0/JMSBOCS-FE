<template>
    <!--    课程归类-->
    <div v-loading="loading">
        <span class="headTitle">最近作业</span>

        <el-form :model="searchForm" :inline="true" style="margin-left: 25px;margin-top: 20px;">
            <el-form-item label="作业标题">
                <el-input v-model="form.keyword" :clearable="true"/>
            </el-form-item>
            <el-form-item label="课程">
                <el-select v-model="form.courseId" :clearable="true">
                    <el-option v-for="item in options" :key="item.id"
                               :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button type="success" style="margin-left: 20px" @click="dialogFormVisible = true" v-if="isTeacher">
                    发布作业
                </el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" :show-header="false" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div>{{props.row.jobContent}}</div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div class="item">
                        <div class="title">
                            <el-button type="text" style="font-size: 18px"
                                       @click="onDetail(scope.$index, scope.row)">
                                {{scope.row.jobTitle}}
                            </el-button>
                        </div>
                        <div class="time">
                             <span class="ctime"><i class="el-icon-document mr5"/>
                                {{scope.row.courseName}}
                            </span>

                            <span class="ctime"><i class="el-icon-time mr5"/>
                                  {{new Date(scope.row.jobBeginTime).toLocaleString('chinese', {hour12: false})}}
                            &nbsp; --   &nbsp;
                                {{scope.row.jobEndTime || new Date().toLocaleString('chinese', {hour12: false})}}
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" style="float: right"
                               @click="onDetail(scope.$index, scope.row)">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination layout="total, prev, pager, next"
                           :current-page.sync="form.page"
                           @current-change="fetchData"
                           :total.sync="this.count">
            </el-pagination>
        </div>

        <el-dialog title="作业发布" :visible.sync="dialogFormVisible">
            <edit v-bind:job="{}" v-on:do-close="dialogFormVisible=false"/>
        </el-dialog>
    </div>
</template>

<script>
    import {jobList} from '@/api/job'
    import {courseList} from '@/api/course'
    import edit from './edit.vue'
    import store from '@/store'

    export default {
        name: "List",
        components: {
            edit
        },
        computed: {
            itemArray() {
                let itemArray = this.list;
                let courseId = this.searchFormVal.course;
                let jobTitle = this.searchFormVal.title;
                if (courseId || jobTitle) {
                    itemArray = this.list.filter(function (item) {
                        if (jobTitle && item.jobTitle.search(jobTitle) === -1) {
                            return false;
                        }
                        if (courseId && item.courseId !== courseId) {
                            return false;
                        }
                        return true;
                    })
                }
                return itemArray;
            },
            tableData() {
                let offset = (this.page - 1) * 5;
                let end = Math.min(this.itemArray.length, offset + 5);
                console.info("change " + offset + " " + end + " " + this.page);
                if (offset === end) {
                    console.info("bug");
                }
                return this.itemArray.slice(offset, end);
            },
        },
        data() {
            return {
                search: "",
                searchVal: "",
                searchFormVal: {
                    title: "",
                    course: "",
                },
                searchForm: {
                    title: "",
                    course: "",
                },
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
                isTeacher: store.getters.isTeacher
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.loading = true;
                jobList(this.form.keyword, this.form.courseId, this.form.page, this.form.limit).then(response => {
                    this.count = response.count;
                    this.list = response.data;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });

                courseList().then(response => {
                    this.loading = false;
                    this.options = response.data.map((x) => {
                        return {id: x.courseId, name: x.courseName};
                    });
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            onDetail(index, obj) {
                this.$router.push(`/job/${obj.jobId}`);
            }, handleSearch() {
                this.form.page = 1;
                this.fetchData();
                // this.searchVal = this.search;
                // this.searchFormVal = {...this.searchForm};
                // console.info(this.searchFormVal);
            }
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
