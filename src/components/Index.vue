<template>
    <div class="index">
        <a-layout id="components-layout">
            <header class="header"
                style="width: 100%; background: white; box-shadow: 0 3px 7px rgba(117, 115, 115, 0.1);">
                <a-row>
                    <div style="width: 20%;float: left;margin-left:13%;padding-top:1%;">
                        <img src="../assets/images/brand.png" style="width: 60%;" /> </div>
                    <div style="width: 30%; float: left; padding-top:1%; margin-left:0.5%">
                        <template>
                            <div class="certain-category-search-wrapper" style="width: 100%;">
                                <a-auto-complete class="certain-category-search"
                                    dropdownClassName="certain-category-search-dropdown"
                                    :dropdownMatchSelectWidth="false" :dropdownStyle="{width: '300px'}" size="large"
                                    style="width: 100%" placeholder="请输入电影名" optionLabelProp="value">

                                    <a-input-search id="movie-searcher" placeholder="input search text"
                                        style="width: 100%; float: left" @search="onSearch" />

                                </a-auto-complete>
                            </div>
                        </template>

                    </div>
                    <a-menu theme="light" mode="horizontal" :defaultSelectedKeys="['1']"
                        style="line-height: 63px; width: 20%; text-align: right; float: right; margin-right: 15%">
                        <!-- <a>hello</a> -->

                        <a-sub-menu style="margin-right: 17%">
                            <span slot="title" class="submenu-title-wrapper">
                                <a-avatar :size="44" :src="current_user.avatar" /></span>
                            <a-menu-item-group title="个人信息">
                                <a-menu-item key="info" @click="viewUser">
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

            <a-row style="margin-top: 2%;">
                <a-col :span="4"></a-col>
                <a-col :span="16">
                    <a-carousel autoplay>
                        <div v-for=" comp in compilation_list" :key="comp.name">
                            <img :src="comp.post" style="width: 100%; max-height: 400px;" @click="alert('hello')">
                        </div>
                    </a-carousel>
                </a-col>
                <a-col :span="4"></a-col>

            </a-row>

            <div style="margin-top: 3%; margin-bottom: 20%;">
                <a-row>
                    <a-col :span="4"></a-col>
                    <a-col :span="4">
                        <a-menu
                            style="text-align: left; width: 80%; font-weight: bold; box-shadow: 0 3px 7px rgba(117, 115, 115, 0.4);"
                            :defaultSelectedKeys="['all']" mode="inline">

                            <a-menu-item-group>
                                <template slot="title">
                                    <span style="color: #1890FF">关注</span>
                                </template>
                                <a-menu-item key="movies" @click="selectTag('movies')">电影</a-menu-item>
                                <a-menu-item key="messages" @click="selectTag('messages')">信箱</a-menu-item>
                            </a-menu-item-group>


                            <a-menu-item-group v-if="selectedTag=='movies'">
                                <template slot="title">
                                    <span style="color: #1890FF">分类</span>
                                </template>
                                <a-menu-item key="all" @click="getMovies()">全部
                                </a-menu-item>
                                <a-menu-item key="stored" @click="getStored()">收藏
                                </a-menu-item>
                                <a-menu-item v-for="category in categories" :key="category.id"
                                    @click="getMovieByType(category.name)">
                                    {{ category.name }}
                                </a-menu-item>
                            </a-menu-item-group>


                        </a-menu>
                    </a-col>

                    <div v-if="selectedTag=='movies'">
                        <a-col :span="12">

                            <a-list itemLayout="vertical" size="large">
                                <a-list-item v-for="movie in movie_list" :key="movie.title">
                                    <img :src="movie.post" slot="extra" width="150" height="200" />
                                    <a-list-item-meta :description="item">
                                        <a slot="title" style="float:left; font-size: large;"
                                            @click="viewMovie(movie.id)">{{ movie.name }}</a>
                                    </a-list-item-meta>
                                    <p style="float:left; overflow: hidden;
                                display: -webkit-box; -webkit-line-clamp: 5;
                                -webkit-box-orient: vertical;">{{ movie.desc }}</p>
                                    <a-rate disabled :defaultValue="movie.score" style="float:left; " />
                                    <template>
                                        <a-row style="float: right; font-size: 16px">
                                            <span>
                                                <a-icon :id="'likeicon' + movie.id" type="like"
                                                    :style="{color: 'black', marginRight: '4px', marginTop: '10%', theme: 'twoTone'}"
                                                    @click="likeit(movie.id)" />
                                                <span :id="'like_count' + movie.id">{{ movie.like_count }}</span>
                                            </span>

                                        </a-row>

                                    </template>
                                </a-list-item>
                            </a-list>
                        </a-col>
                    </div>

                    <div v-else-if="selectedTag=='messages'">
                        <a-col :span="12">
                            <div style="background-color: #fff;">
                                <a-tabs defaultActiveKey="unread" style="height:100%; margin-bottom: 2%;">
                                    <a-tab-pane tab="未读" key="unread" style="width: 100%; overflow: visible">
                                        <MessageUnreadTable />
                                    </a-tab-pane>
                                    <a-tab-pane tab="收件箱" key="recv" style="width: 100%; overflow: visible">
                                        <MessageRecvTable />
                                    </a-tab-pane>
                                    <a-tab-pane tab="发件箱" key="sent" style="width: 100%; overflow: visible">
                                        <MessageSentTable />
                                    </a-tab-pane>
                                    <a-tab-pane tab="发消息" key="sendMessage" style="width: 100%; overflow: visible">
                                        <SendMessageTable />
                                    </a-tab-pane>

                                </a-tabs>
                            </div>
                        </a-col>
                    </div>

                </a-row>

                <!-- 用户信息drawer -->
                <a-drawer width="40%" placement="right" :closable="true" @close="onUserClose"
                    :visible="userDrawerVisible">

                    <a-row style="margin-top:4%">
                        <a-col :span=5>
                            <a-upload name="avatar" listType="picture-card" class="avatar-uploader"
                                :showUploadList="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :beforeUpload="beforeUpload" @change="handleChange">
                                <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="height: 90px; width: 90px" />
                                <div v-else>
                                    <a-icon :type="loading ? 'loading' : 'plus'" />
                                    <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                        </a-col>
                        <a-col :span=12>
                            <p
                                style="margin-top:5%; margin-left: 15%; float: left; font-size: 40px; font-weight: bold;">
                                {{ current_user.username }}</p>
                        </a-col>
                    </a-row>
                    <a-divider />

                    <a-form :form="updateUserForm" layout="vertical" @submit="updateUser">
                        <a-row>
                            <a-col :span="24">
                                <a-row>
                                    <a-col :span="3"><b :style="pStyle">手机</b></a-col>
                                    <a-col :span="12">
                                        <a-form-item>
                                            <a-input v-decorator="['update_phone', {initialValue: current_user.phone}]">
                                            </a-input>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </a-col>
                        </a-row>
                        <a-row style="margin-top:5%">
                            <a-col :span="24">
                                <a-row>
                                    <a-col :span="3"><b :style="pStyle">邮件</b></a-col>
                                    <a-col :span="12">
                                        <a-form-item>
                                            <a-input v-decorator="['update_email', {initialValue: current_user.email}]">
                                            </a-input>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </a-col>
                        </a-row>
                        <a-divider />
                        <a-row style="margin-top: 5%">
                            <a-button type="primary" html-type="submit">变更</a-button>
                        </a-row>
                        <a-row style="margin-top: 55%; margin-bottom: 2%">
                            <a-button type="danger" @click="logout"
                                style="background-color:orangered; color: white; width: 100%">
                                退出登录
                            </a-button>
                        </a-row>
                    </a-form>
                </a-drawer>

            </div>

            <a-layout-footer style="margin-top:5%; text-align: center; background: white;">
                <a href="https://github.com/zbcheng/moviesite">MOVIESITE ©2020 Created by
                    ZBCheng</a>
            </a-layout-footer>
        </a-layout>
    </div>
