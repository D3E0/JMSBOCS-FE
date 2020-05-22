<template>
    <el-form ref="pwdForm" :model="user" label-width="90px">
        <el-form-item label="学号">
            <el-input v-model="user.id"/>
        </el-form-item>

        <el-form-item label="姓名">
            <el-input v-model="user.name"/>
        </el-form-item>

        <el-form-item label="学院">
            <el-input v-model="user.department"/>
        </el-form-item>

        <el-form-item label="专业">
            <el-input v-model="user.major"/>
        </el-form-item>

        <el-form-item label="班级" v-show="user.type === '0'">
            <el-input v-model="user.specialty"/>
        </el-form-item>

        <el-form-item label="角色">
            <el-select v-model="user.type" placeholder="角色">
                <el-option label="学生" value="0"/>
                <el-option label="教师" value="1"/>
                <el-option label="管理员" value="2"/>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    import {updateUser} from '@/api/user'

    export default {
        name: "editUser",
        props: ['user'],
        data() {
            return {
                loading: false,
            }
        },
        created() {
        },
        methods: {
            fetchData() {
            },
            onSubmit() {
                this.loading = true;
                console.info(this.user);
                updateUser(this.user.id, this.user.name, this.user.role, this.user.department, this.user.major, this.user.specialty).then(response => {
                    if (response.message === 'success') {
                        this.$emit('do-close');
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error("修改失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
        }
    };
</script>

<style>

</style>
