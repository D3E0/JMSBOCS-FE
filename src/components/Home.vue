<template>
    <div v-loading="loading">
        <span class="headTitle">最近公告</span>
        <el-table :data="tableData" :show-header="false" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div>{{props.row.announcementContent}}</div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div class="item">
                        <div class="title">
                            <el-button type="text" style="font-size: 18px"
                                       @click="onDetail(scope.$index, scope.row)">
                                {{scope.row.announcementTitle}}
                            </el-button>
                        </div>
                        <div class="time">
                            <span class="ctime"><i class="el-icon-time mr5"></i>
                                  {{new Date(scope.row.announcementTime).toLocaleString('chinese', {hour12: false})}}
                            </span>
                            <span class="ctime"><i class="el-icon-document mr5"></i>
                                {{scope.row.courseName}}
                            </span>
                            <span class="ctime"><i class="el-icon-service mr5"></i>
                                {{scope.row.teacherName}}
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
                           :total="list.length" :page-size="5">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        computed: {
            tableData() {
                let offset = (this.page - 1) * 5;
                let end = Math.min(this.list.length, offset + 5);
                console.info("change " + offset + " " + end + " " + this.page);
                if (offset === end) {
                    console.info("bug");
                }
                return this.list.slice(offset, end);
            },
        },
        data() {
            return {
                loading: false,
                list: [],
                page: 1,
            }
        }, created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.loading = true;
                this.axios.get('/api/announcements', {
                    params: {
                        userId: this.$root.uid
                    }
                }).then(response => {
                    this.list = response.data.data;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, onDetail(index, obj) {
                window.location.href = `/course/${obj.courseId}#/announcement`;
            }
        }
    }
</script>

<style scoped>
    @import "../assets/course.css";

    .headTitle {
        font-size: 21px;
        font-weight: 500;
        margin: 20px 10px;
        line-height: 30px;
        padding: 5px 15px;
        text-align: left;
    }
</style>