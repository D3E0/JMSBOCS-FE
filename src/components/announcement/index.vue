<template>
    <div v-loading="loading">
        <recommend/>
        <span class="headTitle">最近公告</span>
        <div style="margin-left: 25px; margin-top: 10px">
            <el-input v-model="search" placeholder="请输入公告标题" prefix-icon="el-icon-search"
                      style="width: 300px"></el-input>
            <el-button style="margin-left: 20px" type="primary" @click="handleSearch">搜索</el-button>
        </div>
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
                            <span class="ctime"><i class="el-icon-time mr5"/>
                                  {{new Date(scope.row.announcementTime).toLocaleString('chinese', {hour12: false})}}
                            </span>
                            <span class="ctime"><i class="el-icon-document mr5"/>
                                {{scope.row.courseName}}
                            </span>
                            <span class="ctime"><i class="el-icon-service mr5"/>
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
                           :total="itemArray.length" :page-size="5">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {announcementList} from '@/api/announcement'
    import Recommend from "@/components/home/recommend.vue";

    export default {
        name: "Home",
        components: {Recommend},
        computed: {
            itemArray() {
                let itemArray = this.list;
                let value = this.searchVal;
                if (this.searchVal) {
                    itemArray = this.list.filter(function (item) {
                        return item.announcementTitle.search(value) !== -1;
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
                loading: false,
                list: [],
                page: 1,
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.loading = true;
                announcementList().then(response => {
                    console.info(response);
                    this.list = response.data;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            onDetail(index, obj) {
                this.$router.push(`/course/${obj.courseId}/announcement`);
            }, handleSearch() {
                this.searchVal = this.search;
            }
        }
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
