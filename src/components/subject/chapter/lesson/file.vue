<template>
    <div>
        <el-form :model="lessonInput" v-loading="loading" label-width="90px">
            <el-form-item label="课时标题" prop="name">
                <el-input v-model="lessonInput.title" type="text"/>
            </el-form-item>

            <el-form-item label="文件来源" prop="name">
                <el-radio-group v-model="source">
                    <el-radio :label="3">上传文件</el-radio>
                    <el-radio :label="6">从资料库中选择</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="文件" prop="scope" v-if="source === 3">
                <el-upload action="/api/file/upload/v2"
                           :limit="1"
                           :data="{path: this.savePath}"
                           :file-list="fileList"
                           name="submitFile"
                           :headers="{'X-Token': this.token}"
                           :on-success="handleSuccess">
                    <el-button size="small" type="primary">点击上传</el-button>
<!--                    <div slot="tip" class="el-upload__tip">只能上传视频文件</div>-->
                </el-upload>
            </el-form-item>

            <el-form-item label="文件" prop="scope" v-if="source === 6">
                <el-select v-model="resourceIdx" size="small" @change="onSelect">
                    <el-option v-for="(item, index) in options" :key="item.courseResourceId"
                               :label="item.filename" :value="index">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="预览" prop="name">
                <el-button type="text" @click="preview">预览链接</el-button>
            </el-form-item>

            <el-form-item>
                <el-button @click="$emit('do-close')">取消</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import {addChapter} from '@/api/chapter'
    import {previewLink} from '@/api/file'
    import {resourceList} from '@/api/resource'
    import {getToken} from "@/utils/auth";

    const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];

    export default {
        name: "FileType",
        props: ['lessonInput'],
        computed: {
            savePath: function () {
                return '/' + this.lessonInput.courseId + '/data';
            }
        },
        data() {
            return {
                loading: false,
                source: 3,
                options: [],
                resourceIdx: "",
                token: getToken(),
                fileList: []
            };
        }, created() {
            this.fetchData()
        },
        methods: {
            onSelect() {
                this.lessonInput.filename = this.options[this.resourceIdx].filename;
                this.lessonInput.filePath = this.options[this.resourceIdx].filePath;
            },
            onSubmit() {
                console.info(this.lessonInput);
                let order = this.lessonInput.parent ? this.lessonInput.parent.order + 1 : 1;
                let level = 3;
                let type = 3
                let id = this.lessonInput.id;
                let parentId = this.lessonInput.parentId;
                let filePath = this.lessonInput.filePath;
                let filename = this.lessonInput.filename
                addChapter(this.lessonInput.courseId, parentId, this.lessonInput.title, level, order, id, type, filePath, filename).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.$emit('do-close');
                    } else {
                        this.$message.error("操作失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            },
            handleSuccess(response, file, fileList) {
                if (response.message === 'success') {
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    this.lessonInput.filename = file.name;
                    this.lessonInput.filePath = this.savePath;
                } else {
                    this.$message.error("上传失败");
                    this.fileList = [];
                }
            },
            preview() {
                previewLink(this.lessonInput.filePath, this.lessonInput.filename).then(response => {
                    if (response.message === 'success') {
                        window.open(response.data);
                    } else {
                        this.$message.error("操作失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            },
            fetchData() {
                resourceList(this.lessonInput.courseId).then(response => {
                    if (response.message === 'success') {
                        this.options = response.data;
                    } else {
                        this.$message.error("操作失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            }
        }
    }
</script>

<style scoped>

</style>
