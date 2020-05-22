<template>
    <el-form ref="form" :model="form" label-width="90px" style="width: 500px">
        <el-form-item label="账号" prop="ak">
            <el-input v-model="form.userId" type="text"/>
        </el-form-item>
        <el-form-item label="姓名" prop="sk">
            <el-input v-model="form.username" type="text"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {addTeacher} from "@/api/user";

    export default {
        name: "qiniu",
        data() {
            return {
                form: {
                    username: "",
                    userId: "",
                },
            };
        },
        methods: {
            onSubmit() {
                addTeacher(this.form.userId, this.form.username).then(response => {
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
