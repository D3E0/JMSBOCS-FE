<template>
    <el-container v-loading="loading">
        <el-main style="padding: 0">
            <iframe :src="previewLink" id="frame-web" width="100%" v-show="previewLink"
                    height="100%" seamless frameborder="0" scrolling="no"></iframe>
        </el-main>
        <el-aside style="margin-left: 20px">
            <p class="word_info">课程：{{job.courseName}}</p>
            <p class="word_info">作业：{{job.jobTitle}}</p>

            <p class="word_info">学生：{{item.userName}}</p>
            <p class="word_info">学号：
                <el-input v-model="item.userId" style="width: 150px;margin-right: 20px"/>
                <el-link @click="handleSearch">搜索</el-link>
            </p>

            <div style="display: inline">
                <span class="word_info">成绩：</span>
                <el-input v-model="item.score" style="width: 150px;margin-right: 20px"/>
                <el-button type="success" @click="handleSubmit">
                    提交
                </el-button>
            </div>
            <div style="margin-top: 30px; text-align:center">
                <el-button type="primary" icon="el-icon-arrow-left" @click="handlePrev">
                    上一个
                </el-button>
                <el-button type="primary" @click="handleNext">
                    下一个<i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
            </div>
        </el-aside>
    </el-container>
</template>

<script>
    import {jobSubmitItemInfo, updateJobItem, fetchJobItem, jobInfo, jobItemInfo} from '@/api/job'
    import {previewLink} from '@/api/file'

    export default {
        name: "Preview",
        data() {
            return {
                id: this.$route.params.id,
                jobId: this.$route.params.jobId,
                previewLink: "http://one.test/f/4ca4bda6cebe41969430/",
                loading: true,
                item: {
                    filename: "",
                    id: "",
                    jobId: "",
                    lastSubmitTime: "",
                    path: "",
                    status: false,
                    userId: "",
                    userName: "",
                    score: "",
                },
                job: {
                    courseName: "",
                    jobTitle: "",
                }
            }
        },
        created() {
            this.fetchData();
        }, mounted() {
            var iframe = document.getElementById("frame-web");
            var height = document.documentElement.clientHeight - 100;
            iframe.height = height;
        },
        methods: {
            update() {
                if (this.item.path && this.item.filename) {
                    previewLink(this.item.path, this.item.filename).then(response => {
                        if (response.message === 'success') {
                            this.previewLink = response.data;
                        }
                    }).catch(error => {
                        this.$message.error(error);
                    })
                }
            },
            f(x, y) {
                this.$router.push({
                    path: '/course/' + y.courseId,
                })
            },
            fetchData() {
                this.loading = true;
                jobSubmitItemInfo(this.id).then(response => {
                    this.item = response.data;
                    this.update();

                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });

                jobInfo(this.jobId).then(response => {
                    this.job = response.data;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, handleNext() {
                fetchJobItem(this.item.id, this.jobId, 1).then(response => {
                    if (response.message === 'success') {
                        this.item = response.data;
                        this.update();

                    } else {
                        this.$message.error("没有了");
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            }, handlePrev() {
                fetchJobItem(this.item.id, this.jobId, 0).then(response => {
                    if (response.message === 'success') {
                        this.item = response.data;
                        this.update();
                    } else {
                        this.$message.error("没有了");
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            }, handleSubmit() {
                updateJobItem(this.item.id, this.item.score).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '批阅成功',
                            type: 'success'
                        });
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            }, handleSearch() {
                jobItemInfo(this.jobId, this.item.userId).then(response => {
                    if (response.message === 'success') {
                        this.item = response.data;
                        this.update();
                    } else {
                        this.$message.error("没有了");
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/course.css";

    .word_info {
        font-size: 18px;
        line-height: 40px;
    }
</style>
