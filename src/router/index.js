import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import mobile from '@/components/mobile/mobile'
import Ranking from '@/components/template/Ranking'
import PopMusic from '@/components/template/PopMusic'
import Single from '@/components/template/Single'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '*',
        redirect: '/'
    }, {
        path: '/',
        name: 'mobile',
        redirect: '/Ranking',
        component: mobile,
        children: [{
                path: 'Ranking',
                name: 'Ranking',
                component: Ranking,
                meta: { headShow: true, navShow: true, cname: '排行', font: '#ffffff', bgcolor: '#FF286B' }
            },
            {
                path: 'PopMusic',
                name: 'PopMusic',
                component: PopMusic,
                meta: { headShow: true, navShow: true, cname: '列表', left: 'back', right: 'more', font: '#ffffff', bgcolor: 'transparent' }
            },
            {
                path: 'Single',
                name: 'Single',
                component: Single,
                meta: { headShow: true, navShow: false, cname: '歌名', left: 'back', right: 'more', font: '#ffffff', bgcolor: '#FF286B' }
            }
        ]
    }]
})