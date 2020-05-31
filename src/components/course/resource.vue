<template>
    <div>
        <div style="float: right" v-if="myCourse">
            <el-upload ref="upload" :limit="1" action="/api/file/upload/v2"
                       :data="{path: this.savePath}"
                       name="submitFile"
                       :headers="{'X-Token': this.token}"
                       :on-success="handleSuccess"
                       :on-exceed="handleExceed">
                <el-button slot="trigger" size="small" type="success">上传文件</el-button>
            </el-upload>
        </div>

        <div>
            <el-input v-model="search" placeholder="请输入文件标题" prefix-icon="el-icon-search"
                      style="width: 300px"></el-input>
            <el-button style="margin-left: 20px" type="primary" size="small" @click="handleSearch">搜索</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%"
                  v-loading="loading" :show-header="false">
            <el-table-column min-width="200px">
                <template slot-scope="scope">
                    <img :src="pic" height="60px" alt="课程图片">
                    <div class="item">
                        <div class="title" style="overflow: hidden">
                            <el-button type="text" style="font-size: 18px" @click="onClick(scope.row)">
                                {{scope.row.filename}}
                            </el-button>
                        </div>
                        <div class="time">
                    <span class="ctime">
                    <i class="el-icon-date mr5"/>
                    {{new Date(scope.row.uploadTime).toLocaleString('chinese', {hour12: false})}}
                    </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div style="float: right">
                        <el-button size="small" type="primary"
                                   @click="handleDownload(scope.$index, scope.row)">下载
                        </el-button>
                        <el-button size="small" type="danger" v-if="myCourse"
                                   @click="onDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </div>
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
    import {getToken} from "@/utils/auth";
    import {resourceList, addResource, deleteResource} from '@/api/resource'
    import {previewLink, downloadLink} from '@/api/file'
    import store from "@/store"
    import pic from '@/assets/file.png'
    import {courseInfo,} from "@/api/course";

    export default {
        name: "CourseResource",
        computed: {
            tableData() {
                let offset = (this.page - 1) * 5;
                let end = Math.min(this.itemArray.length, offset + 5);
                console.info("change " + offset + " " + end + " " + this.page);
                if (offset === end) {
                    console.info("bug");
                }
                return this.itemArray.slice(offset, end);
            }, savePath: function () {
                return '/' + this.courseId + '/resource';
            }, itemArray() {
                let itemArray = this.list;
                let value = this.searchVal;
                if (this.searchVal) {
                    itemArray = this.list.filter(function (item) {
                        return item.filename.search(value) !== -1;
                    })
                }
                return itemArray;
            },
        },
        data() {
            return {
                loading: false,
                courseId: this.$route.params.cid,
                search: "",
                searchVal: "",
                pic: pic,
                list: [],
                selectedId: 0,
                selectedIndex: 0,
                page: 1,
                token: getToken(),
                myCourse: false,
            }
        }, created() {
            this.fetchData();
        }, methods: {
            fetchData() {
                this.loading = true;
                resourceList(this.courseId).then(response => {
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
            handleDownload(index, obj) {
                downloadLink(obj.filePath, obj.filename).then(response => {
                    console.info(response.data);
                    let a = document.createElement("a");
                    a.download = obj.filename;
                    a.href = response.data;
                    a.click();
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, handleDelete() {
                this.loading = true;
                deleteResource(this.selectedId).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    this.list.splice(this.selectedIndex, 1);
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, onDelete(index, row) {
                this.selectedId = row.courseResourceId;
                this.selectedIndex = index;
                this.openMsgBox();
            }, openMsgBox() {
                this.$confirm('确定删除该资源?', '提示', {
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
            }, handleExceed() {
                this.$message.warning('最多选择 1 个文件');
            }, handleSuccess(response, file) {
                if (response.message === 'success') {
                    addResource(this.courseId, file.name, this.savePath).then(response => {
                        if (response.message === 'success') {
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            this.fileList = [];
                            this.fetchData();
                        }
                    }).catch(error => {
                        this.$message.error(error);
                    })
                } else {
                    this.$message.error("上传失败");
                }
            }, onClick(obj) {
                previewLink(obj.filePath, obj.filename).then(response => {
                    if (response.message === 'success') {
                        window.open(response.data);
                    } else {
                        this.$message.error("该文件暂不支持预览哦");
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            }, handleSearch() {
                this.searchVal = this.search;
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/course.css";
</style>
