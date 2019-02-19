//Vue构建版本使用“import”命令加载
// The Vue build version to load with the `import` command
//(runtime-only or standalone) has been set in webpack.base.conf with an alias.
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
import store from './store/index'

//引入静态组件
require('./assets/css/base/reset.css')
require('./assets/css/base/variable.css')
require('./assets/css/base/public.css')
require('./assets/css/main/style.css')

import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);

//引入组件
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueResource)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})