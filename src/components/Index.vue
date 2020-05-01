<template>
    <div class="index">
        <a-layout id="components-layout">
            <header class="header"
                style="width: 100%; background: white; box-shadow: 0 3px 7px rgba(117, 115, 115, 0.1);">
                <a-row>
                    <div style="width: 20%;float: left;margin-left:13%;padding-top:1%;">
                        <img src="../assets/images/brand.svg" style="width: 60%;" /> </div>
                    <div style="width: 30%; float: left; padding-top:1%; margin-left:0.5%">
                        <template>
                            <div class="certain-category-search-wrapper" style="width: 100%;">
                                <a-auto-complete class="certain-category-search"
                                    dropdownClassName="certain-category-search-dropdown"
                                    :dropdownMatchSelectWidth="false" :dropdownStyle="{width: '300px'}" size="large"
                                    style="width: 100%" placeholder="input here" optionLabelProp="value">
                                    <template slot="dataSource">
                                        <a-select-opt-group v-for="group in dataSource" :key="group.title">
                                            <span slot="label">
                                                TITLE
                                                <a style="float: right" href="https://www.google.com/search?q=antd"
                                                    target="_blank" rel="noopener noreferrer">更多
                                                </a>
                                            </span>
                                            <a-select-option>
                                                TITLE
                                                <span class="certain-search-item-count"> 人 关注</span>
                                            </a-select-option>
                                        </a-select-opt-group>
                                        <a-select-option disabled key="all" class="show-all">
                                            <a href="https://www.google.com/search?q=antd" target="_blank"
                                                rel="noopener noreferrer">
                                                查看所有结果
                                            </a>
                                        </a-select-option>
                                    </template>
                                    <a-input>
                                        <a-icon slot="suffix" type="search" class="certain-category-icon" />
                                    </a-input>
                                </a-auto-complete>
                            </div>
                        </template>

                    </div>
                    <a-menu theme="light" mode="horizontal" :defaultSelectedKeys="['1']"
                        style="line-height: 63px; width: 20%; text-align: right; float: right; margin-right: 15%">
                        <!-- <a>hello</a> -->
                        <a-menu-item>
                            <a-icon type="edit" />写影评
                        </a-menu-item>

                        <a-sub-menu>
                            <span slot="title" class="submenu-title-wrapper">
                                <a-icon type="bell" />信息</span>
                            <a-menu-item key="setting:1">
                                <a-icon type="idcard" />我的主页</a-menu-item>
                            <a-menu-item key="setting:2">
                                <a-icon type="edit" />我的影评</a-menu-item>
                        </a-sub-menu>

                        <a-sub-menu style="margin-right: 17%">
                            <span slot="title" class="submenu-title-wrapper">
                                <a-avatar :size="44" :src="current_user.avatar" /></span>
                            <a-menu-item-group title="个人信息">
                                <a-menu-item key="setting:1" @click="viewUser">
                                    <a-icon type="idcard" />我的主页</a-menu-item>
                                <a-menu-item key="setting:2">
                                    <a-icon type="edit" />我的影评</a-menu-item>
                                <a-menu-item key="setting:3">
                                    <a-icon type="mail" />我的信息</a-menu-item>
                            </a-menu-item-group>
                            <a-menu-item-group title="其它">
                                <a-menu-item key="login" @click="login">
                                    <a-icon type="export" />登录</a-menu-item>
                                <a-menu-item key="setting:4" style="color: red;">
                                    <a-icon type="export" />退出</a-menu-item>
                            </a-menu-item-group>
                        </a-sub-menu>
                    </a-menu>
                </a-row>

            </header>

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
                                <a-menu-item key="sub1">关注1</a-menu-item>
                                <a-menu-item key="sub2">关注2</a-menu-item>
                            </a-menu-item-group>

                            <a-menu-item-group>
                                <template slot="title">
                                    <span style="color: #1890FF">分类</span>
                                </template>
                                <a-menu-item key="all" @click="getMovies()">全部
                                </a-menu-item>
                                <a-menu-item v-for="category in categories" :key="category.id"
                                    @click="getMovieByType(category.name)">{{ category.name }}
                                </a-menu-item>
                            </a-menu-item-group>

                        </a-menu>
                    </a-col>
                    <a-col :span="12">
                        <a-carousel autoplay style="margin-bottom: 2%;">
                            <div>
                                <img src="../assets/images/img1.jpg" style="width: 100%">
                            </div>
                            <div>
                                <img src="../assets/images/img2.jpg" style="width: 100%">
                            </div>

                        </a-carousel>
                        <a-list itemLayout="vertical" size="large">
                            <a-list-item v-for="movie in movie_list" :key="movie.title">
                                <img :src="movie.post" slot="extra" width="150" height="200" />
                                <a-list-item-meta :description="item">
                                    <a slot="title" style="float:left; font-size: large;"
                                        @click="viewMovie(movie)">{{ movie.name }}</a>
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
                                        <span style="margin-left: 16px;">
                                            <a-icon type="message" style="margin-right: 4px; margin-top: 10%"
                                                @click="likeit()" />
                                            {{ movie.comment_count }}
                                        </span>
                                    </a-row>

                                </template>
                            </a-list-item>
                        </a-list>
                    </a-col>
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

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    export default {
        name: 'Index',
        data() {
            return {
                current_user: '',
                movie_list: '',
                categories: '',
                userDrawerVisible: false, // 用户信息drawer展示
                updateUserForm: this.$form.createForm(this, { name: 'coordinated' }),
                imageAvatar: '',
                imageUrl: '',
                host: 'http://127.0.0.1:8000',
            };
        },
        mounted() {
            this.getCurrentUser()
            this.getMovies()
            this.getMovieTypes()
        },
        methods: {

            getCurrentUser() {
                var url = this.host + "/users?username=" + sessionStorage.username
                axios.get(url)
                    .then(response => {
                        this.current_user = response.data[0]
                        this.imageUrl = this.current_user.avatar
                        console.log(this.current_user)
                    })

            },
            getMovies() {
                var url = this.host + "/movies"
                axios.get(url)
                    .then(response => {
                        this.movie_list = response.data
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
            viewMovie(movie) {
                this.$router.push({ path: "/view", query: { movie: movie } })
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