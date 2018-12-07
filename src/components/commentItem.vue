<template>
    <div class="vcard">
        <img class="vimg" src="https://gravatar.loli.net/avatar/?d=mm" alt="头像">
        <div class="vh">
            <div class="vhead">
                <span class="vnick">{{comment.username}}</span>
                <span class="vsys">Chrome 69.0.3497.81</span>
                <span class="vsys">Windows 10.0</span>
            </div>
            <div class="vmeta">
                <span class="vtime">{{comment.commentTime}}</span>
                <el-button type="text" class="vat"
                           @click="$emit('onReply', {
                                            pid:comment.commentId,
                                            rid:comment.commentId,
                                            username:comment.username
                                        })">回复
                </el-button>
            </div>
            <div class="vcontent">{{comment.commentContent}}{{comment.commentId}}</div>
            <div class="vquote">
                <comment-reply-item v-for="item in comment.replyComments"
                                    :key="item.commentId"
                                    :reply="item"
                                    v-on:onSubReply="listenSubReply">
                </comment-reply-item>
            </div>
        </div>
    </div>
</template>

<script>
    import commentReplyItem from './commentReplyItem.vue'

    export default {
        name: "commentItem",
        components: {
            commentReplyItem
        },
        props: {
            comment: {
                commentId: '',
                courseId: '',
                commentTime: '',
                commentContent: '',
                userId: '',
                username: '',
                replyComments: '',
            }
        }
        , computed: {},
        methods: {
            listenSubReply(obj) {
                obj.rid = this.comment.commentId;
                this.$emit('onReply', obj);
            }
        }
    }
</script>

<style scoped>
    @import "../assets/valine.css";
</style>