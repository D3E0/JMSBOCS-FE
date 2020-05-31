<template>
    <div>
       <span class="headTitle">
            课程{{job.courseName}}的{{job.jobTitle}}
       </span>
        <span style="float: right" v-if="myCourse">
            <el-button type="warning" @click="dialogFormVisible = true">编辑</el-button>
            <el-button type="danger" @click="openMsgBox()">删除</el-button>
        </span>
        <p class="title">作业内容</p>
        <div class="content">
            {{job.jobContent}}
        </div>
        <p class="title">时间</p>
        <div class="content">
            {{job.jobBeginTime}} --- {{job.jobEndTime}}
            <span class="Tag redColor" v-if="job.ended">Ended</span>
            <span class="Tag greenColor" v-else-if="!job.started">Pending</span>
            <span class="Tag greenColor" v-else>UnderWay</span>
        </div>
        <template v-if="job.study">


            <div>
                <p class="title">状态</p>
                <div class="content">
                    <span class="Tag greenColor" v-if="jobItem ">已提交</span>
                    <span class="Tag redColor " v-else>未提交</span>
                    <el-button type="text" style="color: #909399; margin-left: 10px" @click="onPreview" v-if="jobItem">
                        {{jobItem.filename}}
                    </el-button>
                </div>
            </div>
            <div v-if="jobItem">
                <p class="title">成绩</p>
                <div class="content">
                    <span class="Tag brownColor" v-if="!jobItem.score">未批阅</span>
                    <span v-else>{{jobItem.score}}</span>
                </div>
            </div>
            <p class="title">作业提交</p>
            <div class="content">
                <el-upload class="upload-demo" ref="upload"
                           action="/api/file/upload/v2"
                           :data="{path: savePath, customFilename: filename}"
                           :headers="{'X-Token': this.token}"
                           name="submitFile"
                           :on-success="handleSuccess"
                           :before-upload="beforeUpload"
                           :http-request="upload"
                           :auto-upload="true">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">请上传一个作业文件</div>
                </el-upload>
            </div>
        </template>

        <el-dialog title="作业编辑" :visible.sync="dialogFormVisible">
            <edit v-bind:job="job" v-on:do-close="dialogFormVisible=false"/>
        </el-dialog>
    </div>

</template>

<script>
    import {deleteJob, jobInfo, jobItemInfo, submitJob} from '@/api/job'
    import {previewLink, uploadFile} from '@/api/file'
    import edit from './edit.vue'
    import store from '@/store'
    import {getToken} from "@/utils/auth";

    export default {
        name: "detail",
        components: {
            edit
        },
        computed: {
            savePath: function () {
                return '/' + this.job.courseId + '/homework/' + this.jobId;
            }
        },
        data() {
            return {
                jobId: this.$route.params.id,
                userId: store.getters.id,
                username: store.getters.name,
                dialogFormVisible: false,
                loading: false,
                filename: "",
                job: {},
                token: getToken(),
                jobItem: {},
                myCourse: false,
            }
        }, created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.loading = true;
                jobInfo(this.jobId, this.userId).then(response => {
                    console.info(response);
                    this.job = response.data;
                    this.myCourse = parseInt(response.data.teacherId) === parseInt(store.getters.id);
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });

                jobItemInfo(this.jobId).then(response => {
                    console.info(response);
                    this.jobItem = response.data;
                }).catch(error => {
                    this.$message.error(error);
                })
            },
            beforeUpload(file) {
                console.info(file)
                try {
                    let originName = file.name;
                    let fileType = originName.substring(originName.lastIndexOf('.'));
                    this.filename = this.userId + " " + this.username + " " + this.job.jobTitle + fileType;
                    console.info(this.filename);
                    return true;
                } catch (e) {
                    console.info(e);
                }
                this.filename = "";
                return false;
            },
            handleSuccess(response, file) {
                if (response.message === 'success') {
                    submitJob(this.jobId, this.savePath, this.filename).then(response => {
                        if (response.message === 'success') {
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            this.fetchData();
                            this.$refs["upload"].clearFiles();
                        }
                    }).catch(error => {
                        this.$message.error(error);
                    })
                } else {
                    this.$message.error("上传失败");
                }
            },
            handleDelete() {
                this.loading = true;
                deleteJob(this.jobId).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.$router.push("/jobList");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            openMsgBox() {
                this.$confirm('确定删除该作业?', '提示', {
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
            onPreview() {
                previewLink(this.jobItem.path, this.jobItem.filename).then(response => {
                    if (response.message === 'success') {
                        window.open(response.data);
                    } else {
                        this.$message.error("该文件暂不支持预览哦");
                    }
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
            }, upload(params) {
                this.loading = true;
                let copyFile = new File([params.file], this.filename);
                uploadFile(copyFile, this.savePath).then(response => {
                    if (response.data.message === 'success') {
                        this.handleSuccess(response.data, copyFile);
                    } else {
                        this.$message.error("上传失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>
    .headTitle {
        font-size: 24px;
        font-weight: 500;
        margin: 20px 10px;
        line-height: 40px;
        padding: 5px 15px;
        text-align: left;
    }

    .title {
        font-size: 20px;
        font-weight: 400;
        padding: 5px 15px;
        margin: 5px 20px;
        color: #3091f2;
        text-align: left;
    }

    .content {
        padding: 5px 30px;
        margin: 10px 20px;
        text-align: left;
    }

    .greenColor {
        background-color: #19be6b;
    }

    .blueColor {
        background-color: #409EFF;
    }

    .brownColor {
        background-color: #E6A23C;
    }

    .redColor {
        background-color: #ed3f14;
    }

    .Tag {
        display: inline-block;
        height: 22px;
        line-height: 22px;
        margin-left: 10px;
        padding: 0 8px;
        border-radius: 3px;
        font-size: 12px;
        color: #FFFFFF;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
    }
</style>
