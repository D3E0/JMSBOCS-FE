<template>
    <div class="vcard">
        <img class="vimg" src="https://gravatar.loli.net/avatar/?d=mm" alt="头像">
        <div class="vh">
            <div class="vhead">
                <span class="vnick">{{reply.username}}</span>
                <span class="vsys">Chrome 69.0.3497.81</span>
                <span class="vsys">Windows 10.0</span>
            </div>
            <div class="vmeta">
                <span class="vtime">{{reply.commentTime}}</span>
                <el-button type="text" class="vat"
                           @click="$emit('onSubReply', {
                                            pid:reply.commentId,
                                            username:reply.username
                                        })">回复
                </el-button>
            </div>
            <div class="vcontent">{{reply.commentContent}}{{reply.commentId}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "commentReplyItem",
        props: {
            reply: {
                commentId: '',
                commentTime: '',
                commentContent: '',
                userId: '',
                username: '',
                replyComments: '',
                rootCommentId: '',
                replyUserId: '',
                replyUsername: '',
            }
        }
        , computed: {}
    }
</script>

<style scoped>
    @import "../assets/valine.css";
</style>