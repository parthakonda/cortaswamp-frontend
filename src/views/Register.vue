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
                <h2>SingUp</h2>
                <br />
                <Form v-if="!showPanel" ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="first_name">
                        <Input type="text" v-model="formInline.first_name" placeholder="First Name">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="last_name">
                        <Input type="text" v-model="formInline.last_name" placeholder="Last Name">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>                    
                    <FormItem prop="email">
                        <Input type="text" v-model="formInline.email" placeholder="Email">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <br />
                    <FormItem>
                        <Button :disabled="isLoading" style="float:left;" type="primary" @click="handleSubmit('formInline')">
                            <span v-if="!isLoading">SingUp</span>
                            <span v-if="isLoading">Signing Up...</span>
                        </Button>
                        <span style="float:right">
                        Already have an account?
                       <router-link :to="{ name: 'signin'}" style="float:right;" :disabled="isLoading">
                            <span>SignIn</span>
                        </router-link>
                        </span>
                    </FormItem>
                </Form>
                <div v-if="showPanel">
                    <Icon type="ios-checkmark-circle-outline" style="font-size:45px;color:green;"/>
                    <h2>Please verify your email account</h2>
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
import VueRecaptcha from 'vue-recaptcha';

export default {
    name: 'login',
    components: { VueRecaptcha },
        data () {
            
            return {
                showPanel: false,
                isLoading: false,
                formInline: {
                    first_name: '',
                    last_name: '',
                    email: ''
                },
                ruleInline: {
                    email: [
                        { required: true, message: 'Please fill in the email', trigger: 'blur' },
                        { type: 'email', message: 'Please provide valid email address', trigger: 'blur' }
                    ],
                    first_name: [
                        { required: true, message: 'Please fill in the first name.', trigger: 'blur' },
                        { type: 'string', min: 4, message: 'The first name length cannot be less than 6 bits', trigger: 'blur' }
                    ],
                    last_name: [
                        { required: true, message: 'Please fill in the first name.', trigger: 'blur' },
                        { type: 'string', min: 4, message: 'The last name length cannot be less than 6 bits', trigger: 'blur' }
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
                        Services.signup(that.formInline).then(
                            (success) => {
                                that.isLoading = false;
                                this.showPanel = true;
                            },
                            (error) => {
                                that.isLoading = false;
                                if (error.response) {
                                    if (error.response.data) {
                                        console.log(error.response.data)
                                        that.$Message.error(error.response.data.email[0]);
                                    }
                                } else {
                                    that.$Message.error('Something went wrong, Please try again later.');
                                }
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
