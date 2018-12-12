<template>
    <div>
        <el-table :data="tableData" style="width: 100%" :show-header="true">
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-button type="primary" size="medium" plain
                               @click="onUpload" v-if="isTch">
                        上传资源
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <img src="../assets/file.png" height="60px" alt="课程图片">
                    <div class="item">
                        <div class="title">
                            <el-button type="text" style="font-size: 18px">
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
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div style="float: right">
                        <el-button size="small" type="primary"
                                   @click="handleDownload(scope.$index, scope.row)">下载
                        </el-button>
                        <el-button size="small" type="danger" v-if="isTch"
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
        name: "CourseResource",
        props: ['courseId'],
        data() {
            return {
                isTch: this.$root.isTch,
                tableData: [{
                    courseName: '4原.jpg',
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
            handleDownload() {

            }, handleDelete() {

            }, onUpload() {

            }
        }
    }
</script>

<style scoped>
    @import "../assets/course.css";
</style>