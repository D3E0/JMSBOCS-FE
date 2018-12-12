<template>
    <div class="profile">
        <img src="../assets/teacher.png" alt="头像" style="height: 250px">
        <p class="name">戴霸天</p>
        <p>办公室:c1-509</p>
        <p>联系方式:13758192664</p>
        <p>邮箱:1183503933@qq.com</p>
        <p>QQ:1183503933</p>
    </div>
</template>

<script>
    export default {
        name: "UserHome",
        props:['courseId'],
        data() {
            return {}
        }
    }
</script>

<style scoped>
    /*@import "../assets/teacher.css";*/

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