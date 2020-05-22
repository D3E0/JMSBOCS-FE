<template>
    <div>
        <el-form ref="subjectForm" :model="subject" v-loading="loading"
                 label-width="90px" style="width: 500px">
            <el-form-item label="课程名称" prop="name">
                <el-select v-model="courseId" placeholder="选择课程" size="small"
                           @change="fetchCourseData">
                    <el-option v-for="item in options" :key="item.id"
                               :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="课程名称" prop="name">
                <el-input v-model="subject.courseName" type="text"/>
            </el-form-item>

            <el-form-item label="课程描述" prop="description">
                <el-input v-model="subject.courseDescription" type="textarea"/>
            </el-form-item>

            <el-form-item label="可见范围" prop="scope">
                <el-select v-model="subject.scope" placeholder="请选择">
                    <el-option :value="0" label="专业内可见"/>
                    <el-option :value="1" label="学院内可见"/>
                    <el-option :value="2" label="公开"/>
                </el-select>
            </el-form-item>

            <el-form-item label="课程封面" prop="scope">
                <el-upload action="/api/file/upload/image/v2"
                           list-type="picture-card"
                           :limit="1"
                           :file-list="fileList"
                           name="submitFile"
                           :data="{path: '/system'}"
                           :headers="{'X-Token': this.token}"
                           :on-success="handleSuccess"
                           :on-preview="handlePictureCardPreview">
                    <i class="el-icon-plus"/>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="resetForm('subjectForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import {addCourse, courseList, courseInfo} from '@/api/course'
    import store from '@/store'
    import {getToken} from "@/utils/auth";

    export default {
        name: "Create",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                loading: false,
                id: store.getters.id,
                subject: {
                    courseName: '',
                    courseDescription: '',
                    scope: 0,
                    logo: "",
                },
                courseId: '',
                list: {},
                token: getToken(),
                options: [],
                fileList: []
            };
        }, created() {
            this.fetchData()
        },
        methods: {
            onSubmit() {
                if (this.subject.name === '' || this.subject.description === '') {
                    this.$message.error("请先填写课程名称和描述");
                    return;
                }
                this.loading = true;
                let path = "/system";
                let filename = this.subject.logo;
                addCourse(this.subject.courseName, this.subject.courseDescription, this.id, this.subject.scope, filename, path, this.subject.courseId).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error("添加失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, resetForm(formName) {
                this.$refs[formName].resetFields();
                location.reload();
            }, handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList) {
                if (response.message === 'success') {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.subject.logo = response.data;
                } else {
                    this.$message.error("上传失败");
                }
            },
            fetchData() {
                courseList().then(response => {
                    this.loading = false;
                    this.options = response.data.map((x) => {
                        return {id: x.courseId, name: x.courseName};
                    });
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            fetchCourseData() {
                courseInfo(this.courseId).then(response => {
                    this.loading = false;
                    this.subject = response.data;
                    if (response.data.logo) {
                        this.$set(this.fileList, 0, {url: response.data.logo})
                    } else {
                        this.fileList = [];
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>
