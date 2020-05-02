<template>
    <div style="width:100%; height: 100%;">
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

        <div style="width: 70%; margin-top: 5%; margin-left: 15%; background-color: #fff;">
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
                    <SendMessageView />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                current_user: "",
                host: "http://localhost:8000"
            }

        },

        mounted() {
            this.getUser()
        },

        methods: {
            getUser() {
                var url = this.host + "/users?username=" + sessionStorage.username
                axios.get(url)
                    .then(response => {
                        this.current_user = response.data[0]
                    })
            },
            back2Index() {
                this.$router.push('/home')
            }
        }
    }
</script>