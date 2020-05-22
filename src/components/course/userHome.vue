<template>
    <div class="profile" v-loading="loading">
        <img :src="avatar" alt="头像" style="height: 250px">
        <p class="name">{{user.username}}</p>
        <p>办公室: {{user.office}}</p>
        <p>联系方式:{{user.telephone}}</p>
        <p>邮箱:{{user.email}}</p>
    </div>
</template>

<script>
    import {teacherInfo} from '@/api/course'
    import avatar from '@/assets/teacher.png'

    export default {
        name: "UserHome",
        data() {
            return {
                avatar: avatar,
                loading: false,
                cid: this.$route.params.cid,
                user: {
                    userId: '',
                    username: '',
                    telephone: '',
                    email: '',
                    office: '',
                }
            }
        }, created() {
            this.fetchData();
        }, methods: {
            fetchData() {
                this.loading = true;
                teacherInfo(this.cid).then(response => {
                    this.loading = false;
                    this.user = response.data;
                }).catch(error => {
                    this.$message.error(error);
                });
            },
        }
    }
</script>

<style scoped>

    .profile {
        text-align: center;
    }

    .profile p {
        font-size: 16px;
        color: #495060;
    }

    .profile .name {
        font-weight: 600;
        color: #495060;
        font-size: 20px;
    }
</style>
