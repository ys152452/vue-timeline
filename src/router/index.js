import Vue from 'vue'
import Router from 'vue-router'
import Example from '@/components/ex_hor_top'
import Example1 from '@/components/ex_ver_left'
import Example2 from '@/components/ex_hor_bottom'
import Example3 from '@/components/ex_ver_right'
import Example4 from '@/components/ex_hor_topBottom'
import Example5 from '@/components/ex_ver_leftRight'
import Example6 from '@/components/ex_margin'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'example_0',
      component: Example
    },
    {
      path: '/1',
      name: 'example_1',
      component: Example1
    },
    {
      path: '/2',
      name: 'example_2',
      component: Example2
    },
    {
      path: '/3',
      name: 'example_3',
      component: Example3
    },
    {
      path: '/4',
      name: 'example_4',
      component: Example4
    },
    {
      path: '/5',
      name: 'example_5',
      component: Example5
    },
    {
      path: '/6',
      name: 'example_6',
      component: Example6
    }
  ]
})
