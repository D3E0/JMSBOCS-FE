<template>
    <div>
        <el-form :model="lessonInput" v-loading="loading" label-width="90px">
            <el-form-item label="课时标题" prop="name">
                <el-input v-model="lessonInput.title" type="text"/>
            </el-form-item>

            <el-form-item label="内容" prop="name">
                <rich-editor ref="editor" v-model="lessonInput.content">
                </rich-editor>
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
    import {getToken} from "@/utils/auth";
    import RichEditor from "@/components/editor/index";

    export default {
        name: "TextType",
        components: {RichEditor},
        props: ['lessonInput'],
        computed: {
            savePath: function () {
                return '/' + this.lessonInput.courseId + '/data';
            }
        },
        data() {
            return {
                loading: false,
                token: getToken(),
                fileList: []
            };
        }, created() {
        },
        methods: {
            onSubmit() {
                console.info(this.lessonInput);
                console.info(this.lessonInput.content);
                let order = this.lessonInput.parent ? this.lessonInput.parent.order + 1 : 1;
                let level = 3;
                let type = 0
                let id = this.lessonInput.id;
                let parentId = this.lessonInput.parentId;
                let filePath = "";
                let filename = "";
                let content = this.lessonInput.content;
                addChapter(this.lessonInput.courseId, parentId, this.lessonInput.title, level, order, id, type, filePath, filename, content).then(response => {
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
        }
    }
</script>

<style scoped>

</style>
