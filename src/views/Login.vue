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
                <h2>SignIn</h2>
                <br />
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="Email">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <router-link :to="{ name: 'forgotpassword'}" style="float:left;" :disabled="isLoading">
                        <span>Forgot Password?</span>
                    </router-link>
                    <br />
                    <br />
                    <FormItem>
                        <Button :disabled="isLoading" style="float:left;" type="primary" @click="handleSubmit('formInline')">
                            <span v-if="!isLoading">Signin</span>
                            <span v-if="isLoading">Signing in...</span>
                        </Button>
                        <span style="float:right">
                        Don't have account?
                        <router-link :to="{ name: 'signup'}" style="float:right;" :disabled="isLoading">
                            <span>Create Account</span>
                        </router-link>
                        </span>
                    </FormItem>
                </Form>
            </div>    
        </Content>
    </Layout>                         
  </div>
</template>
<script>
import router from '@/router';
import Services from "../services";

export default {
    name: 'login',
        data () {
            
            return {
                isLoading: false,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the email', trigger: 'blur' },
                        { type: 'email', message: 'Please provide valid email address', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 4, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
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
                        Services.login(that.formInline.user, that.formInline.password).then(
                            (success) => {
                                Services.setToken(success.data.token);
                                router.push({ path: '/' }); // ?
                            },
                            (error) => {
                                that.isLoading = false;
                                that.$Message.error('Invalid Credentials');
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
