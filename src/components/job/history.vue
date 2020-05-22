<template>
    <div v-loading="loading">
        <span class="headTitle">{{job.jobTitle}}</span>
        <div style="margin-top: 10px">
            <el-input v-model="search" placeholder="请输入学生姓名" prefix-icon="el-icon-search"
                      style="width: 300px"></el-input>
            <el-button style="margin-left: 20px" type="primary" size="small" @click="handleSearch">搜索</el-button>

            <el-button type="primary" style="float: right" size="small" @click="onExportAll">导出</el-button>
            <el-button type="success" style="float: right" size="small" @click="onDownloadAll">下载全部</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="userId" label="学号"/>
            <el-table-column prop="userName" label="姓名"/>
            <el-table-column prop="filename" label="文件名"/>
            <el-table-column prop="lastSubmitTime" label="提交时间"/>
            <el-table-column prop="score" label="成绩" width="80px"/>
            <el-table-column label="操作">
                <template slot-scope="scope">

                    <el-button size="mini" plain type="primary" :disabled="!scope.row.lastSubmitTime"
                               @click="onDownload(scope.$index, scope.row)">下载
                    </el-button>

                    <el-button size="mini" plain type="primary" :disabled="!scope.row.lastSubmitTime"
                               @click="onPreview(scope.$index, scope.row)">批阅
                    </el-button>

                    <el-button size="mini" plain type="danger" :disabled="!scope.row.lastSubmitTime"
                               @click="openMsgBox(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-table :data="list" style="display: none" id="out-table">
            <el-table-column prop="userId" label="学号"/>
            <el-table-column prop="userName" label="姓名"/>
            <el-table-column prop="filename" label="文件名"/>
            <el-table-column prop="lastSubmitTime" label="提交时间"/>
            <el-table-column prop="score" label="成绩" width="80px"/>
        </el-table>

        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination layout="total, prev, pager, next" :current-page.sync="page"
                           :total="itemArray.length" :page-size="5">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {jobItemList, jobInfo, deleteJobItem} from '@/api/job'
    import {previewLink, downloadLink, downloadDirLink} from '@/api/file'
    import FileSaver from "file-saver";
    import XLSX from "xlsx";


    export default {
        name: "History",
        computed: {
            tableData() {
                let offset = (this.page - 1) * 5;
                let end = Math.min(this.itemArray.length, offset + 5);
                console.info("change " + offset + " " + end + " " + this.page);
                if (offset === end) {
                    console.info("bug");
                }
                return this.itemArray.slice(offset, end);
            },
            itemArray() {
                let itemArray = this.list;
                let value = this.searchVal;
                if (this.searchVal) {
                    itemArray = this.list.filter(function (item) {
                        return item.userName.search(value) !== -1;
                    })
                }
                return itemArray;
            },
        },
        data() {
            return {
                loading: false,
                list: [],
                search: "",
                searchVal: "",
                page: 1,
                jobId: this.$route.params.id,
                job: {},
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            handleSearch() {
                this.searchVal = this.search;
            },
            fetchData() {
                this.loading = true;
                jobInfo(this.jobId).then(response => {
                    this.job = response.data;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });

                jobItemList(this.jobId).then(response => {
                    this.list = response.data;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, f(filename, url) {
                let a = document.createElement("a");
                a.download = filename;
                a.href = url;
                a.click();
            },
            onDownload(index, obj) {
                downloadLink(obj.path, obj.filename).then(response => {
                    console.info(response);
                    if (response.data) {
                        this.f(obj.filename, response.data);
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            onPreview(index, obj) {
                window.open("#/preview/" + this.jobId + "/" + obj.id);
            },
            handleDelete(index, obj) {
                deleteJobItem(obj.id).then(response => {
                    console.info(response);
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            onDownloadAll() {
                let path = "/" + this.job.courseId + "/homework";
                downloadDirLink(path, this.jobId).then(response => {
                    console.info(response);
                    if (response.data) {
                        this.f(this.job.jobTitle, response.data);
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            onExportAll() {
                //定义导出Excel表格事件
                /* 从表生成工作簿对象 */
                let wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
                /* 获取二进制字符串作为输出 */
                let wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    let filename = this.job.courseName + " " + this.job.jobTitle + ".xlsx";
                    FileSaver.saveAs(
                        new Blob([wbout], {type: "application/octet-stream"}), filename
                    );
                } catch (e) {
                    if (typeof console !== "undefined") console.log(e, wbout);
                }
                return wbout;
            },
            openMsgBox() {
                this.$confirm('确定删除该学生的作业?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.info("confirm");
                    this.handleDelete();
                }).catch((error) => {
                    console.info(error);
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
