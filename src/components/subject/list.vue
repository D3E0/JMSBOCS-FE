<template>
    <div>
        <el-row>
            <el-col :span="24" class="panel-title" v-if="isTeacher">已开课程</el-col>
            <el-col :span="24" class="panel-title" v-if="!isTeacher">已选课程</el-col>
        </el-row>
        <div>
            <el-input v-model="form.keyword" placeholder="请输入课程标题" prefix-icon="el-icon-search"
                      style="width: 300px"></el-input>
            <el-button style="margin-left: 20px" type="primary" @click="handleSearch">搜索</el-button>
        </div>

        <el-table :data="list" style="width: 100%"
                  :show-header="false" v-loading="loading">
            <el-table-column min-width="180px">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.logo" fit="fill">
                        <div slot="error" class="image-slot">
                            <el-image style="width: 100px; height: 100px" :src="pic" fit="fill"/>
                        </div>
                    </el-image>
                    <div class="item">
                        <div class="title">
                            <!--<router-link :to="'/course/' + scope.row.courseId">-->
                            <!--{{scope.row.courseName}}-->
                            <!--</router-link>-->
                            <el-button type="text" style="font-size: 18px" @click="f(scope.$index,scope.row)">
                                {{scope.row.courseName}}
                            </el-button>
                        </div>
                        <div class="time">
                            <span class="ctime">
                                <i class="el-icon-service mr5"/>{{scope.row.teacherName}}
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <div style="float: right">
                        <el-tag type="success" class="mr10">进行中</el-tag>
                        <!--<el-button size="mini" type="danger"-->
                        <!--@click="onEdit(scope.$index)">编辑-->
                        <!--</el-button>-->
                    </div>
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
    </div>
</template>

<script>
    import {courseList, deleteCourse} from '@/api/course'
    import pic from '@/assets/class.png'
    import store from '@/store'

    export default {
        name: "List",
        computed: {
            itemArray() {
                let itemArray = this.list;
                let value = this.searchVal;
                if (this.searchVal) {
                    itemArray = this.list.filter(function (item) {
                        return item.courseName.search(value) !== -1;
                    })
                }
                return itemArray;
            },
            tableData() {
                let offset = (this.page - 1) * 10;
                let end = Math.min(this.itemArray.length, offset + 10);
                console.info("change " + offset + " " + end + " " + this.page);
                if (offset === end) {
                    console.info("bug");
                }
                return this.itemArray.slice(offset, end);
            },
        },
        data() {
            return {
                isTeacher: store.getters.isTeacher,
                search: "",
                searchVal: "",
                pic: pic,
                loading: true,
                list: [],
                count: 0,
                page: 1,
                courseIndex: 0,
                form: {
                    keyword: "",
                    page: 1,
                    limit: 10,
                },
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            f(x, y) {
                this.$router.push({
                    path: '/course/' + y.courseId,
                })
                // let routeData = this.$router.resolve({
                //     name: 'course',
                //     params: {
                //         cid: y.courseId,
                //     }
                // });
                // window.open(routeData.href, '_blank');
            }, onEdit(x) {
                this.courseIndex = x;
                this.openMsgBox();
            }, handleDelete() {
                this.loading = true;
                deleteCourse(this.courseIndex).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error("提交失败");
                    }
                    this.list.splice(this.courseIndex, 1);
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, openMsgBox() {
                this.$confirm('确定删除本门课程?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.info("confirm");
                    this.handleDelete();
                }).catch(error => {
                    console.info(error);
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            fetchData() {
                this.loading = true;
                courseList(this.form.keyword, this.form.page, this.form.limit).then(response => {
                    this.list = response.data;
                    this.count = response.count;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, handleSearch() {
                this.form.page = 1;
                this.fetchData();
                // this.searchVal = this.search;
            }
        }

    }
</script>

<style scoped>
    @import "../../assets/course.css";
</style>
