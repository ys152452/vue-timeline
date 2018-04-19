<template>
  <div class="tl-body">
    <div :class="`tl-axis tl-axis-${option.axis.align}`"
     :style="`width: ${option.axis.align === 'horizontal' ? '100%' : option.axis.axisStyle.axisWidth};\
      height: ${option.axis.align === 'vertical' ? '100%' : option.axis.axisStyle.axisWidth};\
     background:${axisBackgroundStyle}`">
    </div>
    <ul v-if="loaded" :class="`tl-itemList tl-itemList-${option.axis.align} tl-itemList-${option.items.position}`">
      <li v-for="(item, index) in option.items.itemList" :key="index"
       :class="`tl-item tl-item-${option.items.position}`"
       :style="itemStyle">
        <div class="tl-item-content" :style="itemContentStyle">
          <div class="tl-content" :style="`${contentStyle} borderRadius: ${option.items.itemStyle.borderRadius}; background: ${contentBackgroundStyle}`"></div>
        </div>
        <div :class="`tl-mark tl-mark-${option.items.position} tl-mark-${option.items.markpoint.type}`" :style="`${markpointStyle} background: ${markPointBackgroundStyle}`"></div>
      </li>
    </ul>
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
      loaded: false,
      option: {},
      optionDefault: {
        axis: {
          align: 'horizontal',
          axisStyle: {
            axisWidth: '.2rem',
            backgroundColor: '#ccc',
            backgroundImage: ''
          }
        },
        items: {
          position: 'top',
          distanceToAxis: '30px',
          itemList: [],
          itemStyle: {
            width: '50%',
            height: '30%',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            backgroundImage: ''
          },
          markpoint: {
            type: 'circle',
            backgroundColor: '#ffe1a1',
            backgroundImage: '',
            width: '.4rem',
            height: '.4rem'
          }
        }
      },
      axisBackgroundStyle: '#ccc',
      itemSize: '100%',
      itemStyle: '',
      itemContentStyle: '',
      contentStyle: '',
      contentBackgroundStyle: '',
      markpointStyle: '',
      markPointBackgroundStyle: '',
      axisHalfWidth: '.1rem'
    }
  },
  created () {
    let align = this.propOption.axis.align
    switch (align) {
      case 'horizontal':
        if (this.propOption.items.position && this._.difference([this.propOption.items.position], ['top', 'bottom', 'top-bottom']).length > 0) {
          console.error('When axis.align is "horizontal", the items.position must be "top/bottom/top-bottom"')
          return
        } else if (!this.propOption.items.position) {
          this.propOption.items['position'] = 'top'
        }
        break
      case 'vertical':
        if (this.propOption.items.position && this._.difference([this.propOption.items.position], ['left', 'right', 'left-right']).length > 0) {
          console.error('When axis.align is "vertical", the items.position must be "left/right/left-right"')
        } else if (!this.propOption.items.position) {
          this.propOption.items['position'] = 'right'
        }
        break
    } 
    this.option = this._.defaultsDeep(this.propOption, this.optionDefault)
    this.axisHalfWidth = this.option.axis.axisStyle.axisWidth.replace(/rem|%|px|em|pt/, '') / 2 + this.option.axis.axisStyle.axisWidth.match(/rem|%|px|em|pt/)[0]
    this.axisBackgroundStyle = `${this.option.axis.axisStyle.backgroundColor} url(${this.option.axis.axisStyle.backgroundImage}) repeat-${this.option.axis.align === 'horizontal' ? 'x' : 'y'}`
    this.contentBackgroundStyle = `${this.option.items.itemStyle.backgroundColor} url(${this.option.items.itemStyle.backgroundImage}) repeat-${this.option.axis.align === 'horizontal' ? 'x' : 'y'}`
    this.markpointStyle = `background-size: cover; width: ${this.option.items.markpoint.width}; height: ${this.option.items.markpoint.height};`
    this.markPointBackgroundStyle = `${this.option.items.markpoint.backgroundColor} url(${this.option.items.markpoint.backgroundImage}) no-repeat`
    if (this._.difference([this.option.items.position], ['top-bottom', 'left-right']).length > 0) {
      this.itemSize = (100 / this.option.items.itemList.length).toFixed(2) - 0.01 + '%'
      this.itemStyle = `width:${this.option.axis.align === 'horizontal' ? this.itemSize : '100%'}; height:${this.option.axis.align === 'vertical' ? this.itemSize : '100%'}`
    } else {
      this.itemSize = (100 / ((this.option.items.itemList.length + 1) / 2)).toFixed(2) + '%'
      this.itemStyle = `position: absolute;\
        width:${this.option.axis.align === 'horizontal' ? this.itemSize : '50%'};\
        height:${this.option.axis.align === 'vertical' ? this.itemSize : '50%'}`
    }
    let position = this.option.items.position
    switch (position) {
      case 'top':
        this.itemContentStyle = `height: calc(100% - ${this.option.axis.axisStyle.axisWidth});\
          top: ${this.axisHalfWidth};`
        this.contentStyle = `left: 50%;\
          bottom: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.itemStyle.width};\
          height: ${this.option.items.itemStyle.height};\
          transform: translateX(-50%);`
        break
      case 'bottom':
        this.itemContentStyle = `height: calc(100% - ${this.option.axis.axisStyle.axisWidth});\
          top: ${this.axisHalfWidth};`
        this.contentStyle = `left: 50%;\
          top: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.itemStyle.width};\
          height: ${this.option.items.itemStyle.height};\
          transform: translateX(-50%);`
        break
      case 'top-bottom':
        this.itemContentStyle = `height: calc(100% - ${this.option.axis.axisStyle.axisWidth});`
        this.contentStyle = `left: 50%;\
          width: ${this.option.items.itemStyle.width};\
          height: ${this.option.items.itemStyle.height};\
          transform: translateX(-50%);`
        break
      case 'left':
        this.itemContentStyle = `width: calc(100% - ${this.option.axis.axisStyle.axisWidth});\
          left: ${this.axisHalfWidth};`
        this.contentStyle = `top: 50%;\
          right: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.itemStyle.width};\
          height: ${this.option.items.itemStyle.height};\
          transform: translateY(-50%);`
        break
      case 'right':
        this.itemContentStyle = `width: calc(100% - ${this.option.axis.axisStyle.axisWidth});\
          left: ${this.axisHalfWidth};`
        this.contentStyle = `top: 50%;\
          left: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.itemStyle.width};\
          height: ${this.option.items.itemStyle.height};\
          transform: translateY(-50%);`
        break
      case 'left-right':
        this.itemContentStyle = `width: calc(100% - ${this.option.axis.axisStyle.axisWidth});`
        this.contentStyle = `top: 50%;\
          width: ${this.option.items.itemStyle.width};\
          height: ${this.option.items.itemStyle.height};\
          transform: translateY(-50%);`
        break
    }
    this.loaded = true
  },
  mounted () {
    let itemTypeArr = ['top', 'bottom', 'left', 'right']
    if (this.option.items.position === 'top-bottom') {
      for (let i = 0; i < this.option.items.itemList.length; i++) {
        document.getElementsByClassName('tl-item-top-bottom')[i].style.left = this._.trim(this.itemSize, '%') / 2 * i + '%'
        document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-content')[0].style[itemTypeArr[1 - i % 2]] = this.option.items.distanceToAxis
        document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-item-content')[0].style[itemTypeArr[1]] = `-${this.axisHalfWidth}`
      }
    }
    if (this.option.items.position === 'left-right') {
      for (let i = 0; i < this.option.items.itemList.length; i++) {
        document.getElementsByClassName('tl-item-left-right')[i].style.top = this._.trim(this.itemSize, '%') / 2 * i + '%'
        document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-content')[0].style[itemTypeArr[3 - i % 2]] = this.option.items.distanceToAxis
        document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-item-content')[0].style[itemTypeArr[3]] = `-${this.axisHalfWidth}`
      }
    }
  }
}
</script>

