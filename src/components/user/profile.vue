<template>
    <teacher-profile v-if="isTeacher"/>
    <student-profile v-else/>
</template>

<script>
    import studentProfile from './studentProfile.vue'
    import teacherProfile from './teacherProfile.vue'
    import store from '@/store'

    export default {
        name: "Profile",
        components: {
            studentProfile, teacherProfile
        }, data() {
            return {
                roles: store.getters.roles,
                isTeacher: store.getters.isTeacher
            };
        }
    }
</script>

<style scoped>

</style>
