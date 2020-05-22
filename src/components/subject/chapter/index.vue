<template>
    <div class="custom" v-loading="loading">
        <el-row style="height: 70px">
            <el-col :span="10">
                <span class="formLabel">课程</span>
                <el-select v-model="courseId" placeholder="请先选择课程" size="small"
                           @change="fetchData" style="margin-left: 20px">
                    <el-option v-for="item in options" :key="item.id"
                               :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" size="small" style="margin-bottom: 20px" @click="appendChapter">添加章
                </el-button>
            </el-col>
        </el-row>

        <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false"
                 :props="{label: `title`}" :indent="20">
            <div slot-scope="{ node, data }" style="width: 100%">
                <i class="el-icon-document" v-if="data.level === 3 && data.type === 0"></i>
                <i class="el-icon-film" v-else-if="data.level === 3 && data.type === 3"></i>
                <span> {{ node.label }}</span>
                <div style="display:inline; float:right;">
                    <el-button plain size="mini" @click="() => appendSubChapter(data)" v-if="node.level === 1">添加节
                    </el-button>
                    <el-button plain size="mini" @click="() => appendLesson(data)" v-if="node.level === 2">添加课时
                    </el-button>
                    <el-button plain size="mini" @click="() => edit(data)">编辑</el-button>
                    <el-popconfirm title="确定删除吗？" @onConfirm="remove(node, data)" style="margin-left: 10px">
                        <el-button type="danger" plain size="mini" slot="reference"
                                   :disabled="data.children && data.children.length > 0">
                            删除
                        </el-button>
                    </el-popconfirm>
                </div>
            </div>
        </el-tree>

        <el-dialog :title="this.dialogTitle" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
            <edit v-if="dialogType === 1"
                  v-on:do-close="handleClose"
                  v-bind:chapterInput="chapterInput"/>
            <edit-lesson v-if="dialogType === 2"
                         v-on:do-close="handleClose"
                         v-bind:lessonInput="chapterInput"/>
        </el-dialog>

    </div>

</template>

<script>
    import {chapters} from '@/api/chapter'
    import store from '@/store'
    import {deleteChapter} from "@/api/chapter";
    import edit from './edit.vue'
    import EditLesson from "./lesson/index";
    import {courseList} from "@/api/course";

    export default {
        name: "Chapter",
        components: {
            EditLesson,
            edit
        },
        data() {
            return {
                dialogFormVisible: false,
                loading: false,
                data: [],
                options: [],
                rawData: "",
                id: store.getters.id,
                dialogTitle: "",
                courseId: "",
                dialogType: 0,
                chapterInput: {
                    title: "",
                    parentId: 0,
                    level: 0,
                    order: 0,
                    parent: {},
                    id: 0,
                    courseId: 0,
                }
            };
        }, created() {
            this.fetchCourseData();
        },
        methods: {
            fetchCourseData() {
                courseList().then(response => {
                    this.options = response.data.map((x) => {
                        return {id: x.courseId, name: x.courseName};
                    });
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            fetchData() {
                this.loading = true;
                let list = [];
                let chapter = {}, subChapter = {};
                chapters(this.courseId).then(response => {
                    response.data.forEach(x => {
                        if (x.level === 1) {
                            list.push({...x, children: []});
                        } else if (x.level === 2) {
                            chapter = list.find(e => {
                                return e.id === x.parentId;
                            });
                            chapter.children.push({...x, children: []});
                        } else if (x.level === 3) {
                            chapter = list.find(e => {
                                return e.id === x.rootId;
                            });
                            subChapter = chapter.children.find(e => {
                                return e.id === x.parentId;
                            });
                            subChapter.children.push(x);
                        }
                    });
                    this.data = list;
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            openDialog() {
                if (this.chapterInput.level === 1 || this.chapterInput.level === 2) {
                    this.dialogTitle = this.chapterInput.id ? "编辑" : "添加";
                    this.dialogTitle += this.chapterInput.level === 2 ? '节' : '章';
                    this.dialogType = 1;
                } else if (this.chapterInput.level === 3) {
                    this.dialogTitle = (this.chapterInput.id ? "编辑" : "添加") + '课时';
                    this.dialogType = 2;
                } else {
                    return;
                }
                this.dialogFormVisible = true;
            },
            edit(data) {
                this.chapterInput = {
                    id: data.id,
                    level: data.level,
                    title: data.title,
                    courseId: data.courseId,
                    type: data.type,
                    filename: data.filename,
                    filePath: data.filePath,
                    content: data.content,
                };
                console.info(this.chapterInput);
                this.openDialog();
            }, appendSubChapter(data) {
                let len = data.children.length;
                this.chapterInput = {
                    parentId: data.id,
                    level: 2,
                    parent: data.children[len - 1],
                    courseId: data.courseId,
                };
                this.openDialog();
            }, appendChapter() {
                let len = this.data.length;
                this.chapterInput = {
                    parentId: 0,
                    level: 1,
                    parent: this.data[len - 1],
                    courseId: this.courseId,
                };
                this.openDialog();
            }, appendLesson(data) {
                let len = data.children.length;
                this.chapterInput = {
                    parentId: data.id,
                    level: 3,
                    parent: data.children[len - 1],
                    courseId: data.courseId,
                    type: 0,
                };
                this.openDialog();
            },
            remove(node, data) {
                this.loading = true;
                deleteChapter(data.id).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index = children.findIndex(d => d.id === data.id);
                        children.splice(index, 1);
                    } else {
                        this.$message.error("删除失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }, handleClose() {
                this.dialogFormVisible = false;
                this.fetchData();
            }

        }
    }
</script>

<style>
    .custom .el-tree-node__content {
        padding-bottom: 10px;
        padding-top: 10px;
    }

</style>
