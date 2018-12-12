<template>
    <div>
        <el-table :data="tableData"
                  :show-header="true"
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div>
                        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                    </div>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-button type="primary" size="medium" plain @click="onUpload">
                        发布公告
                    </el-button>
                </template>
                <template slot-scope="scope">
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
                    <el-button size="mini" type="danger" style="float: right"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Announcement",
        props:['courseId'],
        data() {
            return {
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
            handleDelete(index, row) {
                console.info(row, index);
            }, onUpload() {

            }
        }
    }
</script>

<style scoped>
    @import "../assets/course.css";

    .down {
        float: right;
        margin-top: 20px;
    }
</style>