<template>

    <el-form ref="pwdForm" :model="form"
             label-width="90px" >

        <el-form-item label="学院">
            <el-select v-model="form.department" filterable allow-create
                       placeholder="请选择学院" @change="departmentChange">
                <el-option v-for="item in department" :key="item.id" :label="item.categoryName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>


        <el-form-item label="专业" v-show="showMajor">
            <el-select v-model="form.major" filterable allow-create
                       placeholder="请选择专业" @change="majorChange">
                <el-option v-for="item in major" :key="item.id" :label="item.categoryName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="班级" v-show="showSpecialty">
            <el-input v-model="form.specialty"/>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    import {category, addCategory} from '@/api/user'

    export default {
        name: "addCategory",

        data() {
            return {
                loading: false,
                department: [],
                major: [],
                form: {
                    department: "",
                    major: "",
                    specialty: ""

                },
                showMajor: false,
                showSpecialty: false,
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                category(0).then(response => {
                    this.department = response.data;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            departmentChange(data) {
                this.form.major = "";
                this.major = [];
                this.showMajor = false;
                const x = this.department.find(function (elem) {
                    return elem.id === data;
                });
                if (!x) {
                    return;
                }
                category(data).then(response => {
                    this.major = response.data;
                    this.showMajor = true;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            majorChange(data) {
                this.showSpecialty = false;
                const x = this.major.find(function (elem) {
                    return elem.id === data;
                });
                if (!x) {
                    return;
                }
                this.showSpecialty = true;
            },
            onSubmit() {
                this.loading = true;
                addCategory(this.form.department, this.form.major, this.form.specialty).then(response => {
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
            },
        }
    };
</script>

<style>

</style>
