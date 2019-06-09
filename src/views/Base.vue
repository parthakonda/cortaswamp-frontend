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
.layout-nav {
  width: 620px;
  margin: 0 auto;
}
.user-nav {
  float: right;
  color: white;
}

.ivu-card {
  display: inline-block;
  margin-right: 20px;
  max-height: 200px;
  float: left;
  min-height: 200px;
}
.ivu-card-body {
	max-height: 140px;
	overflow: auto;
}
i.ivu-icon.ic-size {
	font-size: 20px;
}
.ivu-card {
  display: inline-block;
  margin-right: 20px;
  max-height: 200px;
  float: left;
  min-height: 200px;
}
.ivu-card-body {
	max-height: 140px;
	overflow: auto;
}
i.ivu-icon.ic-size {
	font-size: 20px;
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
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              <router-link :to="{ name: 'dashboard'}">
                <span style="color: white">Dashboard</span>
              </router-link>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              <router-link :to="{ name: 'domains'}">
                <span style="color: white">Domains</span>
              </router-link>
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              <router-link :to="{ name: 'dataextensions'}">
                <span style="color: white">Data Extensions</span>
              </router-link>
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              <router-link :to="{ name: 'infraprofiles'}">
                <span style="color: white">Infra Profiles</span>
              </router-link>
            </MenuItem>
          </div>
          <div class="user-nav">
            <Dropdown>
              <a href="javascript:void(0)">
                <label style="color: white">&nbsp;Partha Saradhi Konda</label>
                <Icon type="ios-arrow-down" size="18" color="white"></Icon>
              </a>
              <DropdownMenu slot="list" style="width:200px">
                <DropdownItem>
                  <Icon type="ios-contact" size="24" color="#515a6e"></Icon>
                  Profile
                </DropdownItem>
                <DropdownItem>
                  <Icon type="ios-cog" size="24" color="#515a6e"></Icon>
                  Settings
                </DropdownItem>
                <DropdownItem divided>
                <span @click="logout">
                  <Icon type="ios-power" size="24" color="red"></Icon>
                  Logout
                  </span>
                </DropdownItem>
              </DropdownMenu>
          </Dropdown>
          </div>
        </Menu>
      </Header>
      <Layout>
        <br />
        <Layout :style="{padding: '0 50px 50px', 'min-height': '600px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$Message.error("Logging Out...");
      setTimeout(function() {
        localStorage.clear();
        window.location.href = "/signin/";
      }, 2000);
    }
  }
};
</script>
