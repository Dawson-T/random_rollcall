<template>
  <div class="container_call">
    <div class="name">
      <h1 class="text-fade">{{ currentData }}</h1>
    </div>
  </div>
  <button v-if="button_status" class="btn btn__secondary" @click="stop_button">
    停止
  </button>
  <button v-else class="btn btn__primary" @click="getRandomPerson">
    开始点名
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import utils from '@/util/utils'
import APIs from '@/api/serverAPI'
const data = ref()
const currentData = ref()
let timer = ref()
let button_status = ref(true)
const getStudentsData = async () => {
  const res = await APIs.getStudents()
  if (res.code === 200) {
    let resultData = res.data
    const selectedObjects = utils.getRandomObjectsFromArray(resultData, 50)
    data.value = selectedObjects
    changeText(selectedObjects)
  }
}
const getRandomPerson = () => {
  getStudentsData()
  button_status.value = true
}

// 文字快闪效果
const changeText = (array) => {
  if (array.length <= 0) return
  let currentIndex = 0
  timer = setInterval(() => {
    currentData.value = array[currentIndex]
    currentIndex = (currentIndex + 1) % array.length
  }, 100)
}
// 停止按钮
const stop_button = () => {
  cleanIntervalHandler()
  button_status.value = false
}
const cleanIntervalHandler = () => {
  // 销毁定时器
  clearInterval(timer)
  button_status.value = true
}
onMounted(() => {})
defineExpose({
  cleanIntervalHandler,
  getStudentsData,
})
</script>

<style scoped>
.container_call {
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
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
.btn__secondary {
  grid-column: 1 / 2;
  grid-row: 5 / 6;
  color: #9baacf;
}
.btn__secondary:hover {
  color: #6d5dfc;
}
.btn__secondary:active {
  box-shadow: inset 0.2rem 0.2rem 0.5rem #c8d0e7,
    inset -0.2rem -0.2rem 0.5rem #ffffff;
}
</style>
