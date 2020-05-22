<template>
    <el-form ref="profileForm" :model="teacher"
             v-loading="loading" label-width="80px" style="width: 500px">
        <el-form-item label="工号">
            <el-input v-model="teacher.userId" :disabled="true"/>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="teacher.username" :disabled="true"/>
        </el-form-item>
        <el-form-item label="办公地址">
            <el-input v-model="teacher.office"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
            <el-input v-model="teacher.telephone"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="teacher.email"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button @click="resetForm">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {userInfo, updateTeacherInfo} from "@/api/user";

    export default {
        name: "teacherProfile",
        data() {
            return {
                loading: false,
                teacher: {
                    userId: "",
                    username: "",
                    email: "",
                    telephone: "",
                    bucket: "",
                    office: '',
                    qiniuId: ''
                },
            };
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.loading = true;
                userInfo().then(response => {
                    this.loading = false;
                    this.teacher = response.data;
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            onSubmit() {
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (this.teacher.email === '' || !reg.test(this.teacher.email)) {
                    this.$message.error('请输入正确的邮箱');
                    return;
                } else if (this.teacher.telephone === '') {
                    this.$message.error('请输入手机号');
                    return;
                } else if (this.teacher.office === '') {
                    this.$message.error('请输入办公地址');
                    return;
                }
                updateTeacherInfo(this.teacher.telephone, this.teacher.email, this.teacher.office).then(response => {
                    this.loading = false;
                    if (response.message === 'success') {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.fetchData();
                    } else {
                        this.$message.error("修改失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            resetForm() {
                this.fetchData();
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .tip {
        color: #b3b3b3;
        font: 12px Extra Extra Small;
        padding-left: 10px;
    }
</style>
