<template>
    <div class="profile" v-loading="loading">
        <img src="../assets/teacher.png" alt="头像" style="height: 250px">
        <p class="name">{{user.username}}</p>
        <p>办公室: {{user.office}}</p>
        <p>联系方式:{{user.telephone}}</p>
        <p>邮箱:{{user.email}}</p>
    </div>
</template>

<script>
    export default {
        name: "CourseUserHome",
        data() {
            return {
                loading: false,
                uid: this.$root.uid,
                isTch: this.$root.isTch,
                cid: this.$root.courseId,
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
                this.axios.get('/api/course/teacher', {
                    params: {
                        courseId: this.cid
                    }
                }).then(response => {
                    this.loading = false;
                    this.user = response.data.data;
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

    .name {
        font-weight: 600;
        color: #495060;
        font-size: 20px;
    }
</style>