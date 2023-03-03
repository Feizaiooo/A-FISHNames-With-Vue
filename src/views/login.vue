<template>
    <div class="w-full h-full fish-login">
        <el-card class="box-card shadow-2xl h-full w-full sm:h-auto sm:w-96">
            <div slot="header" class="clearfix flex flex-row justify-between items-center">
                <span class="text-4xl">登录</span>
                <div class="flex items-center">
                    <div id="tako-text" v-if="alertMsg">
                        <span :class="alertType == 'error' ? 'text-red-500' : 'text-green-500'">{{ alertMsg }} </span>
                    </div>

                    <img :src="tako" alt="login-logo" class="w-20 h-20 tako-animate" />
                </div>
            </div>
            <div>
                <el-form :disabled="disabled" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top"
                    label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name" @blur="whiteSpace()"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input :type="passwordShow" v-model="ruleForm.password" autocomplete="off" @blur="whiteSpace()">
                            <template slot="suffix">
                                <i class="iconfont icon-hide" v-if="passwordShow === 'password'" @click="passwordShow = 'text'"></i>
                                <i class="iconfont icon-browse" v-if="passwordShow === 'text'" @click="passwordShow = 'password'"></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="w-full mt-4" @click="submitForm('ruleForm')" :loading="loading">登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { cryptoUtils } from '@/utils/common'
import baseApi from '../api/base';
import { userUtils } from '../utils/auth'
export default {
    name: 'login',
    components: {},
    data() {
        return {
            ruleForm: {
                name: '',
                password: ''
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            passwordShow:'password',
            alertType: '',
            alertMsg: '',
            alertDcp: '',
            tako: require('@/assets/img/tako.png'),
            loading: false,
            disabled: false,
            redirectUrl: ''
        };
    },
    created() {
        this.redirectUrl = this.$route.query.redirectUrl || '/report'
    },
    methods: {
        /**
         * 表单校验
         */
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    return false;
                }
            });
        },
        /**
         * 登录
         */
        login() {
            this.loading = true;
            this.disabled = true;
            let data = {
                name: this.ruleForm.name.trim(),
                password: cryptoUtils.AESEncrypt(this.ruleForm.password),
            }
            baseApi.login(data).then(res => {
                if (res.data.resultCode === '01') {
                    this.alertType = 'success';
                    this.alertMsg = '登录成功';
                    userUtils.setUserLocal(res.data.resultData)
                    setTimeout(() => {
                        this.$router.push(this.redirectUrl)
                    }, 1000);
                } else {
                    this.alertType = 'error';
                    this.alertMsg = res.data.msg;
                }
                this.loading = false;
                this.disabled = false;
            }).catch(err => {
                this.alertType = 'error';
                this.alertMsg = '网络错误';
            })
        },
        /**
         * 去空格
         */
        whiteSpace() {
            this.ruleForm.name = this.ruleForm.name.trim();
            this.ruleForm.password = this.ruleForm.password.trim();
        }
    }
};
</script>
<style lang='scss' scoped>
.fish-login {
    background-color: $base-dark;
}

.clearfix:after {
    clear: both;
}

.box-card {
    width: 480px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.tako-animate {
    position: relative;
    animation: takoMove 1s linear 0.5s infinite;
    -webkit-animation: takoMove 1s linear 0.5s infinite;
}

@keyframes takoMove {
    0% {
        top: 0px;
    }

    25% {
        top: -5px;
    }

    50% {
        top: 0px;
    }

    75% {
        top: 5px;
    }

    100% {
        top: 0px;
    }
}

#tako-text {
    text-align: center;
    line-height: 46px;
    padding: 0px 10px;
    position: relative;
    height: 56px;
    border-radius: 8px;
    border: 2px solid #000;
    margin-right: 20px;
}

#tako-text:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    top: 6px;
    right: -12px;
    border-left: 10px solid #000;
    border-top: 9px solid transparent;
    border-bottom: 6px solid transparent;
}

#tako-text:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    top: 6px;
    right: -7px;
    border-left: 10px solid #fff;
    border-top: 9px solid transparent;
    border-bottom: 6px solid transparent;
}
</style>