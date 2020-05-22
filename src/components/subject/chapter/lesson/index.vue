<template>
    <div>
        <el-form :model="form" label-width="90px">
            <el-form-item label="课时类型" prop="name">
                <el-radio-group v-model="lessonInput.type">
                    <el-radio :label="0">文本</el-radio>
                    <!--                    <el-radio :label="1">PDF</el-radio>-->
                    <!--                    <el-radio :label="2">视频</el-radio>-->
                    <el-radio :label="3">文档</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <text-type v-if="lessonInput.type === 0"
                   v-on:do-close="$emit('do-close')"
                   v-bind:lessonInput="this.lessonInput"/>

        <file-type v-else-if="lessonInput.type === 3"
                   v-on:do-close="$emit('do-close')"
                   v-bind:lessonInput="this.lessonInput"/>
    </div>
</template>

<script>
    import VideoType from "./video";
    import TextType from "./text";
    import FileType from "./file";

    export default {
        name: "EditLesson",
        components: {FileType, TextType, VideoType},
        props: ['lessonInput'],
        computed: {},
        data() {
            return {
                form: {},
            };
        },
        methods: {}
    }
</script>

<style scoped>
</style>