<style lang='scss'>
.tl-body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: rgba(224, 255, 177, 0.5);
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
  .tl-itemList{
    position: absolute;
    box-sizing: border-box;
    .tl-item{
      position: relative;
      box-sizing: border-box;
      float: left;
      .tl-mark{
        position: absolute;
        &.tl-mark-top{
          left: 50%;
          transform: translateX(-50%)
        }
        &.tl-mark-bottom{
          left: 50%;
          top: 0;
          transform: translate(-50%, -50%)
        }
        &.tl-mark-top-bottom{
          left: 50%;
        }
        &.tl-mark-left{
          right: 0;
          top: 50%;
          transform: translate(50%, -50%)
        }
        &.tl-mark-right{
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%)
        }
        &.tl-mark-left-right{
          top: 50%;
        }
      }
      .tl-item-content{
        position: relative;
        width: 100%;
        height: 100%;
        .tl-content{
          position: absolute;
        }
      }
      &.tl-item-top-bottom{
        &:nth-of-type(odd){
          top: 0;
          .tl-mark-top-bottom{
            transform: translateX(-50%)
          }
        }
        &:nth-of-type(even){
          bottom: 0;
          .tl-mark-top-bottom{
            top: 0;
            transform: translate(-50%, -50%)
          }
        }
      }
      &.tl-item-left-right{
        &:nth-of-type(odd){
          left: 0;
          .tl-mark-left-right{
            right: 0;
            transform: translate(50%, -50%)
          }
        }
        &:nth-of-type(even){
          right: 0;
          .tl-mark-left-right{
            transform: translate(-50%, -50%)
          }
        }
      }
    }
    &.tl-itemList-horizontal{
      &.tl-itemList-bottom{
        left: 0;
        bottom: 0;
      }
      &.tl-itemList-top,
      &.tl-itemList-bottom{
        width: 100%;
        height: 50%;
      }
      &.tl-itemList-top-bottom{
        width: 100%;
        height: 100%;
      }
      &.tl-itemList-top,
      &.tl-itemList-top-bottom,
      &.tl-itemList-left,
      &.tl-itemList-left-right{
        left: 0;
        top: 0;
      }
      li>div{
        width: 100%;
      }
    }
    &.tl-itemList-vertical{
      &.tl-itemList-left,
      &.tl-itemList-right{
        width: 50%;
        height: 100%;
      }
      &.tl-itemList-right{
        right: 0;
        top: 0;
      }
      &.tl-itemList-left-right{
        width: 100%;
        height: 100%;
      }
      li>div{
        height: 100%;
      }
    }
  }
}
</style>
