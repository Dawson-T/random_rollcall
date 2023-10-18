<template>
  <div v-show="isStart" class="call_container">
    <div class="card" v-for="item in arrList">{{ item }}</div>
  </div>

  <div v-if="!isStart">
    <Count @count-changed="handleCountChange" />
    <button class="btn btn__primary" @click="startRandomCall">开始点名</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Count from '@/components/Count.vue'
import Util from '@/util/utils'
import APIs from '@/api/serverAPI'
let isStart = ref(false)
// 抽取人数
let stuNum = ref(2)
// 抽取最终结果
let arrList = ref([])
let arr = []

const getStudentsData = async () => {
  const res = await APIs.getStudents()
  if (res.code === 200) {
    arr = res.data
  }
}
const startRandomCall = () => {
  isStart.value = true

  arrList.value = Util.getRandomObjectsFromArray(arr, stuNum.value)
}
// 子传父
let handleCountChange = (count) => {
  stuNum.value = count
}
onMounted(() => {
  getStudentsData()
})
</script>

<style scoped>
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


.call_container {
  margin-top: 5%;
  width: 100%;
  height: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}
.card {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
