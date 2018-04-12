<template>
  <div class="tl-box-1">
    <timeline></timeline>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scope>
.tl-box-1{
  width: 20rem;
  height: 16rem;
  margin: 0 auto;
  border: 1px solid #ccc;
}
</style>
