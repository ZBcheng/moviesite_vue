<template>
    <div id="detail" style="background:#ECECEC; height: 100%">
        <header class="header" style="width: 100%; background: white; box-shadow: 0 3px 7px rgba(117, 115, 115, 0.1);">
            <a-row>
                <div style="width: 20%;float: left;margin-left:13%;padding-top:1%;" @click="back2Index">
                    <img src="../assets/images/brand.png" style="width: 60%;" /> </div>
                <a-menu theme="light" mode="horizontal" :defaultSelectedKeys="['1']"
                    style="line-height: 63px; width: 20%; text-align: right; float: right; margin-right: 15%">
                    <!-- <a>hello</a> -->

                    <a-sub-menu style="margin-right: 17%">
                        <span slot="title" class="submenu-title-wrapper">
                            <a-avatar :size="44" :src="current_user.avatar" /></span>
                        <a-menu-item-group title="个人信息">
                            <a-menu-item key="info">
                                <a-icon type="idcard" />我的信息</a-menu-item>

                        </a-menu-item-group>
                        <a-menu-item-group title="其它">
                            <a-menu-item key="setting:4" style="color: red;">
                                <a-icon type="export" />退出</a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                </a-menu>
            </a-row>

        </header>

        <div style="height: 80%;">
            <a-card hoverable style="width: 70%; margin-left: 15%; margin-top: 3%; text-align: left;">
                <a-row>
                    <a-row>
                        <a-col :span="8">
                            <div style="float:left">
                                <img slot="cover" alt="example" :src="movie.post" />
                            </div>
                        </a-col>
                        <a-col :span="16" style="float: left; text-align: left;">
                            <h1>{{ movie.name }}</h1>
                            <h4>导演: {{ this.directors }}</h4>
                            <h4>演员: {{ this.actors }}</h4>
                            <h4>分类: {{ this.categories }}</h4>
                            <h4>地区: {{ this.movie.area }}</h4>
                            <h4>语言: {{ this.movie.language }}</h4>
                            <h4>片长: {{ this.movie.length }} 分钟</h4>
                            <h4>上映时间: {{ this.movie.release_date }}</h4>
                            <div style="margin-top:2%">
                                <a :href="movie.link_addr" style="font-size: 16px;">链接: IMDB</a>
                            </div>

                            <div v-if="stored==false">
                                <a-button type="primary" icon="eye" :size="large" style="margin-top: 2%"
                                    @click="storeUp(movie.id, 0)">
                                    收藏
                                </a-button>
                            </div>

                            <div v-else-if="stored==true">
                                <a-button type="primary" icon="eye-invisible" :size="large" style="margin-top: 2%"
                                    @click="storeUp(movie.id, 1)">
                                    取消收藏
                                </a-button>
                            </div>



                            <a-button type="primary" icon="caret-right" :size="large" style="margin-top: 2%"
                                @click="watchMovie">
                                播放
                            </a-button>
                        </a-col>
                    </a-row>
                    <a-row style="margin-top: 3%;">
                        <p style="font-size:16px; line-height: 1.7;">
                            {{ movie.desc }}
                        </p>
                    </a-row>

                </a-row>
            </a-card>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                movie: "",
                current_user: "",
                directors: "",
                actors: "",
                categories: "",
                stored: false,
                host: "api"
            }
        },

        mounted() {
            console.log(this.movie)
            this.getMovie()
            this.getUser()
        },

        methods: {
            getMovie() {
                var url = this.host + "/movies/query?movie_id=" + this.$route.query.id
                axios.get(url)
                    .then(response => {
                        this.movie = response.data[0]
                        this.createDirectorsStr()
                        this.createActorsStr()
                        this.createCategoriesStr()
                        this.isStored()
                    })
            },
            createDirectorsStr() {
                var i
                for (i = 0; i < this.movie.directors.length; i++) {
                    this.directors += this.movie.directors[i] + " "
                }
            },
            createActorsStr() {
                var i
                for (i = 0; i < this.movie.actors.length; i++) {
                    this.actors += this.movie.actors[i] + " "
                }
            },
            createCategoriesStr() {
                var i
                for (i = 0; i < this.movie.category.length; i++) {
                    this.categories += this.movie.category[i] + " "
                }
            },
            getUser() {
                var url = this.host + "/users/query?username=" + sessionStorage.username
                axios.get(url)
                    .then(response => {
                        this.current_user = response.data[0]
                    })
                    .catch(response => {
                        console.log(response.data)
                    })

            },
            back2Index() {
                this.$router.push('/home')
            },
            watchMovie() {
                this.$router.push({ path: "/movie", query: { url: this.movie.video, user: this.current_user } })
            },
            isStored() {
                var url = this.host + "/users/stored?username=" + sessionStorage.username + "&movie_id=" + this.movie.id
                axios.get(url)
                    .then(response => {
                        var i
                        for (i = 0; i < response.data.length; i++) {
                            if (response.data[i].id == this.movie.id) {
                                this.stored = true
                            }
                        }
                    })
            },
            storeUp(movie_id, op) {

                var url = this.host + "/users/store"
                var headers = {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT",
                    "Access-Control-Allow-Headers": "Content-Type",
                }

                axios.put(url, {
                    headers: headers,
                    data: {
                        "usre_name": sessionStorage.username,
                        "movie_id": movie_id,
                        "op": op,
                    },
                })
                    .then(response => {
                        console.log(response.data)
                        location.reload()
                    })
            }
        }

    }
</script>