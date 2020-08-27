<template>
  <div class="department">
    <div class="flexStart">
      <!-- <Button type="primary" shape="circle" @click="addTopDepart">添加顶级部门</Button> -->
    </div>

    <div class="maintain">
      <Tree :data="departs" :render="renderContent"></Tree>
    </div>
    <FormModal :title="title" :formData="formData" :modal="modal" :submit="submit" :cancel="cancel" :okText="$t('actions.submit')" @close="(e)=>{this.modal =e}"></FormModal>
  </div>

</template>
<script>
  import FormModal from "../../components/FormModal"
  export default {
    name: "department",
    components: {
      FormModal
    },

    data() {
      return {
        deleteFlag: false,

        //部门数据
        departs: [],

        node:null,
        data:null,

        modal:false,
        title:"",
        formData: {
          model:{},
          rule: [{
            type: "input",
            field: "depart",
            value: "",
            title: "部门名称",
            props:{
              clearable:true,
              autofocus:true
            },
            validate:[
              {required:true,message:"部门名称不可为空",trigger:"change"}
            ]
          }],
          option:{
            form:{
              labelWidth:120
            },
            submitBtn:{
              show:false
            }
          }
        },
        temp:[] //暂存数组

      }
    },
    created() {
      this.getDeparts();
    },
    methods: {
      func(item){
        if(item.children == null || item.children.length==0){
          return item;
        }else{
          if(this.departs.some(it=>it.value == item.value)){
            item.expand = this.departs.filter(it=>it.value == item.value)[0].expand;
            return item;
          }else{
            return item;
          }
          for(let i of item.children){
            i = this.func(i)
          }
        }

      },
      getDeparts(){
        this.$axios.get("/dept/depts").then(res => {
          if (res.data) {
            this.temp = res.data;
            if(this.departs.length==0){
              this.departs = this.temp;
              return;
            }else{
              for(let i of this.temp){
                i = this.func(i)
              }

              this.departs = this.temp;
            }

          }
        }).catch(err => {
          console.log(err)
        })
      },

      // 判定是否可以删除
      deleteConfirm(root, node, data) {
        // 询问是否确定删除
        this.$root.mes('warn', "w-20200529123636").then(res => {
          if (res) {
            // 判断该部门名下是否还有员工
            this.$axios.get(`dept/deptpeoplecount?value=${data.value}`).then(re=>{
              console.log(re)
              if(re.data === 0){
                this.$axios.delete('/dept/dept', {
                  data: data
                }).then(r => {
                  // console.log("res:",res)
                  if (res) {
                    this.remove(root, node, data);
                    this.$root.mes("info","w-20200818100816") //提示部门删除成功
                    this.modal = false;
                    this.getDeparts();
                  }
                }).catch(err => {
                  console.log(e)
                })
              }else{
                this.$root.mes("error","w-20200528171430")
              }
            }).catch(e=>{
              console.log(e)
            })



          }
        }).catch(err => {
          console.log(err)
        })

      },
      // 添加顶级部门
      addTopDepart() {
        this.title = this.$t('actions.insertPattern',[this.$t('common.depart')])
        this.modal=true;
        this.submit = this.appendTop;
      },
      // 添加下级部门
      addSubDepart(root, node, data) {
        // this.append(title,root,node,data)
        this.modal = true;
        this.title = this.$t('actions.insertPattern',[this.$t('common.depart')])
        this.node = node;
        this.data = data;
        this.submit = this.append;
      },
      submit(){
        console.log("submit")
      },
      append() {
        if(this.formData.rule[0].value === ''){ //提示用户部门名称不可为空
          this.$root.mes("error","w-20200529143442").then(res=>{
          }).catch(err=>{
            console.log(err)
          })
        }else{
          console.log(this.data)
          this._axios("post","dept/dept",{sectorname:this.formData.rule[0].value,parentsid:this.data.value},data=>{
            if(data){
              this.$root.mes("info",'w-20200818100057') //提示新建部门成功
              this.modal = false;
              this.getDeparts();
            }

          })

        }
      },
      appendTop(){
        if(this.formData.rule[0].value == ''){ //提示用户部门名称不可为空
          this.$root.mes("error","w-20200529143442").then(res=>{
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.post("/dept/dept",
          {
            sectorname:this.formData.rule[0].value,
          }).then(res=>{
            // console.log(res)
            if(res.code === 0){
              var d = {
                value:res.data.sectorid,
                title:res.data.sectorname,
                expand:true,
                // levels:this.data.level+1
              }
              this.departs.push(d);
              this.$root.mes("info",'w-20200818100057') //提示新建部门成功
              this.getDeparts();

              this.modal = false;
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      remove(root, node, data) {
        const parentKey = data.parentVal;
        if (parentKey == '') {
          const index = root.indexOf(data)
          this.departs.splice(index, 1)
        } else {
          const parent = root.find(el => el.node.value === parentKey).node;
          const index = parent.children.indexOf(data);
          parent.children.splice(index, 1)
        }
      },
      // 点击取消后关闭模态框
      cancel() {
        this.modal = false;
      },
      updateDepart(root,node,data){
        this.node = node;
        this.data = data;
        this.formData.rule[0].value = data.title;
        this.title = this.$t('actions.updatePattern',[this.$t('common.depart')])
        this.modal = true;
        this.submit = this.update;
      },
      update(){
        if(this.formData.rule[0].value == ''){ //提示用户部门名称不可为空
          this.$root.mes("error","w-20200529143442").then(res=>{
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this._axios("put","dept/dept",{
            title:this.formData.rule[0].value,
            value:this.data.value
          },data=>{
            if(data){
              this.$root.mes("info","w-20200818100638") //部门信息更新成功
              this.modal = false;
              this.getDeparts();
            }
          })
          // this.$axios.put("/dept/dept",).then(res=>{
          //   console.log(res)
          //   if(res.data){
          //     this.data.title = this.formData.rule[0].value;
          //     this.modal = false;
          //   }else{
          //     this.$root.mes("error","w-20200529152943").then(res=>{
          //     }).catch(err=>{
          //       console.log(err)
          //     })
          //   }

          // })
        }
      },
      renderContent(h, {root, node, data }) {
        let actions=[
            h('Button', {
              props:{
                icon: 'ios-add',
                type: "primary",
                size: "small"
              },
              style: {
                marginRight: '8px',
              },
              on: {
                click: () => {
                  this.addSubDepart(root, node, data)
                }
              }
            }),
            h('Button', {
              props:{
                icon: 'md-create',
                type: "primary",
                size: "small"
              },
              style: {
                marginRight: '8px',
              },
              on: {
                click: () => {
                  this.updateDepart(root, node, data)
                }
              }
            }),
            h('Button', {
              props: {
                icon: 'ios-remove',
                type: "primary",
                size: "small",
              },
              on: {
                click: () => {
                  this.deleteConfirm(root, node, data)
                }
              }
            })
          ];
        let a = actions;
        if(node.node.parentVal==''){
          a.splice(2,1);
        }
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', {
            style: {
              display: "inline-block",
              minWidth: "250px"
            }
          }, [
            h('Icon', {
              props: {
                type: data.parentVal ? 'md-people' : "ios-people"
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              marginRight: '32px',
              marginLeft: "100px"
            }
          }, a)
        ]);
      },
    }

  }
</script>
<style lang="less">
  .department {
    text-align: left;

    .maintain {
      .ivu-tree ul {
        font-size: 12px;
        width: 400px;
      }
    }

  }
</style>
