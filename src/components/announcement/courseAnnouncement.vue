<template>
    <div v-loading="loading">
        <el-table :data="tableData"
                  :show-header="true"
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div>{{props.row.announcementContent}}</div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-button type="primary" size="medium" plain @click="onSubmit" v-if="myCourse">
                        发布公告
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <div class="item">
                        <div class="title">
                            <el-button type="text" style="font-size: 18px">{{scope.row.announcementTitle}}</el-button>
                        </div>
                        <div class="time">
                            <span class="ctime"><i class="el-icon-time mr5"/>
                                  {{new Date(scope.row.announcementTime).toLocaleString('chinese', {hour12: false})}}
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="myCourse">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" style="float: right"
                               @click="onDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination layout="total, prev, pager, next" :current-page.sync="page"
                           :total="list.length" :page-size="5">
            </el-pagination>
        </div>

        <el-dialog title="发布新公告" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="公告标题">
                    <el-input v-model="form.title"/>
                </el-form-item>
                <el-form-item label="公告内容">
                    <el-input v-model="form.content" type="textarea" :rows="6"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onPublish">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {courceAnnouncement, deleteCourceAnnouncement, addCourceAnnouncement} from '@/api/announcement'
    import {courseInfo,} from "@/api/course";
    import store from "@/store"

    export default {
        name: "CourseAnnouncement",
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
                dialogFormVisible: false,
                loading: false,
                list: [],
                cid: this.$route.params.cid,
                selectedId: '',
                selectedIndex: '',
                page: 1,
                form: {
                    title: '',
                    content: '',
                },
                myCourse: false,
            }
        }, created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.loading = true;
                courceAnnouncement(this.cid).then(response => {
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
            }, handleDelete() {
                this.loading = true;
                deleteCourceAnnouncement(this.selectedId).then(response => {
                    if (response.data.message === 'success') {
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
                this.selectedId = row.announcementId;
                this.selectedIndex = index;
                this.openMsgBox();
            }, onSubmit() {
                this.dialogFormVisible = true;
            }, openMsgBox() {
                this.$confirm('确定删除该公告?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete();
                }).catch((error) => {
                    console.info(error);
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }, onPublish() {
                this.dialogFormVisible = false;
                addCourceAnnouncement(this.cid, this.form.title, this.form.content).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '发布成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error("发布失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                    this.fetchData();
                });
            }
        }
    }
</script>

<style scoped>

</style>
