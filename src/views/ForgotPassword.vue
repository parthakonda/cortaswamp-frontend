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
                <h2>Forgot Password</h2>
                <br />
                <Form v-if="!showPanel" ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="email">
                        <Input type="text" v-model="formInline.email" placeholder="Email">
                            <Icon type="ios-person" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button :disabled="isLoading" style="float:left;" type="primary" @click="handleSubmit('formInline')">
                            <span v-if="!isLoading">Send Password Reset Link</span>
                            <span v-if="isLoading">Sending...</span>
                        </Button>
                        <router-link :to="{ name: 'signin'}" style="float:right;" :disabled="isLoading">
                            <span>SignIn</span>
                        </router-link>
                    </FormItem>
                </Form>
                <div v-if="showPanel">
                    <Icon type="ios-checkmark-circle-outline" style="font-size:45px;color:green;"/>
                    <h2>Reset Password Link has been successfully sent.</h2>
                    <br />
                    <router-link :to="{ name: 'signin'}" style="font-size: 20px;">
                        <span>SignIn</span>
                    </router-link>
                    <br />
                    <br />
                </div>
            </div>    
        </Content>
    </Layout>                         
  </div>
</template>
<script>
import router from '@/router';
import Services from "../services";

export default {
    name: 'forgotpassword',
        data () {
            
            return {
                showPanel: false,
                isLoading: false,
                formInline: {
                    email: ''
                },
                ruleInline: {
                    email: [
                        { required: true, message: 'Please fill in the email', trigger: 'blur' },
                        { type: 'email', message: 'Please provide valid email address', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // Login
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const that = this;
                        this.isLoading = true;
                        Services.sendPasswordLink(that.formInline.email).then(
                            (success) => {
                                debugger;
                                that.isLoading = false;
                                that.showPanel = true;
                            },
                            (error) => {
                                that.isLoading = false;
                                that.showPanel = true;
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
