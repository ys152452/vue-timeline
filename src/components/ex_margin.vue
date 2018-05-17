<template>
  <div class="tl-box-0">
    <timeline :propOption='tlOption'></timeline>
  </div>
</template>
<script>
import timeline from './timeline/timeline'
export default {
  name: 'example2',
  components: {
    timeline: timeline
  },
  data () {
    return {
      tlOption: {
        axis: {
          align: 'vertical'
        },
        items: {
          position: 'left-right',
          distanceToAxis: '0',
          itemList: [
            {
              title: 'step1',
              content: 'step1 content'
            },
            {
              title: 'step2',
              content: 'step1 content'
            },
            {
              title: 'step3',
              content: 'step1 content'
            },
            {
              title: 'step4',
              content: 'step1 content'
            },
            {
              title: 'step5',
              content: 'step1 content'
            }
          ]
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scope>
.tl-box-0{
  width: 80%;
  height: 80%;
  margin: 0 auto;
  border: 1px solid #ccc;
}
</style>
