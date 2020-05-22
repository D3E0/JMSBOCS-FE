<template>
    <div>
        <el-row>
            <el-col :span="24" class="panel-title">收藏课程</el-col>
        </el-row>
        <div>
            <el-input v-model="search" placeholder="请输入课程标题" prefix-icon="el-icon-search"
                      style="width: 300px"></el-input>
            <el-button style="margin-left: 20px" type="primary" @click="handleSearch">搜索</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%"
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
                        <el-button type="danger" size="mini" @click="handleClick(scope.row)">取消收藏</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination layout="total, prev, pager, next"
                           :current-page.sync="page"
                           :total.sync="itemArray.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {favorList, unfavor} from '@/api/course'
    import pic from '@/assets/class.png'

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
            }, isTch() {
                return this.$root.isTch;
            }
        },
        data() {
            return {
                search: "",
                searchVal: "",
                pic: pic,
                loading: true,
                list: [],
                count: '',
                page: 1,
                courseIndex: 0,
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
                favorList().then(response => {
                    this.list = response.data;
                    this.count = response.count;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, handleSearch() {
                this.searchVal = this.search;
            },
            handleClick(obj) {
                unfavor(obj.courseId).then(response => {
                    console.info(response);
                    if (response.message === 'success') {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.fetchData();
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/course.css";
</style>
