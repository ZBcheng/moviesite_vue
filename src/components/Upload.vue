<template>
    <div id="register">
        <div style="height:30%; width: 30%; margin-left: 35%;">
            <a-upload-dragger name="file" :multiple="true" :customRequest="customRequest" @change="handleChange">
                <p class="ant-upload-drag-icon">
                    <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">Click or drag file to this area to upload</p>
                <p class="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </a-upload-dragger>

        </div>

        <a-button type="primary" @click="submitFile">submit</a-button>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                data: "",
                file: "",
                formData: null,
                host: "http://127.0.0.1:7000"
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        methods: {
            handleChange(info) {
                const status = info.file.status
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            customRequest(data) { // 上传提交
                const formData = new FormData()
                formData.append('file', data.file)
                this.formData = formData
                let progress = { percent: 1 }


                const intervalId = setInterval(() => {
                    if (progress.percent < 100) {
                        progress.percent += 10
                        data.onProgress(progress)
                    } else {
                        clearInterval(intervalId)
                    }
                }, 100)
            },
            submitFile() {
                var url = this.host + "/file/mpupload"
                axios.post(url, this.formData)
                    .then(response => {
                        console.log(response)
                    })
            },
        }
    }

</script>