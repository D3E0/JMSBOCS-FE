<template>
    <div>
        <el-row>
            <el-col :span="24" class="panel-title">课程广场</el-col>
        </el-row>

        <el-form ref="form" :model="form" :inline="true">
            <el-form-item label="课程名">
                <el-input v-model="form.keyword"/>
            </el-form-item>
            <el-form-item label="专业">
                <el-cascader :props="props" v-model="form.major" :clearable="true"></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" style="width: 100%"
                  :show-header="false" v-loading="loading">
            <el-table-column min-width="180px">
                <template slot-scope="scope">
                    <!--                    <el-image style="width: 100px; height: 100px" :src="scope.row.logo" fit="fill">-->
                    <el-image style="width: 100px; height: 100px" :src="scope.row.logo" fit="fill">
                        <div slot="error" class="image-slot">
                            <el-image style="width: 100px; height: 100px" :src="pic" fit="fill"/>
                        </div>
                    </el-image>
                    <div class="item">
                        <div class="title">
                            <el-button type="text" style="font-size: 18px" @click="f(scope.$index,scope.row)">
                                {{scope.row.courseName}}
                            </el-button>
                        </div>
                        <div class="time">
                            <span class="ctime">
                                <i class="el-icon-school mr5"/>{{scope.row.department}}&nbsp;&nbsp;-&nbsp;&nbsp;{{scope.row.major}}
                            </span>
                            <span class="ctime">
                                <i class="el-icon-service mr5"/>{{scope.row.teacherName}}
                            </span>
                        </div>
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
    import {allCoursee,} from '@/api/course'
    import {category} from '@/api/user'
    import pic from '@/assets/class.png'

    export default {
        name: "Home",
        computed: {},
        data() {
            return {
                pic: pic,
                loading: true,
                list: [],
                count: 0,
                form: {
                    department: "",
                    major: "",
                    keyword: "",
                    page: 1,
                    limit: 10,
                },
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        console.info(node);
                        let id = node.data ? node.data.id : 0;
                        category(id).then(response => {
                            let nodes = response.data.map(x => {
                                return {
                                    label: x.categoryName,
                                    value: x.categoryName,
                                    id: x.id,
                                    leaf: x.floor === 2,
                                }
                            });
                            resolve(nodes);
                        }).catch(error => {
                            this.$message.error(error);
                        })
                    }
                }
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
            },
            fetchData() {
                this.loading = true;
                let department = "", major = "";
                if (this.form.major.length === 2) {
                    department = this.form.major[0];
                    major = this.form.major[1];
                }
                allCoursee(department, major, this.form.keyword, this.form.page, this.form.limit).then(response => {
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
            },
            handleClick(obj) {
                // unfavor(obj.courseId).then(response => {
                //     console.info(response);
                //     if (response.message === 'success') {
                //         this.$message({
                //             message: '操作成功',
                //             type: 'success'
                //         });
                //         this.fetchData();
                //     }
                // }).catch(error => {
                //     this.$message.error(error);
                // });
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/course.css";
</style>
