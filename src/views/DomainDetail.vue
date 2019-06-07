<template>
  <div class="domains">
    <Breadcrumb>
      <BreadcrumbItem to="/domains">Domains</BreadcrumbItem>
      <BreadcrumbItem :to="$route.params.id">Domain Detail</BreadcrumbItem>
    </Breadcrumb>
    <br />
    <div>
      <div style="height: 24px">
        <Button size="small" icon="ios-add-circle" type="warning" style="float:right">
          Import From Postman Collection
        </Button>
      </div>
      <Tabs>
        <TabPane label="Requests" icon="ios-send">
          <Row :gutter="16">
            <Col span="6" style="border-right: 1px solid #e8e8e8; min-height: 500px;max-height: 500px;overflow-y: auto;">
              <div style="text-align: right;">
                <Button size="small" @click="addFolderModal=true" type="success" :disabled="editingItem === null || editingItem.type != 'folder'" style="margin-right:5px">
                  <Icon type="ios-add-circle-outline" />
                  Folder
                </Button>
                <Button size="small" @click="addRequest" type="warning" :disabled="editingItem === null || editingItem.type != 'folder'" style="margin-right:5px">
                  <Icon type="ios-add-circle-outline" />
                  Request
                </Button>
                <Button size="small" @click="removeItemModal = true" type="error" :disabled="editingItem === null || editingItem.id == 1">
                  <Icon type="ios-trash-outline" />
                  Remove
                </Button>
              </div>
              <div style="margin-top: 10px;">
                <v-jstree :data="data" whole-row @item-click="itemClick" :draggable=draggable></v-jstree>
              </div>
            </Col>
            <Col span="18">
              <div v-if="editingItem !== null && editingItem.type == 'file'">
                <Tabs type="card" @on-tab-remove="handleTabRemove">
                  <TabPane label="Request" style="min-height: 500px;max-height: 500px;overflow-y: auto;">
                    <Row :gutter="16">
                      <Col span="6">
                        <label>
                          Label
                        </label>
                        <br />
                        <Input v-model="editingItem.text" placeholder="Enter something..." style="width: 100%" />
                      </Col>
                      <Col span="18">
                        <label>
                          Description
                        </label>
                        <br />
                        <Input v-model="editingItem.data.decsription" placeholder="Enter something..." style="width: 100%" />
                      </Col>
                    </Row>
                    <br />
                    <Row :gutter="6">
                      <Col span="4">
                        <label>
                          METHOD
                        </label>
                        <Select v-model="editingItem.data.method">
                          <Option v-for="item in methodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Col>
                      <Col span="20">
                        <label>
                            URL
                        </label>
                        <Input placeholder="url here" v-model="editingItem.data.url">
                          <Select v-model="editingItem.data.urlProtocol" slot="prepend" style="width: 80px">
                            <Option value="http">http://</Option>
                            <Option value="https">https://</Option>
                          </Select>
                        </Input>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="Run" icon="ios-play">
          <Button type="primary" icon="ios-send" style="float:right;" @click="runModal=true">Run</Button>
          <br />
          <br />
          <Table :columns="columns8" :data="data7" size="small" ref="table"></Table>
        </TabPane>
      </Tabs>


      <!--  Modals -->
      <!-- Remove Item Modal -->
        <Modal v-model="removeItemModal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>Delete confirmation</span>
          </p>
          <div style="text-align:center">
            <p>
              After this task is deleted, the downstream 10 tasks will not be implemented.
            </p>
            <p>Will you delete it?</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long @click="removeItem">Delete</Button>
          </div>
      </Modal>
    <!-- Remove Item Modal END -->

    <!-- Add folder Modal -->
    <Modal
      v-model="addFolderModal"
      title="Add Folder"
      ok-text="Add"
      cancel-text="Cancel"
      @on-ok="addFolder">
      <Input v-model="folderName" placeholder="Enter something..." style="width: 300px" />
    </Modal>
    <!-- Add folder Modal END -->

    <!-- Run Modal -->
    <Modal
      v-model="runModal"
      title="Run"
      ok-text="Run"
      cancel-text="Cancel"
      @on-ok="addFolder">
      <Input placeholder="Enter something..." style="width: 300px" />
    </Modal>
    <!-- Run Modal END -->
    </div>
  </div>
</template>

<script>
import VJstree from "vue-jstree"
export default {
  name: "domaindetail",
  components: {
    VJstree
  },
  data() {
    return {
      folderName: null,
      draggable: true,
      editingItem: null,
      editingNode: null,
      removeItemModal: false,
      addFolderModal: false,
      runModal: false,
      methodList: [
        {
          label: 'GET',
          value: 'GET'
        },
        {
          label: 'POST',
          value: 'POST'
        },
        {
          label: 'PUT',
          value: 'PUT'
        }
      ],
      selectedRequest: {
        method: 'GET',
        url: '',
        urlProtocol: 'http'
      },
      data: [
        {
          id: 1,
          text: "https://api.inmail.inmar.in",
          value: "And wholerow selection",
          icon: "ivu-icon ivu-icon-ios-folder-open-outline ic-size",
          type: "folder",
          disabled: false,
          loading: false,
          size: "40px",
          root: true
        }
      ],
      columns8: [
        {
            "title": "Name",
            "key": "name",
            "fixed": "left",
            "width": 200
        },
        {
            "title": "Show",
            "key": "show",
            "width": 150,
            "sortable": true,
            filters: [
            {
                    label: 'Greater than 4000',
                    value: 1
                },
                {
                    label: 'Less than 4000',
                    value: 2
                }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.show > 4000;
                } else if (value === 2) {
                    return row.show < 4000;
                }
            }
          },
        ],
            data7: [
              {
                "name": "Name1",
                "fav": 0,
                "show": 7302,
                "weak": 5627,
                "signin": 1563,
                "click": 4254,
                "active": 1438,
                "day7": 274,
                "day30": 285,
                "tomorrow": 1727,
                "day": 558,
                "week": 4440,
                "month": 5610
              }
            ]
    };
  },
  methods: {
    itemClick(node) {
      console.log(node.model.text + ' clicked !');
      console.log(node.model.type + ' type !');
      this.editingNode = node;
      this.editingItem = node.model;
    },
    addFolder() {
      this.editingItem.addChild({
        id: 2,
        text: this.folderName,
        value: this.folderName,
        icon: "ivu-icon ivu-icon-ios-folder-open-outline",
        type: "folder",
        disabled: false,
        loading: false,
        root: false
      });
      this.folderName = '';
    },
    addRequest() {
      this.editingItem.addChild({
        id: 2,
        text: "Request - Name",
        value: "And wholerow selection",
        icon: "ivu-icon ivu-icon-ios-send",
        data: {
          decription: '',
          method: 'GET',
          urlProtocol: 'http',
          url: ''
        },
        type: "file",
        disabled: false,
        loading: false,
        size: "40px",
        root: false
      });
    },
    removeItem() {
      if (this.editingItem.id !== undefined) {
        var index = this.editingNode.parentItem.indexOf(this.editingItem)
        this.editingNode.parentItem.splice(index, 1)
      }
      this.removeItemModal = false;
    },
    handleTabRemove (name) {
      this['tab' + name] = false;
    }
  }
}
</script>