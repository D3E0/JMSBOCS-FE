<template>
    <div>
        <el-table ref="multipleTable" :data="list" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-button size="small" @click="onDelete()">删除选中消息</el-button>
                    <el-button size="small" @click="clearSelection()">取消选择</el-button>
                </template>
                <template slot-scope="scope">
                    <div class="fl">
                        <p class="read">{{scope.row.title}}</p>
                        <p class="font-s14 mt10">{{scope.row.content}}</p>
                    </div>
                    <div class="msg-time">{{scope.row.time}}</div>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notify",
        data: function () {
            return {
                checked: true,
                list: [{
                    id: 1,
                    title: "课程加入提醒",
                    content: "你已加入课程《计算机网络》，快去学习吧",
                    time: "2017年12月04日  17:15:51"
                }, {
                    id: 2,
                    title: "作业发布提醒",
                    content: "课程《计算机网络》有新的作业了，快去提交吧",
                    time: "2017年12月04日  17:15:51"
                }, {
                    id: 3,
                    title: "作业提交提醒",
                    content: "作业《计算机网络第二次作业》马上就要截止了，快去提交吧",
                    time: "2017年12月04日  17:15:51"
                },
                    {
                        id: 4,
                        title: "作业提交提醒",
                        content: "作业《计算机网络第二次作业》马上就要截止了，快去提交吧",
                        time: "2017年12月04日  17:15:51"
                    },
                    {
                        id: 5,
                        title: "作业提交提醒",
                        content: "作业《计算机网络第二次作业》马上就要截止了，快去提交吧",
                        time: "2017年12月04日  17:15:51"
                    },
                    {
                        id: 6,
                        title: "作业提交提醒",
                        content: "作业《计算机网络第二次作业》马上就要截止了，快去提交吧",
                        time: "2017年12月04日  17:15:51"
                    }],
                multipleSelection: []
            }
        }, methods: {
            open2() {
                this.$message({
                    message: '删除成功！！！',
                    type: 'success'
                });
            },
            clearSelection() {
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                console.info(val);
                this.multipleSelection = val;
            },
            onDelete() {
                console.info("on Delete");
                console.info(this.multipleSelection);
                let x = this.multipleSelection.map(x => x.id);
                console.info(x);
            }
        }
    }
</script>

<style scoped>
    @import "notify.css";
</style>