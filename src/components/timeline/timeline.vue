<template>
  <div class="tl-body">
    <div :class="`tl-axis tl-axis-${option.axis.align}`" :style="`width: ${option.axis.align === 'horizontal' ? '100%' : option.axis.axisStyle.axisWidth}; height: ${option.axis.align === 'vertical' ? '100%' : option.axis.axisStyle.axisWidth};background:${axisBackgroundStyle}`"></div>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  props: {
    'propOption': {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      option: {},
      optionDefault: {
        axis: {
          align: 'horizontal',
          axisStyle: {
            axisWidth: '.2rem',
            backgroundColor: '#ccc',
            backgroundImage: ''
          }
        }
      },
      axisBackgroundStyle: '#ccc'
    }
  },
  created () {
    this.option = this._.defaultsDeep(this.optionDefault, this.propOption)
    this.axisBackgroundStyle = this.option.axis.axisStyle.backgroundImage !== '' ? `url(${this.option.axis.axisStyle.backgroundImage}) repeat-${this.option.axis.align === 'horizontal' ? 'x' : 'y'}` : this.option.axis.axisStyle.backgroundColor
  },
  mounted () {
    console.log(this.option)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.tl-body{
  width: 100%;
  height: 100%;
  position: relative;
  .tl-axis{
    position: absolute;
    &.tl-axis-horizontal{
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &.tl-axis-vertical{
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
