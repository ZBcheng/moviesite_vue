<template>
    <div id="send_message">
        <div id="messageForm" style="width: 50%; margin-left: 25%; margin-bottom: 10%;">
            <a-form :form="messageForm" @submit="sendMessage">
                <a-row>
                    <a-form-item>
                        <a-col :span="11">
                            <p style="float:left; font-size: 16px">收件人</p>
                            <a-select v-decorator="['receiver', {rules: [{ required: true, message: '请选择收件人' }]}]"
                                mode="multiple" style="width: 100%" placeholder="receiver">
                                <a-select-option v-for="user in userList" :key="user.username">
                                    <a-row>
                                        <a-col :span="12">
                                            <a-avatar :size="25" :src="user.avatar" />
                                        </a-col>
                                        <a-col :span="12">
                                            <p style="float: left">{{ user.username }}</p>
                                        </a-col>
                                    </a-row>
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="11" style="float:right">
                            <p style="float:left; font-size: 16px">关联漏洞</p>
                            <a-select v-decorator="['linked_cve']" mode="multiple" style="width: 100%"
                                placeholder="linked cve">
                                <a-select-option v-for="vuln in vulnList" :key="vuln.cve_id">{{ vuln.cve_id }}
                                </a-select-option>
                            </a-select>
                        </a-col>

                    </a-form-item>

                    <a-form-item>
                        <p style="float:left; font-size: 16px">标题</p>
                        <a-input v-decorator="['title', {rules: [{ required: true, message: '请填写标题' }]}]"
                            placeholder="message title" />
                    </a-form-item>
                    <a-form-item>
                        <p style="float:left; font-size: 16px">内容</p>
                        <a-textarea v-decorator="['content', {rules: [{ required: true, message: '请填写内容' }]}]"
                            style="min-height: 100px; overflow: visible" placeholder="message content" />
                    </a-form-item>
                </a-row>

                <a-form-item>
                    <a-button type="primary" html-type="submit" style="width: 100%;">
                        发送
                    </a-button>
                </a-form-item>
            </a-form>

        </div>
        <div id="info" style="margin-top: 5%; margin-bottom: 10%;" hidden>
            <a-row>
                <a-col :span="24">
                    <h1>{{ message_title }}</h1>
                </a-col>
                <a-col :span="24" style="margin-bottom: 2%;">
                    <h3 style="color: gray">{{ message_content }}</h3>
                </a-col>
                <a-col :span="24">
                    <a-button type="primary" @click="viewForm">确定</a-button>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    var selected_user = {
        "username": ""
    }
    import axios from 'axios'
    export default {
        data() {
            return {
                userList: null,
                vulnList: null,
                value: "",
                selected_user,
                selected_vuln: [],
                host: "http://127.0.0.1:8000/",
                message_title: "",
                message_content: "",
            }
        },
        mounted() {
            this.getUserList()
            this.getVulnList()
        },
        beforeCreate() {
            this.messageForm = this.$form.createForm(this, { name: 'message_form' });
        },
        methods: {
            getUserList() {
                var url = this.host + "users"
                axios.get(url)
                    .then(response => {
                        this.userList = response.data
                        console.log(this.userList)
                    })
            },
            getVulnList() {
                var url = this.host + "vulns"
                axios.get(url)
                    .then(response => {
                        this.vulnList = response.data
                    })
            },
            sendMessage(e) {
                e.preventDefault();
                this.messageForm.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        var linked_cve = values.linked_cve
                        var receiver_name = values.receiver
                        var message_title = values.title
                        var message_content = values.content
                        var url = this.host + "messages/"
                        axios.post(url, {
                            headers: {
                                "Access-Control-Allow-Credentials": true,
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "POST",
                                "Access-Control-Allow-Headers": "Content-Type",
                            },
                            data: {
                                "message_title": message_title,
                                "message_content": message_content,
                                "sender": sessionStorage.username,
                                "receiver": receiver_name,
                                "linked_cve": linked_cve
                            }
                        })
                            .then(response => {
                                console.log(response.data)
                                var title = "发送成功"
                                var content = message_title + "发送成功"
                                this.openNotificationWithIcon('success', title, content)
                                this.message_title = message_title
                                this.message_content = content
                                var message = document.getElementById("messageForm")
                                message.hidden = true
                                var info = document.getElementById("info")
                                info.hidden = false
                            })
                            .catch(response => {
                                console.log(response.data)
                                var title = "发送失败"
                                var content = message_title + "发送失败"
                                this.openNotificationWithIcon('error', title, content)
                                this.message_title = message_title
                                this.message_content = content
                                var message = document.getElementById("messageForm")
                                message.hidden = true
                                var info = document.getElementById("info")
                                info.hidden = false
                            })
                    }
                });
            },
            viewForm() {
                window.location.replace('/home')
            },
            openNotificationWithIcon(type, title, description) {
                const key = `open${Date.now()}`
                this.$notification[type]({
                    duration: 5,
                    message: title,
                    description: description,
                    style: {
                        width: '100%',
                    },
                    btn: h => {
                        return h(
                            'a-button',
                            {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                on: {
                                    click: () => this.$notification.close(key),
                                },
                            },
                            '确定',
                        );
                    },
                    key,
                    onClose: close,
                });
            },
        }
    }
</script>