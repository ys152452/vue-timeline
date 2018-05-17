<template>
  <div id="app">
    <h1> Vue-Timeline</h1>
    <timeline :propOption='tlOption'></timeline>
    <router-view/>
  </div>
</template>

<script>
import timeline from './components/timeline/timeline'
export default {
  name: 'App',
  components: {
    timeline: timeline
  },
  data () {
    return {
      tlOption: {
        height: '48px',
        backgroundColor: '#fff',
        completedBackgroundColor: '#B22222',
        axis: {
          align: 'horizontal',
          axisStyle: {
            axisWidth: '4px',
            backgroundColor: '#000'
          }
        },
        items: {
          position: 'bottom',
          distanceToAxis: '4px',
          itemStyle: {
            borderWidth: '0',
            width: '80%',
            height: '30%'
          },
          titleText: {
            fontSize: '12px',
            borderWidth: '1px',
            borderColor: '#000',
            borderRadius: '20px'
          },
          itemList: [
            {
              title: 'example_top',
              link: '/'
            },
            {
              title: 'example_left',
              link: '1'
            },
            {
              title: 'example_bottom',
              link: '2'
            },
            {
              title: 'example_right',
              link: '3'
            },
            {
              title: 'example_top-bottom',
              link: '4'
            },
            {
              title: 'example_left-right',
              link: '5'
            },
            {
              title: 'example_margin',
              link: '6'
            }
          ],
          markpoint: {
            backgroundColor: '#fff',
            width: '10px',
            height: '10px'
          },
          markLine: {
            show: false
          }
        }
      }
    }
  }
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
}
</style>
