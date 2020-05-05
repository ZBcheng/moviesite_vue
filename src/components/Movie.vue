<template>
    <div id="movie">
        <header class="header" style="width: 100%; background: white; box-shadow: 0 3px 7px rgba(117, 115, 115, 0.1);">
            <a-row>
                <div style="width: 20%;float: left;margin-left:13%;padding-top:1%;" @click="back2Index">
                    <img src="../assets/images/brand.svg" style="width: 60%;" /> </div>
                <a-menu theme="light" mode="horizontal" :defaultSelectedKeys="['1']"
                    style="line-height: 63px; width: 20%; text-align: right; float: right; margin-right: 15%">
                    <!-- <a>hello</a> -->

                    <a-sub-menu style="margin-right: 17%">
                        <span slot="title" class="submenu-title-wrapper">
                            <a-avatar :size="44" :src="current_user.avatar" /></span>

                    </a-sub-menu>
                </a-menu>
            </a-row>

        </header>

        <video style="width: 80%; height: 80%; margin-top: 3%" controls="controls">
            <source style="width: 320px" :src="movieUrl" type="video/mp4">
        </video>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                movieUrl: this.$route.query.url,
                current_user: this.$route.query.user
            }
        },
        methods: {
            back2Index() {
                this.$router.push('/home')
            }
        }
    }
</script>