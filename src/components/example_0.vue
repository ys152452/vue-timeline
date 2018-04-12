<template>
  <div class="tl-box-0">
    <timeline :propOption='tlOption'></timeline>
  </div>
</template>

<script>
import timeline from './timeline/timeline'
export default {
  name: 'example',
  components: {
    timeline: timeline
  },
  data () {
    return {
      tlOption: {
        axis: {
          align: 'horizontal'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scope>
.tl-box-0{
  width: 18rem;
  height: 15rem;
  margin: 0 auto;
  border: 1px solid #ccc;
}
</style>
