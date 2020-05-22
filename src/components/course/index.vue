<template>
    <div>
        <el-container>
            <el-header style="height: 100%">
                <span style="font-size: 22px; text-align: left; margin-right: 10px">课程 {{course.courseName}}</span>
                <div style="display: inline" v-if="isStudent">
                    <el-button type="text" icon="el-icon-star-on"
                               style="color: rgb(247, 186, 42);font-size: 18px;"
                               v-if="favor"
                               @click="handleClick">
                    </el-button>
                    <el-button type="text" icon="el-icon-star-off"
                               style="color: rgb(198, 209, 222);font-size: 18px;"
                               v-if="!favor"
                               @click="handleClick">
                    </el-button>
                </div>
            </el-header>
            <el-container style="margin-top: 10px">
                <el-aside width="150px">
                    <side/>
                </el-aside>
                <el-main style="padding-top: 0">
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Side from './side.vue'
    import {courseInfo, favor, unfavor, studyInfo} from "@/api/course";
    import store from '@/store'


    export default {
        name: "Course",
        components: {
            Side
        }, data() {
            return {
                favor: false,
                course: {
                    courseName: ""
                },
                isTeacher: store.getters.isTeacher,
                isStudent: store.getters.isStudent
            }
        },
        created() {
            this.fetchData();
        }, methods: {
            fetchData() {
                courseInfo(this.$route.params.cid).then(response => {
                    this.course = response.data;
                }).catch(error => {
                    this.$message.error(error);
                });

                if (!this.isStudent) {
                    return;
                }

                studyInfo(this.$route.params.cid, 2).then(response => {
                    if (response.message === 'success') {
                        this.favor = true;
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            handleClick() {
                if (this.favor) {
                    unfavor(this.$route.params.cid).then(response => {
                        console.info(response);
                    }).catch(error => {
                        this.$message.error(error);
                    });
                } else {
                    favor(this.$route.params.cid).then(response => {
                        console.info(response);
                    }).catch(error => {
                        this.$message.error(error);
                    });
                }
                this.favor = !this.favor;
            }
        }
    }
</script>

<style scoped>

</style>
