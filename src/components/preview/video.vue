<template>
    <div>
        <div id="dplayer">
        </div>
    </div>
</template>

<script>
    import DPlayer from 'dplayer';
    import {danmakuList, sendDanmaku} from "@/api/danmaku"
    import md5 from 'js-md5';

    export default {
        name: "VideoPreview",
        data() {
            return {
                player: null,
                options: {
                    video: {
                        url: ''
                    },
                    contextmenu: [
                        {}
                    ],
                    container: '',
                    apiBackend: {
                        read: function (options) {
                            //apiurl = `${this.options.api.address}v3/?id=${this.options.api.id}`;
                            let arr = options.url.split("=");
                            let id = arr[arr.length - 1];
                            console.info(options);
                            console.info(id);
                            if (!id) {
                                return;
                            }
                            danmakuList(id).then(response => {
                                if (response.message === 'success') {
                                    options.success &&
                                    options.success(response.data);
                                }
                            }).catch(error => {
                                options.error && options.error(error);
                            })
                        },
                        send: function (options) {
                            console.info(options);
                            sendDanmaku(options.data).then(response => {
                                if (response.message === 'success') {
                                    options.success &&
                                    options.success(response.data);
                                }
                            }).catch(error => {
                                options.error && options.error(error);
                            })
                        },
                    },
                },
            }
        },
        mounted() {
        },
        created() {
        },
        methods: {
            // 设置视频播放路径
            _setVideo(url, filePath, filename) {
                let id = md5(filePath + "/" + filename);
                console.info(id);
                let options = {
                    video: {
                        url: url
                    }, danmaku: {
                        id: id,
                        api: "",
                    },
                    apiBackend: this.options.apiBackend
                };
                options.container = document.getElementById('dplayer');
                this.player = new DPlayer(options);
            },
        },

    }
</script>

<style scoped>
</style>
