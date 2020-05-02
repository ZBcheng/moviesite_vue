<template>
    <div id="login" :style="{'height': '100%'}">
        <a-col :span="24">
            <div style="width: 30%; margin-left: 35%; margin-top: 10%;">
                <a-card size=" large" :bordered="true" style="box-shadow: 30px 30px 30px rgba(12, 12, 12, 0.1);">
                    <h1>登 录</h1>
                    <a-divider />
                    <a-form id="components-form-demo-normal-login" :form="form" class="login-form"
                        @submit="handleSubmit">
                        <a-form-item>
                            <a-input id="username-input" style="margin-top: 5%; margin-bottom: 5%; height: 40px;"
                                v-decorator="[
                            'username',
                            { rules: [{ required: true, message: 'Please input your username!' }] },
                            ]" placeholder="Username">
                                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input id="password-input" style="height: 40px;" v-decorator="[
                            'password',
                            { rules: [{ required: true, message: 'Please input your Password!' }] },
                            ]" type="password" placeholder="Password">
                                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>

                            <a class="login-form-forgot" href="">
                                忘记密码
                            </a>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                                登录
                            </a-button>
                            或
                            <a @click="register">
                                注册用户
                            </a>
                        </a-form-item>
                    </a-form>
                </a-card>
            </div>
        </a-col>
        <div>
            <a-modal title="错误" v-model="visible" @ok="handleOk">
                <p>{{ infoContent }}</p>
            </a-modal>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                infoContent: '',
                host: 'http://127.0.0.1:8000/',
                visible: false,
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        methods: {
            register() {
                this.$router.push("/register")
            },
            handleSubmit(e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log(values)
                        var username = values.username
                        var password = values.password
                        var url = this.host + "users/login"
                        axios.post(url, {
                            headers: {
                                "Access-Control-Allow-Credentials": true,
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "POST",
                                "Access-Control-Allow-Headers": "Content-Type",
                            },
                            data: {
                                "username": username,
                                "password": password
                            }
                        })
                            .then(response => {
                                console.log(response.data)
                                if (response.data == "user does not exist") {
                                    this.infoContent = "用户不存在"
                                    this.visible = true
                                    return
                                }

                                if (response.data == "wrong password") {
                                    this.infoContent = "密码错误"
                                    this.visible = true
                                    return
                                }
                                sessionStorage.token = response.data.token;
                                sessionStorage.username = response.data.data.username;

                                this.$router.push({ "path": '/home' })
                            })
                            .catch(response => {
                                console.log(response.data)
                                this.visible = true
                            })
                    }
                });
            },
            handleOk(e) {
                console.log(e);
                this.visible = false
            },
        },
    };
</script>
<style>
    #login {
        margin-top: 0px;
        background-image: './assets/logo.png';
    }

    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }

    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>