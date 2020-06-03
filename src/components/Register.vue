<template>
    <div id="login" :style="{'height': '100%'}">
        <a-col :span="24">
            <div style="width: 30%; margin-left: 35%; margin-top: 10%;">
                <a-card size=" large" :bordered="true" style="box-shadow: 30px 30px 30px rgba(12, 12, 12, 0.1);">
                    <h1>注 册</h1>
                    <a-divider />
                    <a-form id="components-form-demo-normal-login" :form="form" class="register-form"
                        @submit="handleSubmit">
                        <a-form-item>
                            <a-input id="username-input" style="margin-top: 5%; height: 40px;" v-decorator="['username',
                            { rules: [{ required: true, message: 'Please input your username!' }] },
                            ]" placeholder="Username">
                                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input id="phone-input" style="height: 40px;" v-decorator="['phone']" type="phone"
                                placeholder="Phone">
                                <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input id="email-input" style="height: 40px;" v-decorator="['email']" type="email"
                                placeholder="Email">
                                <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input id="password-input" style="height: 40px;" v-decorator="['password',
                            { rules: [{ required: true, message: 'Please input your Password!'}] },
                            ]" type="password" placeholder="Password">
                                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input id="password-confirm-input" style="height: 40px;" v-decorator="['password_confirm',
                            { rules: [{ required: true, message: '请确认密码' }] },
                            ]" type="password" placeholder="Confirm Password">
                                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                                注册
                            </a-button>
                        </a-form-item>
                    </a-form>
                </a-card>
            </div>
        </a-col>
        <div>
            <a-modal title="错误提示" v-model="visible" @ok="handleOk">
                <p>请输入相同的密码</p>
            </a-modal>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Register',
        data() {
            return {
                username: '',
                password: '',
                host: '/api/',
                visible: false,
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_register' });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log(values)
                        var username = values.username
                        var phone = values.phone
                        var email = values.email
                        var password = values.password
                        var confirmPass = values.password_confirm
                        if (password != confirmPass) {
                            this.visible = true
                            return
                        }
                        var url = this.host + "users/register"
                        axios.post(url, {
                            headers: {
                                "Access-Control-Allow-Credentials": true,
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "POST",
                                "Access-Control-Allow-Headers": "Content-Type",
                            },
                            data: {
                                "username": username,
                                "phone": phone,
                                "email": email,
                                "password": password,
                            }
                        })
                            .then(response => {
                                console.log(response.data)
                                this.$router.push({ "path": '/' })
                            })
                            .catch(response => {
                                console.log(response.data)
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

    #components-form-demo-normal-login .register-form-forgot {
        float: right;
    }

    #components-form-demo-normal-login .register-form-button {
        width: 100%;
    }
</style>