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
</style>
<template>
  <div class="layout">
    <router-view />
  </div>
</template>
<script>
export default {
  
};
</script>
