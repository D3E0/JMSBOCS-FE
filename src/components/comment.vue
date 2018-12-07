<template>
    <div>
        <div class="vwrap">
            <el-input type="textarea" :rows="7"
                      :placeholder="placeholder"
                      v-model="textarea" style="position: relative;padding: 10px 5px;">
            </el-input>
            <div style="padding-top: 15px;">
                <el-row>
                    <el-col :span="6">
                        <a href="https://segmentfault.com/markdown" target="_blank">
                            MD
                        </a>
                    </el-col>
                    <el-col :span="18" style="text-align: right">
                        <el-button type="primary" size="small" @click="onSubmit">提交评论</el-button>
                        <el-button size="small" @click="onReset">重置</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-row style="padding-top: 10px; padding-bottom: 20px">
            <el-col :span="24">
                <span style="font-weight: 600;font-size: 1.25rem;">21</span> 评论
            </el-col>
        </el-row>
        <commentItem v-for="item in list"
                     :key="item.commentId"
                     :comment="item"
                     :v-loading="loading"
                     v-on:onReply="listenReply">
        </commentItem>
    </div>
</template>

<script>
    import commentItem from './commentItem.vue'

    export default {
        name: "comment",
        components: {
            commentItem
        },
        props: {
            // courseId: ,
        },
        data() {
            return {
                textarea: '',
                loading: true,
                placeholder: '请输入内容',
                list: ''
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.loading = true;
                this.axios.get('/api/comment', {
                    params: {
                        courseId: this.$root.courseId,
                    }
                }).then(response => {
                    this.loading = false;
                    this.list = response.data.data;
                }).catch(error => {
                    this.$message.error(error);
                });
            }, onReset() {

            }, onSubmit() {

            }, listenReply(obj) {
                this.placeholder = `@${obj.username}，`;
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

<!--
{
                    cid: 1,
                    time: new Date().toLocaleString(),
                    content: "回复",
                    rid: 1,
                    uid: 1,
                    name: "Anonymous",
                    pid: 1,
                }, {
                    cid: 2,
                    time: new Date().toLocaleString(),
                    content: "回复 2",
                    rid: 1,
                    uid: 1,
                    name: "Anonymous",
                    pid: 1,
                }, {
                    cid: 3,
                    time: new Date().toLocaleString(),
                    content: "回复 3",
                    rid: 1,
                    uid: 1,
                    name: "Anonymous",
                    pid: 1,
                }, {
                    cid: 4,
                    time: new Date().toLocaleString(),
                    content: "回复 3",
                    rid: 4,
                    uid: 1,
                    name: "Anonymous",
                    pid: 1,
                }-->