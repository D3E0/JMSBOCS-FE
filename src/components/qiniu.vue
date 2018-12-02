<template>
    <el-form ref="qiniuForm" :model="milk" label-width="90px" style="width: 500px">
        <el-form-item label="Access Key" prop="ak">
            <el-input v-model="milk.ak" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Secret Key" prop="sk">
            <el-input v-model="milk.sk" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Bucket">
            <el-select v-model="milk.bucket" placeholder="请输入 Bucket"
                       style="width: 100%"
                       filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading"
                       prop="bucket">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button @click="resetForm('qiniuForm')">取消</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    export default {
        name: "qiniu",
        data() {
            return {
                milk: {
                    ak: "",
                    sk: "",
                    bucket: "",
                },
                options: [{value: "请先填写 AK, SK", disabled: true}],
                loading: false,
            };
        },
        methods: {
            remoteMethod() {
                if (this.milk.ak !== '' && this.milk.sk !== '') {
                    setTimeout(this.fetchData(), 200);
                } else {
                    this.options = [{value: "请先填写 AK, SK", disabled: true}];
                }
            },
            fetchData() {
                this.loading = true;
                this.axios.get('/api/qiniu', {
                    params: {
                        accessKey: this.$root.uid,
                        secretKey: this.$root.uid,
                    }
                }).then(response => {
                    this.loading = false;
                    let reg = new RegExp("[\\[\\]\"]", "g");
                    let list = response.data.data.replace(reg, '').split(',');
                    this.options = list.map(item => {
                        return {value: item, label: item};
                    });
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            onSubmit() {
                const params = new URLSearchParams();
                params.append('id', this.$root.uid);
                params.append('accessKey', this.milk.ak);
                params.append('secretKey', this.milk.sk);
                params.append('bucket', this.milk.bucket);
                this.axios.post('/api/user/qiniu', params).then(response => {
                    if (response.data.message === 'success') {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error("修改失败");
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>