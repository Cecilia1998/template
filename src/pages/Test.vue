<template lang="html">
  <div class="">
    222222222222
  </div>
</template>
<script>
    export default {

    }
</script>




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
    }
  }
}
</script>

<style lang="css" scoped>
</style>
