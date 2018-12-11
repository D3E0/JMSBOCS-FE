<template>
    <div>
        <el-row>
            <el-col :span="24" class="panel-title">
                已选课程
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column>
                <template slot-scope="scope">
                    <img src="../assets/class.png" height="60px" alt="课程图片">
                    <div class="item">
                        <div class="title">
                            <el-button type="text" style="font-size: 18px" @click="f">
                                {{scope.row.courseName}}
                            </el-button>
                        </div>
                        <div class="time">
                            <span class="ctime">
                                <i class="el-icon-date mr5"></i>{{scope.row.academicYear}} 学年
                            </span>
                            <span class="ctime">
                                <i class="el-icon-time mr5"></i>第 {{scope.row.semester}} 学期
                            </span>
                            <span class="ctime">
                                <i class="el-icon-service mr5"></i>{{scope.row.teacherName}}
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div style="float: right">
                        <el-tag type="success" class="mr10">进行中</el-tag>
                        <el-button size="mini" type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "SubjectList",
        data() {
            return {
                tableData: [{
                    courseName: 'Java',
                    academicYear: '2016',
                    semester: '2',
                    teacherName: '赵老师'
                }, {
                    courseName: 'C++',
                    academicYear: '2016',
                    semester: '2',
                    teacherName: '赵老师'
                }, {
                    courseName: 'PHP',
                    academicYear: '2016',
                    semester: '2',
                    teacherName: '赵老师'
                }, {
                    courseName: 'Python',
                    academicYear: '2016',
                    semester: '2',
                    teacherName: '赵老师'
                }]
            }
        }, methods: {
            f() {
                console.info("sdsad");
            }
        }

    }
</script>

<style scoped>

    @import "../assets/course.css";


</style>