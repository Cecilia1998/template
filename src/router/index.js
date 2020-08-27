import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router.js'

Vue.use(Router);

const RouterConfig = {
  routes: routers
};
export const router = new Router(RouterConfig);
router.beforeEach((to, from, next) => {
  let boo = false;
  let search = function (routers) {
    if (!routers) return;
    if (routers.find(item => item.path === to.path || item.menuAction === to.path)) return boo = true;
    routers.forEach(item => search(item.children))
  };
  search(routers);
  if (!boo) {
    let data = localStorage.getItem('routerList');
    if (data) search(JSON.parse(data));
  }
  let token = sessionStorage.getItem("token");

  if(to.path=="/login"){
   // console.log(1111111111111)
    next()
  }
 else if(boo&&token!=null){
    //console.log(2222222222222222)
    next()
  }else{
    if(token!=null){
    //  console.log(3333333333333)
      next('/home')
    }else{
    //  console.log(4444444444444)
      next('/login')
    }

  }
});
