<template>
    <div id="message_recv" style="overflow: visible;">
        <a-list class="demo-loadmore-list" :loading="loading" itemLayout="horizontal" :dataSource="messageList">
            <a-list-item slot="renderItem" slot-scope="message" :style="{ width: '90%', marginLeft: '5%'}">
                <a-list-item-meta>
                    <a slot="title" style="float:left; width: 100%; text-align: left; line-height: 30px;"
                        @click="viewMessage(message.message_id)">
                        {{ message.message_title }} (from: {{ message.sender.username }})
                    </a>
                    <p slot="description" style="float: left; width: 100%; text-align: left; overflow: hidden;
                    display: -webkit-box; -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical">{{ message.message_content }}</p>
                    <a-avatar @click="viewUser(message.sender.username)" slot="avatar" :size="55"
                        :src="message.sender.avatar" />

                </a-list-item-meta>
                <div style="width: 70%">
                    <a-col :span="12">
                        <a-tag
                            :color="message.message_status=='未读' ? 'volcano' : (message.message_status=='已读' ? 'blue' : 'green')"
                            :key="message.message_status">
                            {{ message.message_status }}
                        </a-tag>
                    </a-col>
                    <a-col :span="12">
                        <a-tag :color="'purple'" :key="message.send_time">
                            {{ message.send_time }}
                        </a-tag>
                    </a-col>
                </div>


            </a-list-item>
        </a-list>
        <a-drawer width="40%" placement="right" :closable="true" @close="onMessageClose"
            :visible="messageDrawerVisible">
            <h1>{{ selected_message.message_title }}</h1>
            <a-divider />

            <a-row :style="pStyle2">
                <description-item>
                    {{ selected_message.message_content }}
                </description-item>
            </a-row>
            <a-divider />

            <a-row :style="pStyle2">
                <a-row v-for="cve in selected_message.linked_cve" :key="cve.cve_id">
                    {{ cve.cve_id }}
                </a-row>
            </a-row>
        </a-drawer>

        <a-drawer width="40%" placement="right" :closable="true" @close="onUserClose" :visible="userDrawerVisible">
            <a-row style="margin-top:4%">
                <a-col :span=5>
                    <a-avatar :size="80" :src="selected_user.avatar" />
                </a-col>
                <a-col :span=12>
                    <p style="margin-top:3%; float: left; font-size: 40px; font-weight: bold;">
                        {{ selected_user.username }}</p>
                </a-col>
            </a-row>
            <a-divider />

            <a-row :style="pStyle2">

                <a-row>
                    <a-col :span="12">
                        <description-item>
                            <b :style="pStyle">手机</b> {{ selected_user.phone }}
                        </description-item>
                    </a-col>
                    <a-col :span="12">
                        <description-item>
                            <b :style="pStyle">邮件</b> {{ selected_user.email }}
                        </description-item>
                    </a-col>
                </a-row>


            </a-row>
            <a-divider />
        </a-drawer>
    </div>
</template>

<script>
    import axios from 'axios'
    const pStyle = {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        marginRight: '3%'
    }
    const pStyle2 = {
        marginBottom: '24px',
        lineHeight: '24px'
    }
    var selected_message = {
        "message_id": "",
    }
    var selected_user = {
        "username": "",
    }
    export default {
        data() {
            return {
                loading: true,
                loadingMore: true,
                messageDrawerVisible: false,
                userDrawerVisible: false,
                messageList: [],
                selected_message,
                selected_user,
                pStyle,
                pStyle2,
                host: "http://127.0.0.1:8000/"
            }
        },
        mounted() {
            this.getMessages()
        },
        methods: {
            getMessages() {
                var url = this.host + "messages/recv?username=" + sessionStorage.username
                axios.get(url)
                    .then(response => {
                        this.messageList = response.data
                        console.log(this.messageList)
                        this.loading = false
                    })
            },
            viewMessage(message_id) {
                var url = this.host + "messages/query"
                axios.put(url, {
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Allow-Headers": "Content-Type",
                    },
                    data: {
                        "message_id": message_id,
                    }
                })
                    .then(response => {
                        this.selected_message = response.data
                        this.messageDrawerVisible = true
                        this.getMessages()
                    })
            },
            viewUser(username) {
                var url = this.host + "users/query?username=" + username
                axios.get(url)
                    .then(response => {
                        this.selected_user = response.data[0]
                        console.log(this.selected_user)
                        if (this.selected_user.phone == null) {
                            this.selected_user.phone = "暂无"
                        }
                        if (this.selected_user.email == null) {
                            this.selected_user.email = "暂无"
                        }
                        this.userDrawerVisible = true
                    })
            },
            onMessageClose() {
                this.messageDrawerVisible = false
            },
            onUserClose() {
                this.userDrawerVisible = false
            },
            onLoadMore() {
                this.loadingMore = true
                this.getMessages(res => {
                    this.data = this.data.concat(res.results)
                    this.loadingMore = false
                    this.$nextTick(() => {
                        window.dispatchEvent(new Event('resize'))
                    });
                });
            },
        }
    }
</script>