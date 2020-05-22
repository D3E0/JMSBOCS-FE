<template>
    <div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange"
                  v-loading="loading" empty-text="还没有消息，去别的地方看看吧">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-button size="small" @click="onDelete" :disabled="multipleSelection.length === 0">
                        删除选中消息
                    </el-button>
                    <el-button size="small" @click="clearSelection" :disabled="multipleSelection.length === 0">
                        取消选择
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <div class="fl">
                        <p class="read">{{scope.row.title}}</p>
                        <p class="font-s14 mt10">{{scope.row.content}}</p>
                    </div>
                    <div class="msg-time">
                        {{
                        new Date(scope.row.time).toLocaleString('chinese', {hour12: false})
                        }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px;margin-left: 13px">
            <el-pagination layout="total, prev, pager, next"
                           :total="list.length"
                           :current-page.sync="page"
                           :page-size="5">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {deleteNotify, notifyList} from "@/api/notify";

    export default {
        name: "Notify",
        computed: {
            tableData() {
                let offset = (this.page - 1) * 5;
                let end = Math.min(this.list.length, offset + 5);
                console.info("change " + offset + " " + end + " " + this.page);
                if (offset === end) {
                    console.info("bug");
                }
                return this.list.slice(offset, end);
            },
        },
        data() {
            return {
                loading: true,
                list: [],
                multipleSelection: [],
                page: 1,
                count: 0,
                limit: 2
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.loading = true;
                notifyList(this.page, this.limit).then(response => {
                    this.loading = false;
                    this.list = response.data;
                    this.count = response.count;
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            openMsgBox() {
                this.$confirm('确定删除选中消息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.doDelete();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            clearSelection() {
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            onDelete() {
                this.openMsgBox();
            },
            doDelete() {
                let x = this.multipleSelection.map(x => x.id);
                console.info(x);
                deleteNotify(x).then(response => {
                    if (response.message === 'success') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.page = 1;
                        this.fetchData();
                    }
                }).catch(ex => {
                    console.info(ex);
                    this.$message.error('删除失败');
                })
            },
            onChange(cur) {
                this.page = cur;
                this.fetchData();
            }
        },
    }
</script>

<style scoped>
    @import "../../assets/notify.css";
</style>
