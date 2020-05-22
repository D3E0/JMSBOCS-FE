<template>
    <el-form :model="chapterInput" label-width="80px">
        <el-form-item :label="(chapterInput.level !== 2 ? '章' : '节') + `标题`" >
            <el-input v-model="chapterInput.title" type="text"/>
        </el-form-item>
        <el-form-item>
            <el-button @click="$emit('do-close')">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {chapters, addChapter} from '@/api/chapter'
    import store from '@/store'

    export default {
        name: "chapter",
        props: ['chapterInput'],
        data() {
            return {
            };
        }, created() {
        },
        methods: {
            handleSubmit() {
                console.info(this.chapterInput);
                let order = this.chapterInput.parent ? this.chapterInput.parent.order + 1 : 1;
                let level = this.chapterInput.level | 0;
                let parentId = this.chapterInput.parentId | 0;
                let id = this.chapterInput.id | 0;
                addChapter(this.chapterInput.courseId, parentId, this.chapterInput.title, level, order, id).then(response => {
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
                })
            }
        }
    }
</script>

<style>


</style>
