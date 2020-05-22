<template>
    <el-form :model="form">
        <el-form-item label="作业标题">
            <el-input v-model="form.jobTitle"/>
        </el-form-item>
        <el-form-item label="时间">
            <el-date-picker v-model="form.time"
                            value-format="timestamp"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="所属课程">
            <el-select v-model="form.courseId" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value"
                           :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="作业内容">
            <el-input v-model="form.jobContent" type="textarea" rows="5"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
<!--            <el-button type="primary" @click="$emit('do-close')">关闭</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>

    import {courseList} from "@/api/course"
    import {updateJob} from "@/api/job"

    export default {
        name: "edit",
        props: ['job'],
        data() {
            return {
                loading: false,
                form: {
                    jobTitle: this.job.jobTitle,
                    jobContent: this.job.jobContent,
                    time: [new Date(this.job.jobBeginTime).getTime(), new Date(this.job.jobEndTime).getTime()],
                    courseId: this.job.courseId,
                    jobId: this.job.jobId,
                },
                options: []
            }
        }, created() {
            console.info(this.job);
            console.info(this.form);
            this.fetchData();
        },
        methods: {
            fetchData() {
                courseList().then(response => {
                    this.options = response.data.map((x) => {
                        return {value: x.courseId, label: x.courseName}
                    });
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            onSubmit() {
                this.loading = true;
                updateJob(this.form.jobTitle, this.form.jobContent, this.form.time[0], this.form.time[1], this.form.courseId, this.form.jobId).then(response => {
                    if (response.message === 'success') {
                        this.$emit('do-close');
                        this.$message({
                            message: '发布成功',
                            type: 'success'
                        });
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

</style>
