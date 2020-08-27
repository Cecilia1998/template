<template>
  <div>
    <Tree :data="treenodes" :render="renderContent" @on-contextmenu="handleContextMenu" class="ivu-tree">
      <template slot="contextMenu">
        <DropdownItem @click.native="rename">重命名</DropdownItem>
        <DropdownItem v-show="contextData==null||!contextData.file" @click.native="addlist">新建文件夹</DropdownItem>
        <Upload ref="upload"
                v-show="contextData==null||!contextData.file"
                :before-upload="handleUpload"
                action="//jsonplaceholder.typicode.com/posts/">
          <DropdownItem >上传文件</DropdownItem>
        </Upload>
        <DropdownItem v-show="contextData==null||contextData.file" @click.native="catabout">查看详情</DropdownItem>
        <DropdownItem v-show="contextData==null||contextData.file" @click.native="downFile">下载文件</DropdownItem>
        <!-- <DropdownItem @click.native="deletefile" style="color: #ed4014">删除</DropdownItem> -->
      </template>
    </Tree>

  </div>
</template>

<script>


  export default {
    name: "FileSystem",

    data() {
      return {
        treenodes: [],
        contextData: null,
        name: null
      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        await this.$axios.get("/document/files").then(res => this.treenodes = res.data).catch(ex => console.log(ex))
      },

      renderContent(h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: data.file ? 'md-document' : 'md-folder'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]);
      },


      downFile() {
        window.location.href = globalconf.axios.baseURL + `/document/file?path=${this.contextData.value}`
      },
      rename() {
        this.name = this.contextData.title
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.name,
                autofocus: true,
                placeholder: 'Please enter your name...'
              },
              on: {
                input: (val) => {
                  this.name = val;
                }
              }
            })
          },
          onOk: () => {
            let newpath = this.contextData.value.substr(0, this.contextData.value.lastIndexOf('/') + 1) + this.name;
            this.$axios.put(`/document/file?path=${this.contextData.value}&newpath=${newpath}`).then(() => this.contextData.title = this.name);
          },
        })
      },

      addlist() {
        this.name = "";
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.name,
                autofocus: true,
                placeholder: '请输入文件名'
              },
              on: {
                input: (val) => {
                  this.name = val;
                }
              }
            })
          },
          onOk: () => {
            this.$axios.post(`/document/list?path=${this.contextData.value}&title=${this.name}`).then(() =>
              this.contextData.children.push({
                title: this.name,
                value: this.contextData.value + '/' + this.name,
                contextmenu: true,
                file: false
              })
            );
          },
        })
      },

      addfile() {
       // this.$refs.upload.
      },

      catabout() {
        this.$Modal.success({
          title: "文件详情",
          content: this.contextData.parentVal.split('#').reduce((p,n)=>p+"<br/>"+n)
        });
      },

      deletefile() {
        this.$Modal.confirm({
          title: '删除确认',
          content: '<p>确认删除？</p>',
          onOk: () => {
            this.$axios.delete(`/document/file?path=${this.contextData.value}`).then(() => {
                this.treenodes=this.deletefile1(this.treenodes, this.contextData.value)

              }
            )
          },
          onCancel: () => {
          }
        });
      },

      handleContextMenu(data) {
        this.contextData = data;
      },

      deletefile1(data, value) {
        data = data.filter(item => item.value !== value)
        data.forEach(item=>{
          if (item.children!==null&&item.children.length>0) {
            item.children=this.deletefile1(item.children, value)
          }
        })
        return data;
      },

      handleUpload(file) {
        const filename =this.contextData.children===null?undefined: this.contextData.children.find(item => item.title === file.name);
        if (filename !== undefined) {
          this.$Modal.confirm({
            title: '确认',
            content: '<p>已存在同名文件是否覆盖？</p>',
            onOk: () => {
              const formData = new FormData();
              formData.append('file', file);
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              };
              this.$axios.post(`/document/file?path=${this.contextData.value}`, formData, config)
                .then(() => {
                })
            },
            onCancel: () => {
              return false
            }
          });
        }else{
          const formData = new FormData();
          formData.append('file', file);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: 1000*60*60*12
          };
          this.$axios.post(`/document/file?path=${this.contextData.value}`, formData, config)
            .then(() => {

                this.contextData.children.push({
                  title: file.name,
                  value: this.contextData.value + '/' + file.name,
                  contextmenu: true,
                  parentVal:"请刷新后再查看！",
                  file: true
                })

            })
        }

        return false;
      }
    }

  }
</script>

<style scoped>

  .ivu-tree {
    width: 100%;
    text-align: left;
  }
</style>

