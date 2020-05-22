<template>
    <el-container v-loading="loading">
        <el-aside>
            <div class="custom">
                <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false"
                         :props="{label: `title`}" :indent="20" @node-click="handleClick">
                    <div slot-scope="{ node, data }" style="width: 100%">
                        <i class="el-icon-document" v-if="data.level === 3 && data.type === 0"></i>
                        <i class="el-icon-film" v-else-if="data.level === 3 && data.type === 3"></i>
                        <span> {{ node.label }}</span>
                    </div>
                </el-tree>
            </div>
        </el-aside>
        <el-main>
            <div id="frame-text">
            </div>
            <div v-show="showVideo">
                <video-preview ref="videoPreview" id="videoPreview"></video-preview>
            </div>
            <iframe :src="previewLink" id="frame-web" width="100%" v-show="previewLink"
                    height="100%" seamless frameborder="0" scrolling="no"></iframe>
        </el-main>
    </el-container>

</template>

<script>
    import {chapters} from '@/api/chapter'
    import {previewLink} from '@/api/file'
    import store from '@/store'
    import VideoPreview from "../preview/video";

    const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];


    export default {
        name: "Chapter",
        components: {VideoPreview},
        data() {
            return {
                loading: false,
                data: [],
                previewLink: "",
                showVideo: false,
                id: store.getters.id,
                courseId: this.$route.params.cid,
            };
        }, created() {
            this.fetchData();
        }, mounted() {
            var iframe = document.getElementById("frame-web");
            var height = document.documentElement.clientHeight - 150;
            iframe.height = height;
        },
        methods: {
            handleClick(data) {
                console.info(data);
                if (data.level !== 3) {
                    return;
                }
                this.previewLink = "";
                this.showVideo = false;
                document.getElementById("frame-text").innerHTML = "";

                if (data.type === 0) {
                    document.getElementById("frame-text").innerHTML = data.content
                    return;
                }
                this.loading = true;
                previewLink(data.filePath, data.filename).then(response => {
                    if (response.message === 'success') {
                        if (this.isVideo(data.filename)) {
                            this.showVideo = true;
                            console.info(response.data);
                            this.$refs.videoPreview._setVideo(response.data + "?dl=1", data.filePath, data.filename);
                        } else {
                            this.previewLink = response.data;
                        }
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
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
            isVideo(filename) {
                // 后缀获取
                try {
                    const arr = filename.split('.');
                    let suffix = arr[arr.length - 1];
                    return videolist.find(item => item === suffix);
                } catch (err) {
                }
                return false;
            },
        }
    }
</script>

<style>
    .custom .el-tree-node__content {
        padding-bottom: 10px;
        padding-top: 10px;
    }

</style>
