<template>
    <div class="loading">
        <img src="./loading-gif.0ea1e7d.gif" alt="">
    </div>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style scoped>
    .loading{
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 90;
        background: white;
    }
    .loading>img{
        width: 2rem;
    }

</style>
