<template>
    <div class="content" v-loading="loading">
        <div id="owl-login"
             v-bind:class="{password: showEyes }">
            <div class="hand"></div>
            <div class="hand hand-r"></div>
            <div class="arms">
                <div class="arm"></div>
                <div class="arm arm-r"></div>
            </div>
        </div>
        <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"
                          @blur="handleBlur" @focus="handleFocus">
                </el-input>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button style="width: 100px;" size="medium"
                           type="primary" @click="onSubmit">登陆
                </el-button>
                <el-button size="medium" @click="onReset('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                form: {username: '', password: ''},
                showEyes: false,
            }
        }, methods: {
            onSubmit() {
                if (this.form.username === '' || this.form.password === '') {
                    this.$message.error("请先填写用户名、密码");
                    return;
                }
                this.loading = true;
                this.$store.dispatch('Login', this.form).then(() => {
                    this.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    console.info('success');
                    // window.location.href = '/home';
                    this.$router.push({path: this.redirect || '/'})
                }).catch(error => {
                    console.info(error);
                    this.$message.error('登陆失败了');
                }).finally(() => {
                    this.loading = false;
                });
            }, handleBlur() {
                this.showEyes = false;
            }, handleFocus() {
                this.showEyes = true;
            }, onReset(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

    .content {
        position: absolute;
        height: 300px;
        width: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #owl-login {
        top: -100px;
        z-index: 1000;
        width: 211px;
        height: 108px;
        background-image: url("../../assets/owl-login.png");
        position: absolute;
        left: 50%;
        margin-left: -80px;
    }

    @media all and (-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 1.5/1), (min-device-pixel-ratio: 1.5), (min-resolution: 138dpi), (min-resolution: 1.5dppx) {
        #login #owl-login {
            background-image: url("../../assets/owl-login@2x.png");
            -webkit-background-size: 211px 108px;
            -moz-background-size: 211px 108px;
            background-size: 211px 108px;
        }
    }

    #owl-login .hand {
        width: 34px;
        height: 34px;
        -webkit-border-radius: 40px;
        border-radius: 40px;
        background-color: #472d20;
        -webkit-transform: scaleY(0.6);
        -moz-transform: scaleY(0.6);
        -o-transform: scaleY(0.6);
        -ms-transform: scaleY(0.6);
        transform: scaleY(0.6);
        -webkit-transition: 0.3s ease-out;
        -moz-transition: 0.3s ease-out;
        -o-transition: 0.3s ease-out;
        transition: 0.3s ease-out;
        position: absolute;
        left: 14px;
        bottom: -8px;
    }

    #owl-login .hand.hand-r {
        left: 170px;
    }

    #owl-login.password .hand {
        -webkit-transform: translateX(42px) translateY(-15px) scale(0.7);
        -moz-transform: translateX(42px) translateY(-15px) scale(0.7);
        -o-transform: translateX(42px) translateY(-15px) scale(0.7);
        -ms-transform: translateX(42px) translateY(-15px) scale(0.7);
        transform: translateX(42px) translateY(-15px) scale(0.7);
    }

    #owl-login.password .hand.hand-r {
        -webkit-transform: translateX(-42px) translateY(-15px) scale(0.7);
        -moz-transform: translateX(-42px) translateY(-15px) scale(0.7);
        -o-transform: translateX(-42px) translateY(-15px) scale(0.7);
        -ms-transform: translateX(-42px) translateY(-15px) scale(0.7);
        transform: translateX(-42px) translateY(-15px) scale(0.7);
    }

    #owl-login .arms {
        top: 58px;
        position: absolute;
        width: 100%;
        height: 41px;
        overflow: hidden;
    }

    #owl-login .arms .arm {
        width: 40px;
        height: 65px;
        position: absolute;
        left: 20px;
        top: 40px;
        background-image: url("../../assets/owl-login-arm.png");
        -webkit-transition: 0.3s ease-out;
        -moz-transition: 0.3s ease-out;
        -o-transition: 0.3s ease-out;
        transition: 0.3s ease-out;
        -webkit-transform: rotate(-20deg);
        -moz-transform: rotate(-20deg);
        -o-transform: rotate(-20deg);
        -ms-transform: rotate(-20deg);
        transform: rotate(-20deg);
    }

    @media all and (-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 1.5/1), (min-device-pixel-ratio: 1.5), (min-resolution: 138dpi), (min-resolution: 1.5dppx) {
        #login #owl-login .arms .arm {
            background-image: url("../../assets/owl-login-arm@2x.png");
            -webkit-background-size: 40px 65px;
            -moz-background-size: 40px 65px;
            background-size: 40px 65px;
        }
    }

    #owl-login .arms .arm.arm-r {
        -webkit-transform: rotate(20deg) scaleX(-1);
        -moz-transform: rotate(20deg) scaleX(-1);
        -o-transform: rotate(20deg) scaleX(-1);
        -ms-transform: rotate(20deg) scaleX(-1);
        transform: rotate(20deg) scaleX(-1);
        left: 158px;
    }

    #owl-login.password .arms .arm {
        -webkit-transform: translateY(-40px) translateX(40px);
        -moz-transform: translateY(-40px) translateX(40px);
        -o-transform: translateY(-40px) translateX(40px);
        -ms-transform: translateY(-40px) translateX(40px);
        transform: translateY(-40px) translateX(40px);
    }

    #owl-login.password .arms .arm.arm-r {
        -webkit-transform: translateY(-40px) translateX(-40px) scaleX(-1);
        -moz-transform: translateY(-40px) translateX(-40px) scaleX(-1);
        -o-transform: translateY(-40px) translateX(-40px) scaleX(-1);
        -ms-transform: translateY(-40px) translateX(-40px) scaleX(-1);
        transform: translateY(-40px) translateX(-40px) scaleX(-1);
    }
</style>