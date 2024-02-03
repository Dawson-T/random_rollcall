<template>
  <div id="app">
    <svg :width="width" :height="height">
      <a class="fontA" v-for="(tag, index) in tags" :key="`tag-${index}`">
        <text :id="tag.id" :x="tag.x" :y="tag.y" :font-size="20 * (600 / (600 - tag.z))"
          :fill-opacity="(400 + tag.z) / 600" @mousemove="listenerMove($event)" @mouseout="listenerOut($event)"
          @click="clickToPage">
          {{ tag.text }}
        </text>
      </a>
    </svg>
  </div>
</template>

<script>
import utils from '@/util/utils'
import APIs from '@/api/serverAPI'
export default {
  name: 'word-cloud',
  //数据，宽，高，半径，半径一般位宽高的一半。
  data() {
    return {
      width: 900, //svg宽度
      height: 800, //svg高度
      tagsNum: 0, //标签数量
      RADIUS: 400, //球的半径
      speedX: Math.PI / 360 / 1.5, //球一帧绕x轴旋转的角度
      speedY: Math.PI / 360 / 1.5, //球-帧绕y轴旋转的角度
      tags: [],
      data: [],
      timer: null,
      timer1: null, // 这是定时器
      resultData: [],
    }
  },
  computed: {
    CX() {
      //球心x坐标
      return this.width / 2
    },
    CY() {
      //球心y坐标
      return this.height / 2
    },
  },
  created() {
    this.computeSize()
    this.initData()
  },
  methods: {
    // 计算尺寸
    computeSize() {
      this.width = window.innerWidth / 2.5
      this.height = window.innerHeight / 1.5
      this.RADIUS = this.height / 2.1
    },
    // 初始化数据
    async initData() {
      await this.getStudentsData()
      //初始化标签位置
      let tags = []
      this.tagsNum = this.data.length
      for (let i = 0; i < this.data.length; i++) {
        let tag = {}
        let k = -1 + (2 * (i + 1) - 1) / this.tagsNum
        let a = Math.acos(k)
        let b = a * Math.sqrt(this.tagsNum * Math.PI) //计算标签相对于球心的角度
        tag.text = this.data[i]
        tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b) //根据标签角度求出标签的x,y,z坐标
        tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b)
        tag.z = this.RADIUS * Math.cos(a)
        tag.id = i // 给标签添加id
        tags.push(tag)
      }
      this.tags = tags //让vue替我们完成视图更新
    },
    // 纵向旋转
    rotateX(angleX) {
      var cos = Math.cos(angleX)
      var sin = Math.sin(angleX)
      for (let tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY
        var z1 = tag.z * cos + (tag.y - this.CY) * sin
        tag.y = y1
        tag.z = z1
      }
    },
    // 横向旋转
    rotateY(angleY) {
      var cos = Math.cos(angleY)
      var sin = Math.sin(angleY)
      for (let tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX
        var z1 = tag.z * cos + (tag.x - this.CX) * sin
        tag.x = x1
        tag.z = z1
      }
    },
    // 运动函数
    runTags() {
      if (typeof this.timer === 'number') {
        clearInterval(this.timer)
        this.timer = null
      }
      let timer = setInterval(() => {
        this.rotateX(this.speedX)
        this.rotateY(this.speedY)
      }, 17)
      this.timer = timer
    },
    // 监听移入事件
    listenerMove(e) {
      if (e.target.id) {
        clearInterval(this.timer)
      }
    },
    // 监听移出事件
    listenerOut(e) {
      if (e.target.id) {
        this.runTags()
      }
    },
    async getStudentsData() {
      const res = await APIs.getStudents()
      if (res.code === 200) {
        if (this.resultData.length < 50) {
          this.resultData = utils.toNameArray(res.data)
        }
        const selectedObjects = utils.getRandomObjectsFromArray(this.resultData, 50)
        this.data = selectedObjects
      }
    },
    // 定时更新数据
    setIntervalFn() {
      this.timer1 = setInterval(() => {
        this.initData()
      }, 1000 * 60)
    },
    // 点击事件
    clickToPage() { },
  },
  mounted() {
    this.runTags()
    this.setIntervalFn()
    // 添加屏幕尺寸变化的事件监听器
    window.addEventListener('resize', this.computeSize)
  },
  destroyed() {
    clearInterval(this.timer1)
    // 在组件销毁前移除事件监听器，以防止内存泄漏
    window.removeEventListener('resize', this.computeSize)
  },
}
</script>

<style scoped>
.fontA {
  fill: #60cae9;
  font-weight: bold;
}

.fontA:hover {
  fill: #ffffff;
  cursor: pointer;
}
</style>
