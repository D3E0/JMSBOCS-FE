<template>
    <el-form ref="pwdForm" :model="pwd" status-icon :rules="pwdRules"
             label-width="90px" style="width: 500px">
        <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="pwd.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwd.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPwd">
            <el-input v-model="pwd.checkPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('pwdForm')">立即修改</el-button>
            <el-button @click="resetForm('pwdForm')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {updatePassword} from "@/api/user";

    export default {
        name: "password",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pwd.newPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                pwd: {
                    oldPwd: "",
                    newPwd: "",
                    checkPwd: "",
                },
                pwdRules: {
                    oldPwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    newPwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPwd: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updatePassword(this.pwd.oldPwd, this.pwd.newPwd, this.pwd.checkPwd).then(response => {
                            if (response.message === 'success') {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error("修改失败");
                            }
                            this.resetForm('pwdForm');
                        }).catch(error => {
                            this.$message.error(error);
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
