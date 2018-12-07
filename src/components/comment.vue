<template>
    <div>
        <commentItem v-for="item in list" :key="item.cid"
                     :comment="item">
        </commentItem>
        <commentItem v-for="item in list" :key="item.cid" :comment="item">
        </commentItem>
    </div>
</template>

<script>
    import commentItem from './commentItem.vue'

    export default {
        name: "comment",
        components: {
            commentItem
        },
        data() {
            return {
                loading: true,
                list: [{
                    cid: 1,
                    time: new Date().toLocaleString(),
                    content: "回复",
                    rid: 1,
                    uid: 1,
                    name: "Anonymous",
                    pid: 1,
                }, {
                    cid: 2,
                    time: new Date().toLocaleString(),
                    content: "回复 2",
                    rid: 1,
                    uid: 1,
                    name: "Anonymous",
                    pid: 1,
                }, {
                    cid: 3,
                    time: new Date().toLocaleString(),
                    content: "回复 3",
                    rid: 1,
                    uid: 1,
                    name: "Anonymous",
                    pid: 1,
                }],
            }
        },
    }
</script>

<style scoped>
    @import "../assets/valine.css";
</style>