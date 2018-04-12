import Vue from 'vue'
import Router from 'vue-router'
import Example from '@/components/example_0'
import Example1 from '@/components/example_1'

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
    }
  ]
})
