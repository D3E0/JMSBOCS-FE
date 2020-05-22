<template>
    <div>
        <el-row style="height: 70px">
            <el-col :span="10">
                <span class="formLabel">课程</span>
                <el-select v-model="subject.id" placeholder="请先选择课程" size="small"
                           @change="fetchStudentData">
                    <el-option v-for="item in options" :key="item.id"
                               :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-upload action="" :on-change="handleChange"
                           ref="fileUpload"
                           :auto-upload="false" :limit="1"
                           :on-exceed="handleExceed"
                           :disabled="subject.id === ''"
                           accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                    <el-button size="small" type="primary" :disabled="subject.id === ''">
                        批量导入学生
                    </el-button>
                </el-upload>
            </el-col>
        </el-row>
        <div style="margin-left: 60px">
            <el-button size="small" @click="onMultiDelete"
                       :disabled="multipleSelection.length === 0">
                删除选中学生
            </el-button>
            <el-button size="small" @click="clearSelection"
                       :disabled="multipleSelection.length === 0">
                取消选择
            </el-button>
            <el-button size="small" type="info" @click="onReset">重 置</el-button>
        </div>

        <el-table ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  v-loading="loading"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column prop="id" label="学号"/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="major" label="专业班级"/>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger"
                               @click="onSingleDelete(scope.$index)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination ref="pagination"
                           layout="total, prev, pager, next"
                           :current-page.sync="page"
                           :total.sync="list.length">
            </el-pagination>
        </div>

        <el-dialog title="要导入的学生名单" :visible.sync="dialogTableVisible">
            <el-table :data="excelTableData">
                <el-table-column property="id" label="学号"/>
                <el-table-column property="name" label="姓名"/>
                <el-table-column property="major" label="专业班级"/>
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
    </div>
</template>

<script>
    import XLSX from 'xlsx';
    import {addCourseStudent, courseList, courseStudent, deleteCourseStudent} from "@/api/course";
    import store from '@/store'

    export default {
        name: "Manage",
        computed: {
            tableData() {
                let offset = (this.page - 1) * 10;
                let end = Math.min(this.list.length, offset + 10);
                console.info("change " + offset + " " + end + " " + this.page);
                if (offset === end) {
                    console.info("bug");
                }
                return this.list.slice(offset, end);
            },
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
                multipleSelection: [],
                subject: {id: '', name: ''},
                page: 1,
                excelPage: 1,
                list: [],
                rawList: [],
                rawCount: '',
                excelData: [],
                options: [],
            }
        },
        methods: {
            fetchData() {
                this.fetchCourseData();
            }, fetchStudentData() {
                if (this.subject.id <= 0) {
                    return;
                }
                this.loading = true;
                courseStudent(this.subject.id).then(response => {
                    this.loading = false;
                    this.rawCount = response.count;
                    this.rawList = this.list = response.data.map((x) => {
                        return {id: x.loginName, name: x.name, major: x.specialty}
                    });
                }).catch(error => {
                    this.$message.error(error);
                });
            }, fetchCourseData() {
                this.loading = true;
                courseList().then(response => {
                    this.loading = false;
                    this.options = response.data.map((x) => {
                        return {id: x.courseId, name: x.courseName};
                    });
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            onSingleDelete(x) {
                this.doDelete([this.list[x]]);
                this.list.splice(x, 1);
            }, onMultiDelete() {
                this.doDelete(this.multipleSelection);
                for (let i in this.multipleSelection) {
                    let x = this.multipleSelection[i].id;
                    let index = this.list.findIndex((currentValue) => {
                        return currentValue.id === x;
                    });
                    this.list.splice(index, 1);
                }
            }, handleSelectionChange(val) {
                this.multipleSelection = val;
            }, clearSelection() {
                this.$refs.multipleTable.clearSelection();
            }, handleExceed() {
                this.$message.warning('最多选择 1 个文件');
            }, handleChange(file) {
                this._file(file.raw);
            }, onConfirm() {
                this.$confirm('确定要导入学生名单?', '提示', {
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
            doDelete(selected) {
                this.loading = true;
                let studentList = selected.map(x => {
                    return x.id
                });
                console.info(studentList);
                deleteCourseStudent(this.subject.id, studentList).then(response => {
                    response = response.data;
                    if (response.message === 'success') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error("删除失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                    this.onReset();
                });
            },
            doAdd() {
                this.loading = true;
                let x = {
                    courseId: this.subject.id,
                    studentList: [],
                };
                x.courseId = this.subject.id;
                x.studentList = this.excelData.map(x => {
                    return x.id
                });
                console.info(x);
                addCourseStudent(x.courseId, x.studentList).then(response => {
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
                console.info("reset");
                this.fetchStudentData();
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
                        return {id: x[0], name: x[1], major: x[2]};
                    });
                    this.dialogTableVisible = true;
                };
                reader.readAsBinaryString(file);
            }
        }
    }
</script>

<style scoped>
    .formLabel {
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
