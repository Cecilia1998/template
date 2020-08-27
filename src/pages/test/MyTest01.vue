<template>
  <FormCreate ref="fc" v-model="fApi" :rule="rule"></FormCreate>
</template>

<script>
    export default {
        name: "MyTest01",
      data () {
        return {
          fApi:{
          },
          model: {},
          rule:[
          ],
          col:{
            span:5,
            labelWidth:150
          },

          option:{
            onSubmit:function (formData) {
              alert(JSON.stringify(formData));
            }
          }
        };
      },
      created () {
          this.$axios.get('/systemparam/componcent?pageseq=M-2-200508094811&areatype=0&lang=CN').then((res)=>{
            this.rule = res.data;
          })
      },
      mounted:function(){
        this.model = this.fApi.model();
        //console.log(this.fApi)

      },
      methods:{
           search(){
          // console.log(this.model)
          },

      }

    }
</script>

<style scoped>

</style>
