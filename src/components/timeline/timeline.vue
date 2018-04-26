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
          <div class="tl-content" :style="`${contentStyle} border: ${option.items.itemStyle.borderWidth} solid ${option.items.itemStyle.borderColor}; borderRadius: ${option.items.itemStyle.borderRadius}; background: ${contentBackgroundStyle};`">
            <p v-if="option.items.titleText.show" class="tl-text-title" :style="`${titleTextStyle} background: ${titleTextBackgroundStyle};`">{{item.title}}</p>
            <p v-if="option.items.contentText.show" class="tl-text-content" :style="`${contentTextStyle} background: ${contenttextBackgroundStyle};`">{{item.content}}</p>
          </div>
        </div>
        <div v-if="option.items.markpoint.show" :class="`tl-mark tl-mark-${option.items.position} tl-mark-${option.items.markpoint.type}`" :style="`${markpointStyle} background: ${markPointBackgroundStyle};`"></div>
        <div v-if="option.items.markLine.show" :class="`tl-mark-line tl-mark-line-${option.items.position}`" :style="`${markLineStyle} background: ${markLineBackgroundStyle};`"></div>
        <div v-if="index < option.completed" :class="`tl-completed tl-completed-${option.items.position}`" :style="`${completedStyle}`"></div>
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
      // 配置项参数👇👇👇
      optionDefault: {
        // 当前进度
        completed: '3',
        // 完成状态下进度条的背景色
        completedBackgroundColor: '#ffe1a1',
        // 中轴线配置项👇👇👇
        axis: {
          // 轴线方向  horzontal水平 vertical垂直
          align: 'horizontal',
          // 轴线样式
          axisStyle: {
            // 轴线宽度
            axisWidth: '.2rem',
            // 轴线背景色
            backgroundColor: '#ccc',
            // 轴线背景图 可与背景色同时配置
            backgroundImage: ''
          }
        },
        // 内容区域配置项👇👇👇
        items: {
          // 相对于轴线的分布方式 top bottom top-bottom left right left-right
          position: 'top',
          // 内容元素相对于轴线的距离 带单位
          distanceToAxis: '30px',
          /*
          内容数据数组 格式如下
          itemList: [
            {
              title: '',
              content: ''
            },
            ……
            {
              title: '',
              content: ''
            }
          ]
          */
          itemList: [],
          // 单个节点样式配置项👇👇👇
          itemStyle: {
            width: '50%',
            height: '30%',
            borderRadius: '4px',
            backgroundColor: '#fff',
            backgroundImage: '',
            borderWidth: '4px',
            borderColor: '#ffe1a1'
          },
          // 单节点标题配置项👇👇👇
          titleText: {
            show: true,
            align: 'center',
            lineHeight: '24px',
            fontSize: '18px',
            color: '#ccc',
            backgroundColor: '#fff',
            backgroundImage: '',
            borderWidth: '1px',
            borderColor: '#ffe1a1',
            borderRadius: '4px'
          },
          // 单节点内容配置项👇👇👇
          contentText: {
            show: true,
            align: 'left',
            indent: '8px',
            lineHeight: '24px',
            fontSize: '18px',
            color: '#333',
            backgroundColor: '#fff',
            backgroundImage: '',
            borderWidth: '0',
            borderColor: '#eee'
          },
          // 节点在轴线上对应标记点的配置项👇👇👇
          markpoint: {
            // 是否显示
            show: true,
            // 显示类型 circle圆形 rect方形
            type: 'circle',
            backgroundColor: '#ffe1a1',
            backgroundImage: '',
            width: '.4rem',
            height: '.4rem',
            // 标记点边框 可通过设置backgroundColor为transparent实现圆环效果
            borderWidth: '4px',
            borderColor: '#fff'
          },
          // 节点连线至标记点的配置项👇👇👇
          markLine: {
            show: true,
            backgroundColor: '#ffe1a1',
            backgroundImage: '',
            width: '4px'
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
      markLineStyle: '',
      markLineBackgroundStyle: '',
      axisHalfWidth: '.1rem',
      titleTextStyle: '',
      titleTextBackgroundStyle: '',
      contentTextStyle: '',
      contenttextBackgroundStyle: '',
      completedStyle: ''
      // completedBackgroundStyle: ''
    }
  },
  created () {
    switch (this.propOption.axis.align) {
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
    this.markpointStyle = `background-size: cover; width: ${this.option.items.markpoint.width}; height: ${this.option.items.markpoint.height}; border: ${this.option.items.markpoint.borderWidth} solid ${this.option.items.markpoint.borderColor};`
    this.titleTextStyle = `border: ${this.option.items.titleText.borderWidth} solid ${this.option.items.titleText.borderColor};text-align: ${this.option.items.titleText.align};line-height: ${this.option.items.titleText.lineHeight};border-radius: ${this.option.items.titleText.borderRadius};color: ${this.option.items.titleText.color};font-size: ${this.option.items.titleText.fontSize};`
    this.contentTextStyle = `border: ${this.option.items.contentText.borderWidth} solid ${this.option.items.contentText.borderColor};text-align: ${this.option.items.contentText.align};text-indent: ${this.option.items.contentText.indent};line-height: ${this.option.items.contentText.lineHeight};border-radius: ${this.option.items.contentText.borderRadius};color: ${this.option.items.contentText.color};font-size: ${this.option.items.contentText.fontSize};`
    this.axisBackgroundStyle = this.option.axis.axisStyle.backgroundImage !== '' ? `${this.option.axis.axisStyle.backgroundColor} url(${this.option.axis.axisStyle.backgroundImage}) repeat-${this.option.axis.align === 'horizontal' ? 'x' : 'y'}` : `${this.option.axis.axisStyle.backgroundColor}`
    this.contentBackgroundStyle = this.option.items.itemStyle.backgroundImage !== '' ? `${this.option.items.itemStyle.backgroundColor} url(${this.option.items.itemStyle.backgroundImage}) repeat-${this.option.axis.align === 'horizontal' ? 'x' : 'y'}` : `${this.option.items.itemStyle.backgroundColor}`
    this.markPointBackgroundStyle = this.option.items.markpoint.backgroundImage !== '' ? `${this.option.items.markpoint.backgroundColor} url(${this.option.items.markpoint.backgroundImage}) no-repeat` : `${this.option.items.markpoint.backgroundColor}`
    this.markLineBackgroundStyle = this.option.items.markLine.backgroundImage !== '' ? `${this.option.items.markLine.backgroundColor} url(${this.option.items.markLine.backgroundImage}) no-repeat` : `${this.option.items.markLine.backgroundColor}`
    this.titleTextBackgroundStyle = this.option.items.titleText.backgroundImage !== '' ? `${this.option.items.titleText.backgroundColor} url(${this.option.items.titleText.backgroundImage}) no-repeat` : `${this.option.items.titleText.backgroundColor}`
    this.contenttextBackgroundStyle = this.option.items.contentText.backgroundImage !== '' ? `${this.option.items.contentText.backgroundColor} url(${this.option.items.contentText.backgroundImage}) no-repeat` : `${this.option.items.contentText.backgroundColor}`
    this.completedStyle = `background: ${this.option.completedBackgroundColor};`
    if (this._.difference([this.option.items.position], ['top-bottom', 'left-right']).length > 0) {
      this.itemSize = (100 / this.option.items.itemList.length).toFixed(2) - 0.01 + '%'
      this.itemStyle = `width:${this.option.axis.align === 'horizontal' ? this.itemSize : '100%'}; height:${this.option.axis.align === 'vertical' ? this.itemSize : '100%'}`
    } else {
      this.itemSize = (100 / ((this.option.items.itemList.length + 1) / 2)).toFixed(2) + '%'
      this.itemStyle = `position: absolute;\
        width:${this.option.axis.align === 'horizontal' ? this.itemSize : '50%'};\
        height:${this.option.axis.align === 'vertical' ? this.itemSize : '50%'}`
    }
    switch (this.option.items.position) {
      case 'top':
        this.itemContentStyle = `height: calc(100% - ${this.option.axis.axisStyle.axisWidth});\
          top: ${this.axisHalfWidth};`
        this.contentStyle = `left: 50%;\
          bottom: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.itemStyle.width};\
          min-height: ${this.option.items.itemStyle.height};\
          transform: translateX(-50%);`
        this.markLineStyle = `height: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.markLine.width};\
          bottom: ${this.axisHalfWidth};\
          transform: translateX(-50%);`
        this.completedStyle += `height: ${this.option.axis.axisStyle.axisWidth};\
          bottom: -${this.axisHalfWidth};`
        break
      case 'bottom':
        this.itemContentStyle = `height: calc(100% - ${this.option.axis.axisStyle.axisWidth});\
          top: ${this.axisHalfWidth};`
        this.contentStyle = `left: 50%;\
          top: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.itemStyle.width};\
          min-height: ${this.option.items.itemStyle.height};\
          transform: translateX(-50%);`
        this.markLineStyle = `height: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.markLine.width};\
          top: ${this.axisHalfWidth};\
          transform: translateX(-50%);`
        this.completedStyle += `height: ${this.option.axis.axisStyle.axisWidth};\
          top: -${this.axisHalfWidth};`
        break
      case 'top-bottom':
        this.itemContentStyle = `height: calc(100% - ${this.option.axis.axisStyle.axisWidth});`
        this.contentStyle = `left: 50%;\
          width: ${this.option.items.itemStyle.width};\
          min-height: ${this.option.items.itemStyle.height};\
          transform: translateX(-50%);`
        this.markLineStyle = `height: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.markLine.width};\
          transform: translateX(-50%);`
        this.completedStyle += `height: ${this.option.axis.axisStyle.axisWidth};`
        break
      case 'left':
        this.itemContentStyle = `width: calc(100% - ${this.option.axis.axisStyle.axisWidth});\
          left: ${this.axisHalfWidth};`
        this.contentStyle = `top: 50%;\
          right: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.itemStyle.width};\
          min-height: ${this.option.items.itemStyle.height};\
          transform: translateY(-50%);`
        this.markLineStyle = `width: ${this.option.items.distanceToAxis};\
          height: ${this.option.items.markLine.width};\
          right: ${this.axisHalfWidth};\
          transform: translateY(-50%);`
        this.completedStyle += `width: ${this.option.axis.axisStyle.axisWidth};\
          right: -${this.axisHalfWidth};`
        break
      case 'right':
        this.itemContentStyle = `width: calc(100% - ${this.option.axis.axisStyle.axisWidth});\
          left: ${this.axisHalfWidth};`
        this.contentStyle = `top: 50%;\
          left: ${this.option.items.distanceToAxis};\
          width: ${this.option.items.itemStyle.width};\
          min-height: ${this.option.items.itemStyle.height};\
          transform: translateY(-50%);`
        this.markLineStyle = `width: ${this.option.items.distanceToAxis};\
          height: ${this.option.items.markLine.width};\
          left: ${this.axisHalfWidth};\
          transform: translateY(-50%);`
        this.completedStyle += `width: ${this.option.axis.axisStyle.axisWidth};\
          left: -${this.axisHalfWidth};`
        break
      case 'left-right':
        this.itemContentStyle = `width: calc(100% - ${this.option.axis.axisStyle.axisWidth});`
        this.contentStyle = `top: 50%;\
          width: ${this.option.items.itemStyle.width};\
          min-height: ${this.option.items.itemStyle.height};\
          transform: translateY(-50%);`
        this.markLineStyle = `width: ${this.option.items.distanceToAxis};\
          height: ${this.option.items.markLine.width};\
          transform: translateY(-50%);`
        this.completedStyle += `width: ${this.option.axis.axisStyle.axisWidth};`
        break
    }
    switch (this.option.items.markpoint.type) {
      case 'circle':
        this.markpointStyle += `border-radius: ${this.option.items.markpoint.width};`
        break
      case 'vertical':
        console.log(this.markpointStyle)
        break
    }
    this.loaded = true
  },
  mounted () {
    let _this = this
    let itemTypeArr = ['top', 'bottom', 'left', 'right']
    this.$nextTick(function () {
      switch (_this.option.items.position) {
        case 'top':
          if (document.getElementsByClassName('tl-item-top')[_this.option.completed - 1].getElementsByClassName('tl-completed').length > 0)document.getElementsByClassName('tl-item-top')[_this.option.completed - 1].getElementsByClassName('tl-completed')[0].style.borderRadius = '0 16px 16px 0'
          break
        case 'bottom':
          if (document.getElementsByClassName('tl-item-bottom')[_this.option.completed - 1].getElementsByClassName('tl-completed').length > 0)document.getElementsByClassName('tl-item-bottom')[_this.option.completed - 1].getElementsByClassName('tl-completed')[0].style.borderRadius = '0 16px 16px 0'
          break
        case 'left':
          if (document.getElementsByClassName('tl-item-left')[_this.option.completed - 1].getElementsByClassName('tl-completed').length > 0)document.getElementsByClassName('tl-item-left')[_this.option.completed - 1].getElementsByClassName('tl-completed')[0].style.borderRadius = '0 0 16px 16px'
          break
        case 'right':
          if (document.getElementsByClassName('tl-item-right')[_this.option.completed - 1].getElementsByClassName('tl-completed').length > 0)document.getElementsByClassName('tl-item-right')[_this.option.completed - 1].getElementsByClassName('tl-completed')[0].style.borderRadius = '0 0 16px 16px'
          break
        case 'top-bottom':
          for (let i = 0; i < _this.option.items.itemList.length; i++) {
            document.getElementsByClassName('tl-item-top-bottom')[i].style.left = _this._.trim(_this.itemSize, '%') / 2 * i + '%'
            if (document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-content').length > 0)document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-content')[0].style[itemTypeArr[1 - i % 2]] = _this.option.items.distanceToAxis
            if (document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-item-content').length > 0)document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-item-content')[0].style[itemTypeArr[1]] = `-${_this.axisHalfWidth}`
            if (document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-mark-line').length > 0)document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-mark-line')[0].style[itemTypeArr[1 - i % 2]] = `${_this.axisHalfWidth}`
            if (document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-completed').length > 0)document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-completed')[0].style[itemTypeArr[1 - i % 2]] = `-${_this.axisHalfWidth}`
            if (document.getElementsByClassName('tl-item-top-bottom')[i].getElementsByClassName('tl-completed').length > 0)document.getElementsByClassName('tl-item-top-bottom')[_this.option.completed - 1].getElementsByClassName('tl-completed')[0].style.borderRadius = '0 16px 16px 0'
          }
          break
        case 'left-right':
          for (let i = 0; i < _this.option.items.itemList.length; i++) {
            document.getElementsByClassName('tl-item-left-right')[i].style.top = _this._.trim(_this.itemSize, '%') / 2 * i + '%'
            if (document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-content').length > 0)document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-content')[0].style[itemTypeArr[3 - i % 2]] = _this.option.items.distanceToAxis
            if (document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-item-content').length > 0)document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-item-content')[0].style[itemTypeArr[3]] = `-${_this.axisHalfWidth}`
            if (document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-mark-line').length > 0)document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-mark-line')[0].style[itemTypeArr[3 - i % 2]] = `${_this.axisHalfWidth}`
            if (document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-completed').length > 0)document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-completed')[0].style[itemTypeArr[3 - i % 2]] = `-${_this.axisHalfWidth}`
            if (document.getElementsByClassName('tl-item-left-right')[i].getElementsByClassName('tl-completed').length > 0)document.getElementsByClassName('tl-item-left-right')[_this.option.completed - 1].getElementsByClassName('tl-completed')[0].style.borderRadius = '0 0 16px 16px'
          }
          break
      }
    })
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
    z-index: 100;
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
    z-index: 100;
    box-sizing: border-box;
    .tl-item{
      position: relative;
      box-sizing: border-box;
      float: left;
      .tl-mark{
        position: absolute;
        z-index: 102;
        box-sizing: border-box;
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
      .tl-mark-line{
        position: absolute;
        z-index: 103;
        &.tl-mark-line-top,
        &.tl-mark-line-bottom,
        &.tl-mark-line-top-bottom{
          left: 50%;
        }
        &.tl-mark-line-left,
        &.tl-mark-line-right,
        &.tl-mark-line-left-right{
          top: 50%;
        }
      }
      .tl-completed{
        position: absolute;
        z-index: 101;
        &.tl-completed-top,
        &.tl-completed-bottom{
          left: 0;
          width: 100%;
        }
        &.tl-completed-top-bottom{
          width: 50%;
          left:50%;
          transform:translateX(-50%);
        }
        &.tl-completed-left,
        &.tl-completed-right{
          top: 0;
          height: 100%;
        }
        &.tl-completed-left-right{
          height: 50%;
          top:50%;
          transform:translateY(-50%);
        }
      }
      .tl-item-content{
        position: relative;
        .tl-content{
          position: absolute;
          .tl-text-title,
          .tl-text-content{
            width: 100%;
            height: auto;
            float: left;
            box-sizing: border-box;
          }
        }
      }
      &.tl-item-top-bottom{
        &:nth-of-type(1){
          .tl-completed-top-bottom{
            width: 100%;
            left: 0;
            transform:translateX(0);
          }
        }
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
        &:nth-of-type(1){
          .tl-completed-left-right{
            height: 100%;
            top: 0;
            transform:translateY(0);
          }
        }
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
      .tl-item-content{
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
      .tl-item-content{
        height: 100%;
      }
    }
  }
}
</style>
