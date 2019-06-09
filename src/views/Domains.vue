<template>
  <div class="domains">
    <Breadcrumb>
      <BreadcrumbItem to="/">Domains</BreadcrumbItem>
    </Breadcrumb>
    <br />
    <div>
      <Card style="width:300px">
        <p slot="title">
          <Icon type="md-link"></Icon>
          Add Domain
        </p>
        <div style="text-align: center" @click="show_add_domain = true">
          <br />
          <Icon type="md-add" size="35"></Icon>
        </div>
      </Card>
      <Card style="width:300px" v-for="domain in domains" v-bind:key="domain.id">
        <p slot="title">
          <Icon type="md-link"></Icon>
          {{ domain.domain }}
          <router-link style="float:right" tag="a" :to="{ name: 'domaindetail', params: { id: domain.id } }">
          View
        </router-link>
        </p>
        <ul>
          <li v-for="value, key in domain.environments" style="list-style: none">
            <a :href="value" target="_blank">{{ key }}</a>
          </li>
        </ul>
      </Card>
      <Modal
        v-model="show_add_domain"
        title="Add Domain"
        okText="OK"
        cancelText="Cancel">
        <p>After you click ok, the dialog box will close in 2 seconds.</p>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "domains",
  data() {
    return {
      show_add_domain: false,
      domains: [
        {
          id: 1,
          domain: "https://api.inmail.inmar.in",
          environments: {
            test: "http://api.inmailtest.inmar.in",
            dev: "http://api.inmaildev.inmar.in",
            default: "https://api.inmail.inmar.in",
            qa: "https://api.inmail.inmar.in",
            qa1: "https://api.inmail.inmar.in",
            qa2: "https://api.inmail.inmar.in",
            qa3: "https://api.inmail.inmar.in",
            qa4: "https://api.inmail.inmar.in"
          }
        },
        {
          id: 2,
          domain: "https://api.superstudy.inmar.in",
          environments: {
            qa: "http://api.superstudytest.inmar.in",
            preprod: "http://api.superstudydev.inmar.in",
            default: "https://api.superstudy.inmar.in"
          }
        }
      ]
    };
  }
};
</script>
<style>
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
