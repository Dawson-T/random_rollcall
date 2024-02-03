<template>
  <div class="layout_v rollCall">
    <div class="name layout_c">
      <h1 class="text-fade">{{ currentData }}</h1>
    </div>
    <div class="layout_c">
      <button v-if="button_status" class="btn btn__secondary " @click="stop_button">
        停止
      </button>
      <button v-else class="btn btn__primary " @click="getRandomPerson">
        开始点名
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import utils from '@/util/utils'
import APIs from '@/api/serverAPI'
const data = ref()
const currentData = ref(undefined)
let timer = ref()
let button_status = ref(true)
let currentIndex = 0
let resultData = []


const getStudentsData = async () => {

  const res = await APIs.getStudents()
  if (res.code === 200) {
    resultData = utils.toNameArray(res.data)
    changeText()
  } else {
    alert('获取数据失败')
  }
}


const getRandomPerson = () => {
  getStudentsData()
  button_status.value = true
}

// 文字快闪效果
const changeText = () => {
  if (resultData.length <= 0) return
  currentIndex = 0
  timer = setInterval(() => {
    currentData.value = resultData[currentIndex]
    // 在数组范围内容随机Index
    currentIndex = utils.getRandomIndex(resultData.length)
  }, 100)
}

// 停止按钮
const stop_button = () => {
  cleanIntervalHandler()
  button_status.value = false
  resultData.splice(currentIndex, 1)
}
const cleanIntervalHandler = () => {
  // 销毁定时器
  clearInterval(timer)
  button_status.value = true
}
onMounted(() => { })
defineExpose({
  cleanIntervalHandler,
  getStudentsData,
})
</script>

<style scoped>
.rollCall {
  width: 100%;
  height: 100%;

  min-width: 1200px;

  .name {
    margin-top: 40px;
    font-size: 68px;
  }
}

.container_call {
  font-size: 5vw;
}

.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 0.5s;
}

.text-fade-enter,
.text-fade-leave-to {
  opacity: 0;
}

.btn {
  width: 15rem;
  height: 4rem;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem #c8d0e7;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}



.btn__secondary:hover {
  color: #6d5dfc;
}

.btn__secondary:active {
  box-shadow: inset 0.2rem 0.2rem 0.5rem #c8d0e7,
    inset -0.2rem -0.2rem 0.5rem #ffffff;
}
</style>
