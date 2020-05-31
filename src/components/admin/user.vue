<template>
    <div>
        <el-upload action="" :on-change="handleChange" style="margin-left: 60px; margin-bottom: 20px"
                   ref="fileUpload"
                   :auto-upload="false" :limit="1"
                   :on-exceed="handleExceed"
                   accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            <el-button size="small" type="primary">
                批量导入用户
            </el-button>
        </el-upload>

        <el-form ref="form" :model="form" :inline="true">
            <el-form-item label="姓名">
                <el-input v-model="form.keyword"/>
            </el-form-item>
            <el-form-item label="专业">
                <el-cascader :props="props" v-model="form.major" :clearable="true"></el-cascader>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="form.type" :clearable="true">
                    <el-option label="学生" value="0"></el-option>
                    <el-option label="教师" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-table ref="multipleTable"
                  :data="rawList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  v-loading="loading">
            <el-table-column prop="id" label="学号"/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="department" label="学院"/>
            <el-table-column prop="major" label="专业"/>
            <el-table-column label="角色">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === '0'">学生</span>
                    <span v-else-if="scope.row.type === '1'">教师</span>
                    <span v-else-if="scope.row.type === '2'">管理员</span>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 1">正常</span>
                    <span v-else>禁用</span>

                    <el-button size="mini" type="danger" @click="updateStatus(scope.row, 0)" style="margin-left: 20px"
                               v-if="scope.row.status === 1">禁用
                    </el-button>
                    <el-button size="mini" type="primary" @click="updateStatus(scope.row, 1) " v-else>启用
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="info" @click="onClick(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination ref="pagination"
                           layout="total, prev, pager, next"
                           :current-page.sync="form.page"
                           @current-change="fetchData"
                           :total.sync="count">
            </el-pagination>
        </div>

        <el-dialog title="要导入的用户名单" :visible.sync="dialogTableVisible">
            <el-table :data="excelTableData">
                <el-table-column property="id" label="学号"/>
                <el-table-column property="name" label="姓名"/>
                <el-table-column label="角色">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type === 0">学生</span>
                        <span v-else-if="scope.row.type === 1">教师</span>
                        <span v-else-if="scope.row.type === 2">管理员</span>
                    </template>
                </el-table-column>
                <el-table-column property="department" label="学院"/>
                <el-table-column property="major" label="专业"/>
                <el-table-column property="specialty" label="班级"/>
            </el-table>
            <div style="margin-top: 10px;margin-left: 13px">
                <el-pagination ref="pagination2"
                               layout="total, prev, pager, next"
                               :current-page.sync="excelPage"
                               :total="excelData.length">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
            <edit v-bind:user="user" v-on:do-close="editDialogFormVisible=false"/>
        </el-dialog>
    </div>
</template>

<script>
    import XLSX from 'xlsx';
    import {users, updateStatus, addUserList} from "@/api/user";
    import store from '@/store'
    import edit from './editUser.vue'
    import {category} from '@/api/user'


    export default {
        name: "user",
        components: {
            edit
        },
        computed: {
            excelTableData() {
                let offset = (this.excelPage - 1) * 8;
                let end = Math.min(this.excelData.length, offset + 8);
                console.info("change " + offset + " " + end + " " + this.excelPage);
                if (offset === end) {
                    console.info("bug");
                }
                return this.excelData.slice(offset, end);
            }
        }, created() {
            this.fetchData()
        },
        data() {
            return {
                id: store.getters.id,
                loading: true,
                dialogTableVisible: false,
                editDialogFormVisible: false,
                multipleSelection: [],
                subject: {id: '', name: ''},
                excelPage: 1,
                list: [],
                rawList: [],
                excelData: [],
                options: [],
                user: {},
                form: {
                    department: "",
                    major: "",
                    keyword: "",
                    page: 1,
                    limit: 10,
                    type: "",
                },
                count: 0,
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        console.info(node);
                        let id = node.data ? node.data.id : 0;
                        category(id).then(response => {
                            let nodes = response.data.map(x => {
                                return {
                                    label: x.categoryName,
                                    value: x.categoryName,
                                    id: x.id,
                                    leaf: x.floor === 2,
                                }
                            });
                            resolve(nodes);
                        }).catch(error => {
                            this.$message.error(error);
                        })
                    }
                }
            }
        },
        methods: {
            fetchData() {
                this.fetchUserData();
            }, fetchUserData() {
                this.loading = true;
                let department = "", major = "";
                if (this.form.major.length === 2) {
                    department = this.form.major[0];
                    major = this.form.major[1];
                }
                users(this.form.keyword, department, major, this.form.type, this.form.page, this.form.limit).then(response => {
                    this.loading = false;
                    this.count = response.count;
                    this.rawList = this.list = response.data.map((x) => {
                        return {
                            id: x.loginName,
                            name: x.name,
                            major: x.major,
                            status: x.status,
                            department: x.department,
                            type: x.type + '',
                            specialty: x.specialty
                        }
                    });
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            onClick(obj) {
                this.user = obj;
                this.editDialogFormVisible = true;
            },
            updateStatus(obj, status) {
                this.loading = true;
                updateStatus(obj.id, status).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        obj.status = status;
                    } else {
                        this.$message.error("修改失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, handleExceed() {
                this.$message.warning('最多选择 1 个文件');
            }, handleChange(file) {
                this._file(file.raw);
            }, onConfirm() {
                this.$confirm('确定要导入用户名单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.info("confirm");
                    this.doAdd();
                }).catch(error => {
                    console.info(error);
                    this.onReset();
                });
            }, onCancel() {
                this.onReset();
            },
            doAdd() {
                console.info(this.excelData);
                this.loading = true;
                addUserList(this.excelData).then(response => {
                    response = response.data;
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
                    this.onReset();
                });
            }, onReset() {
                this.fetchUserData();
                this.excelData = [];
                this.$refs.fileUpload.clearFiles();
                this.$refs.multipleTable.clearSelection();
                this.dialogTableVisible = false;
            },
            _file(file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const bstr = e.target.result;
                    const wb = XLSX.read(bstr, {type: 'binary'});
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data = XLSX.utils.sheet_to_json(ws, {header: 1});
                    this.excelData = data.map(function (x) {
                        return {id: x[0], name: x[1], type: x[2], department: x[3], major: x[4], specialty: x[5]};
                    });
                    console.info(this.excelData);
                    this.dialogTableVisible = true;
                };
                reader.readAsBinaryString(file);
            },
            handleSearch() {
                this.form.page = 1;
                this.fetchData();
            },
        }
    }
</script>

<style scoped>
</style>