</template>






<script>
    import axios from 'axios'

    import MessageRecvTable from './tables/MessageRecvTable.vue'
    import MessageSentTable from './tables/MessageSentTable.vue'
    import MessageUnreadTable from './tables/MessageUnreadTable.vue'
    import SendMessageTable from './tables/SendMessageTable.vue'

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    export default {
        name: 'Index',
        components: {
            MessageRecvTable,
            MessageSentTable,
            MessageUnreadTable,
            SendMessageTable,
        },
        data() {
            return {
                current_user: '',
                movie_list: '',
                compilation_list: '',
                categories: '',
                selectedTag: 'movies',
                userDrawerVisible: false, // 用户信息drawer展示
                updateUserForm: this.$form.createForm(this, { name: 'coordinated' }),
                imageAvatar: '',
                imageUrl: '',
                host: '/api/',
            };
        },
        mounted() {
            this.getCurrentUser()
            this.getMovies()
            this.getCompilations()
            this.getMovieTypes()
        },
        created() {
            this.initWebSocket()
        },
        methods: {
            initWebSocket() {
                //初始化weosocket
                const url = "ws://localhost:7000/noti"
                this.websock = new WebSocket(url)
                this.websock.onmessage = this.websocketonmessage
                this.websock.onopen = this.websocketonopen
                this.websock.onclose = this.websocketonclose
                console.log(this.websock)
            },
            websocketonopen() {
                //连接建立之后执行send方法发送数据
                // operation: 0 建立连接
                // operation: 1 断开连接
                this.websocketsend(JSON.stringify({ "username": sessionStorage.username, "operation": 0 }))
            },
            websocketonmessage(e) {
                //数据接收
                const redata = e.data
                var title = "来自bot的消息"
                this.openNotificationWithIcon("info", title, redata)
            },
            websocketsend(Data) {
                //数据发送
                this.websock.send(Data)
            },
            websocketonclose() {
                this.websocketsend(JSON.stringify({ "username": sessionStorage.username, "operation": 1 }))
                if (this.websocket != null) {
                    this.websocket.close()
                }
            },

            getCurrentUser() {
                var url = this.host + "/users/query?username=" + sessionStorage.username
                axios.get(url)
                    .then(response => {
                        this.current_user = response.data[0]
                        this.imageUrl = this.current_user.avatar
                        console.log(this.current_user)
                    })

            },
            onSearch(value) {
                if (value == "") {
                    this.getMovies()
                }
                var url = this.host + "/movies/query?name=" + value
                axios.get(url)
                    .then(response => {
                        this.movie_list = response.data
                    })
            },
            selectTag(tagName) {
                this.selectedTag = tagName
            },

            getMovies() {
                var url = this.host + "/movies"
                axios.get(url)
                    .then(response => {
                        this.movie_list = response.data
                    })
            },
            getStored() {
                var url = this.host + "/users/stored?username=" + sessionStorage.username
                axios.get(url)
                    .then(response => {
                        this.movie_list = response.data
                    })
            },
            getCompilations() {
                var url = this.host + "/movies/comp"
                axios.get(url)
                    .then(response => {
                        this.compilation_list = response.data
                    })
            },
            getMovieTypes() {
                var url = this.host + "/movies/mv_categories"
                axios.get(url)
                    .then(response => {
                        this.categories = response.data
                    })
            },
            getMovieByType(category) {
                var url = this.host + "/movies/query?category=" + category
                axios.get(url)
                    .then(response => {
                        this.movie_list = response.data
                    })
            },
            viewMovie(movieID) {
                this.$router.push({ path: "/view", query: { id: movieID } })
            },
            viewMail() {
                this.$router.push("/message")
            },
            viewUser() {
                this.userDrawerVisible = true
            },
            updateUser(e) {
                e.preventDefault();
                this.updateUserForm.validateFields((err, values) => {
                    if (!err) {
                        console.log(values)
                        var phone = values.update_phone
                        var email = values.update_email
                        var avatar_name = this.imageAvatar
                        var avatar_url = this.imageUrl

                        var url = this.host + "/users/update"
                        axios.put(url, {
                            headers: {
                                "Access-Control-Allow-Credentials": true,
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "POST",
                                "Access-Control-Allow-Headers": "Content-Type",
                            },
                            data: {
                                "username": sessionStorage.username,
                                "phone": phone,
                                "email": email,
                                "avatar_name": avatar_name,
                                "avatar_url": avatar_url
                            }
                        })
                            .then(response => {
                                console.log(response.data)
                                this.userDrawerVisible = false
                                window.location.replace('/home')
                            })
                    }
                })
            },
            handleChange(info) {
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    getBase64(info.file.originFileObj, imageUrl => {
                        this.imageUrl = imageUrl
                        this.imageAvatar = info.file.originFileObj.name
                        console.log(this.imageUrl)
                        this.loading = false;
                    });
                }
            },
            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!');
                }
                return isJpgOrPng && isLt2M;
            },
            likeit(movie_id) {
                var icon = document.getElementById("likeicon" + movie_id)
                var elem = document.getElementById("like_count" + movie_id)

                var url = this.host + "/movies/likeit"
                var headers = {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Headers": "Content-Type",
                }


                if (icon.style.color == "black") {

                    axios.post(url, {
                        headers: headers,
                        data: {
                            "id": movie_id,
                            "cal": "add"
                        },
                    })
                        .then(response => {
                            console.log(response.data)
                            elem.innerText = parseInt(elem.innerText) + 1
                            icon.style.color = "orange"
                        })
                        .catch(response => {
                            console.log(response.data)
                        })
                } else {

                    axios.post(url, {
                        headers: headers,
                        data: {
                            "id": movie_id,
                            "cal": "dec"
                        },
                    })
                        .then(response => {
                            console.log(response.data)
                            elem.innerText = parseInt(elem.innerText) - 1
                            icon.style.color = "black"
                        })
                        .catch(response => {
                            console.log(response.data)
                        })
                }


            },

            onUserClose() {
                this.userDrawerVisible = false
            }
        },
    };
</script>