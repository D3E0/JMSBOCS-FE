<template>
    <div class="custom-tree-container" v-loading="loading">
        <el-button type="primary" style="margin-bottom: 20px" @click="dialogTableVisible=true">添加分类</el-button>
        <el-tree :data="list"
                 node-key="id"
                 :load="loadNode"
                 :props="props"
                 lazy
        style="font-size: 60px">
        </el-tree>
        <el-dialog title="添加分类" :visible.sync="dialogTableVisible">
            <add-category/>
        </el-dialog>
    </div>
</template>

<script>
    import {category} from '@/api/user'
    import addCategory from "./addCategory";

    export default {
        data() {
            return {
                props: {
                    label: 'categoryName',
                    isLeaf: function (data, node) {
                        if (data && data.floor === 3) {
                            return true;
                        }
                    }
                },
                loading: false,
                list: [],
                dialogTableVisible: false,
            }
        },
        components: {
            addCategory
        },
        created() {
            // this.fetchData();
        },
        methods: {
            fetchData() {

            },
            loadNode(node, resolve) {
                let id = 0;
                if (node.level >= 1) {
                    id = node.data.id;
                }
                category(id).then(response => {
                    resolve(response.data);
                }).catch(error => {
                    this.$message.error(error);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>

<style>

</style>
