<template>
    <div id="login"
        :style="{'height': '100%', 'backgroundColor': '#B5E5FA', 'backgroundImage': 'url(' + require('../assets/valley.png') + ')', 'backgroundSize': '100% 100%'}">
        <a-col :span="24">
            <div style="width: 30%; margin-left: 35%; margin-top: 10%;">
                <a-card size=" large" :bordered="true" style="box-shadow: 30px 30px 30px rgba(12, 12, 12, 0.1);">
                    <h1>Login</h1>
                    <a-divider />
                    <a-form id="components-form-demo-normal-login" :form="form" class="login-form"
                        @submit="handleSubmit">
                        <a-form-item>
                            <a-input style="margin-top: 5%; margin-bottom: 5%; height: 40px;" v-decorator="[
                            'userName',
                            { rules: [{ required: true, message: 'Please input your username!' }] },
                            ]" placeholder="Username">
                                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input style="height: 40px;" v-decorator="[
                            'password',
                            { rules: [{ required: true, message: 'Please input your Password!' }] },
                            ]" type="password" placeholder="Password">
                                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>

                            <a class="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <a-button type="primary" html-type="submit" class="login-form-button">
                                Log in
                            </a-button>
                            Or
                            <a href="">
                                register now!
                            </a>
                        </a-form-item>
                    </a-form>
                </a-card>
            </div>
        </a-col>

    </div>
</template>

<script>

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',

            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
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