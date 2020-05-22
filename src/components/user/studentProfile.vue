<template>
    <el-form ref="stuForm" :model="stu"
             v-loading="loading" label-width="80px" style="width: 500px">
        <el-form-item label="学号">
            <el-input v-model="stu.userId" :disabled="true"/>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="stu.username" :disabled="true"/>
        </el-form-item>
        <el-form-item label="学院">
            <el-input v-model="stu.department" :disabled="true"/>
        </el-form-item>
        <el-form-item label="专业">
            <el-input v-model="stu.major" :disabled="true"/>
        </el-form-item>
        <el-form-item label="班级">
            <el-input v-model="stu.specialty" :disabled="true"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
            <el-input v-model="stu.telephone"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="stu.email"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button @click="resetForm">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {userInfo, updateStudentInfo} from "@/api/user";

    export default {
        name: "stuProfile",
        data() {
            return {
                loading: false,
                stu: {
                    userId: "",
                    username: "",
                    specialty: "",
                    email: "",
                    telephone: "",
                },
            };
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.loading = true;
                userInfo().then(response => {
                    this.loading = false;
                    this.stu = response.data;
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            onSubmit() {
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (this.stu.email === '' || !reg.test(this.stu.email)) {
                    this.$message.error('请输入正确的邮箱');
                    return;
                } else if (this.stu.telephone === '') {
                    this.$message.error('请输入手机号');
                    return;
                }

                updateStudentInfo(this.teacher.telephone, this.teacher.email).then(response => {
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

<style scoped>
</style>
