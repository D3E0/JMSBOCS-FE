<template>
    <div class="vcard" :id="comment.cid">
        <img class="vimg" src="https://gravatar.loli.net/avatar/?d=mm">
        <div class="vh">
            <div class="vhead">
                <span class="vnick"> {{comment.name}}</span>
                <span class="vsys">Chrome 69.0.3497.81</span>
                <span class="vsys">Windows 10.0</span>
            </div>
            <div class="vmeta">
                <span class="vtime">{{comment.time}}</span>
                <span class="vat">回复</span>
            </div>
            <div class="vcontent">{{comment.content}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "commentItem",
        props: ['comment']
    }
</script>

<style scoped>
    @import "../assets/valine.css";
</style>