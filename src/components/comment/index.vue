<template>
    <div v-loading="loading">
        <div class="vwrap">
            <el-input type="textarea" :rows="7"
                      ref="test"
                      :placeholder="placeholder"
                      v-model="content"
                      style="position: relative;padding: 10px 5px;">
            </el-input>
            <div style="padding-top: 15px;">
                <el-row>
                    <el-col :span="24" style="text-align: right">
                        <el-button type="primary" size="small" @click="onSubmit"
                                   :disabled="content === ''">提交评论
                        </el-button>
                        <el-button size="small" @click="onReset">重置</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-row style="padding-top: 10px; padding-bottom: 20px">
            <el-col :span="24">
                <span style="font-weight: 600;font-size: 1.25rem;">{{count}}</span> 评论
            </el-col>
        </el-row>
        <commentItem v-for="item in list"
                     :key="item.commentId"
                     :comment="item"
                     v-on:onReply="listenReply">
        </commentItem>
    </div>
</template>

<script>
    import commentItem from './commentItem.vue'
    import {commentList, addComment} from '@/api/comment'
    import store from "@/store"

    export default {
        name: "comment",
        components: {
            commentItem
        },
        data() {
            return {
                courseId: this.$route.params.cid,
                userId: store.getters.id,
                loading: true,
                placeholder: '请输入内容',
                content: '',
                list: '',
                count: '',
                obj: {
                    pid: '',
                    rid: '',
                    username: '',
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.loading = true;
                commentList(this.courseId).then(response => {
                    this.loading = false;
                    this.list = response.data;
                    this.count = response.count;
                }).catch(error => {
                    this.$message.error(error);
                });
            }, onReset() {
                this.content = '';
                this.placeholder = '请输入内容';
                this.obj = {rid: '', pid: '', username: ''};
            }, onSubmit() {
                console.info(this.obj);
                addComment(this.content, this.userId, this.courseId, this.obj.rid, this.obj.pid).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.fetchData();
                    } else {
                        this.$message.error("提交失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.onReset();
                });
            }, listenReply(obj) {
                this.placeholder = `@${obj.username}，`;
                this.obj = obj;
                this.$refs.test.focus();
                console.info(obj);
            }
        }
    }
</script>

<style scoped>
    .vwrap {
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        margin-bottom: 10px;
        overflow: hidden;
        position: relative;
        padding: 10px;
    }
</style>
