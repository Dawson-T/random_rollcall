<script setup>
import { ref, onMounted } from 'vue'
import Util from '@/util/utils'
import APIs from '@/api/serverAPI'
let isStart = ref(false)
// 抽取人数
let stuNum = ref(30)
// 抽取最终结果
let arrList = ref([])
let arr = []

const getStudentsData = async () => {
  const res = await APIs.getStudents()
  if (res.code === 200) {
    arr = Util.toNameArray(res.data)
  }
}

const startRandomCall = () => {
  isStart.value = true

  arrList.value = Util.getRandomObjectsFromArray(arr, stuNum.value)
  arr.forEach((item, index) => {
    arrList.value.forEach((item2) => {
      if (item === item2) {
        arr.splice(index, 1)
      }
    })
  })
  if (arr.length <= stuNum.value) {
    getStudentsData()
  }
}

onMounted(() => {
  getStudentsData()
})
</script>

<template>
  <div v-if="isStart" class="rollCallPro layout_h">
    <div class="cards layout_h">
      <div class="card layout_c" v-for="item in arrList ">{{ item }}</div>
    </div>
    <button class="btn" @click="startRandomCall()">再次点名</button>
  </div>
  <div v-else class="layout_v">
    <!-- 点名人数 -->
    <div class="content layout_c"> 抽取人数：<input v-model="stuNum" class="input" /></div>
    <button class="btn" @click="startRandomCall()">开始点名</button>
  </div>
</template>


<style scoped lang="less">
.rollCallPro {
  width: 100%;
  height: 100%;
  margin-top: 40px;
  flex-wrap: wrap;
  overflow: auto;

  // 美化滚动条样式
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .cards {
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    gap: 5px;



    .card {
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      border-radius: 5px;
      flex-direction: row;
    }
  }


}

.input {
  width: 5rem;
  height: 2rem;
  border-radius: 0.5rem;
  margin-right: 10px;
  padding-left: 0.5rem;
  border: 1px solid #ccc;
  transition: .3 ease;
}

.btn {
  width: 12rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 1rem;
  transition: 0.3s ease;
  box-shadow: 0.3rem 0.3rem 0.6rem #c8d0e7;
}
</style>
