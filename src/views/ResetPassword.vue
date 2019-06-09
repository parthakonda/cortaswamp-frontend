<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  color: white;
  border-radius: 3px;
  float: left;
  position: relative;
  left: 20px;
}
.layout-logo h2 {
  font-family: 'Yellowtail', cursive;
  font-size: 35px;
  color: #7bf7c5;
}
</style>
<template>
  <div class="layout">
  <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <h2>CortaSwamp</h2>
          </div>
        </Menu>
        </Header>
    </Layout>
    <br />
    <br />
    <br />
    <br />
    <Layout :style="{padding: '0 50px 50px', 'min-height': '600px'}">
        <Content style="text-align:center">
            <div style="width:350px;background: #fff;padding: 20px;padding-bottom:10px;margin:auto;box-shadow: 0px 0px 2px #e3e3e3;">
                <h2>Reset Password</h2>
                <br />
                <div v-if="isChecking">
                    <h2>Checking...</h2>
                </div>
                <div v-if="!isChecking && !validLink">
                    <h3>Link Already Expired.</h3>
                    <br />
                    <router-link :to="{ name: 'signin'}" style="font-size: 20px;">
                        <span>SignIn</span>
                    </router-link>
                    <br />
                    <br />
                </div>
                <div v-if="!isChecking && validLink">
                    <Form v-if="!showPanel" ref="formInline" :model="formInline" :rules="ruleInline">
                        <FormItem prop="password">
                            <Input type="password" v-model="formInline.password" placeholder="Password">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="confirm_password">
                            <Input type="password" v-model="formInline.confirm_password" placeholder="Confirm Password">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button :disabled="isLoading" style="float:left;" type="primary" @click="handleSubmit('formInline')">
                                <span v-if="!isLoading">Reset Password</span>
                                <span v-if="isLoading">Resetting...</span>
                            </Button>
                        </FormItem>
                    </Form>
                    <div v-if="showPanel">
                        <Icon type="ios-checkmark-circle-outline" style="font-size:45px;color:green;"/>
                        <h2>Password has been successfully reset.</h2>
                        <br />
                        <router-link :to="{ name: 'signin'}" style="font-size: 20px;">
                            <span>SignIn</span>
                        </router-link>
                        <br />
                        <br />
                    </div>
                </div>
            </div>    
        </Content>
    </Layout>                         
  </div>
</template>
<script>
import router from '@/router';
import Services from "../services";
import VueRecaptcha from 'vue-recaptcha';

export default {
    name: 'login',
    components: { VueRecaptcha },
        data () {
            
            return {
                showPanel: false,
                isLoading: false,
                isChecking: false,
                validLink: false,
                formInline: {
                    password: '',
                    confirm_password: '',
                },
                ruleInline: {
                    password: [
                        { required: true, message: 'Please fill in the password', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'Please provide valid password', trigger: 'blur' }
                    ],
                    confirm_password: [
                        { required: true, message: 'Please fill in the password', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'Please provide valid password', trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            this.checkLink();
        },
        methods: {
            checkLink() {
                const that = this;
                that.isChecking = true;
                Services.checkPasswordLink(that.$route.params.id).then(
                    (data) => {
                        that.validLink = data.data.valid;
                        that.isChecking = false;
                    },
                    () => {
                        that.isChecking = false;
                        that.validLink = false;
                    },
                );
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.formInline.password != this.formInline.confirm_password) {
                            this.$Message.error('Password & Confirm Password not matched');
                            return;
                        }
                        const that = this;
                        this.isLoading = true;
                        let token = that.$route.params.id;
                        Services.resetPassword(token, that.formInline.password).then(
                            (success) => {
                                that.showPanel = true;
                                that.isLoading = false;
                            },
                            (error) => {
                                that.isLoading = false;
                                that.$Message.error('Something went wrong');
                            },
                        );
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>
