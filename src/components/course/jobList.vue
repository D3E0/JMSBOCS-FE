<template>
    <div v-loading="loading">
        <el-button type="success" style="float: right" @click="dialogFormVisible = true" v-if="myCourse">发布作业
        </el-button>
        <div style="margin-left: 20px;">
            <el-input v-model="search" placeholder="请输入作业标题" prefix-icon="el-icon-search"
                      style="width: 300px"></el-input>
            <el-button style="margin-left: 20px" type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <el-table :data="tableData" :show-header="false" style="width: 100%">
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
            <el-pagination layout="total, prev, pager, next" :current-page.sync="page"
                           :total="itemArray.length" :page-size="5">
            </el-pagination>
        </div>

        <el-dialog title="作业发布" :visible.sync="dialogFormVisible">
            <edit v-bind:job="{courseId: this.cid}" v-on:do-close="dialogFormVisible=false"/>
        </el-dialog>
    </div>
</template>

<script>
    import {courseJobList} from '@/api/job'
    import edit from '@/components/job/edit.vue'
    import store from '@/store'
    import {courseInfo,} from "@/api/course";

    export default {
        name: "List", components: {
            edit
        },
        computed: {
            itemArray() {
                let itemArray = this.list;
                let value = this.searchVal;
                if (this.searchVal) {
                    itemArray = this.list.filter(function (item) {
                        return item.jobTitle.search(value) !== -1;
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
                cid: Number(this.$route.params.cid),
                dialogFormVisible: false,
                loading: false,
                list: [],
                page: 1,
                myCourse: false,
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.loading = true;
                courseJobList(this.cid).then(response => {
                    console.info(response);
                    this.list = response.data;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });

                courseInfo(this.$route.params.cid).then(response => {
                    this.myCourse = parseInt(response.data.teacherId) === parseInt(store.getters.id);
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            onDetail(index, obj) {
                this.$router.push(`/job/${obj.jobId}`);
            }, handleSearch() {
                this.searchVal = this.search;
            }
        },
    }
</script>

<style scoped>
    @import "../../assets/course.css";

</style>
