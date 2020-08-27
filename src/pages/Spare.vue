<template lang="html">
  <div class="">
    <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px" v-model='datapicker' @on-change='Onchange'></DatePicker>
  </div>
</template>
<script>
    export default {

    }
</script>


  </div>
</template>

<script>
import axios from 'axios'
import {router} from '../router'
// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
        datapicker:''
    }
  },
  created(){
    // console.log(sessionStorage)
  },
  computed:{

  },
  methods:{
    onSelect(name){
      this.$router.push(name)
      // axios.post('aaa.com',{a:'1'})
      // .then((a) => {
      //   console.log(a)
      // })
      // .catch((b) => {
      //   console.log(b)
      // })
      console.log(router)
    },
    Onchange(){
      console.log(+this.datapicker)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
