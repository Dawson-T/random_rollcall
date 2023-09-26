<template>
  <div class="container">
    <div class="allStudent">
      <span>总人数：</span
      ><span class="studentNumber">{{ studentNumber }} </span> 人
    </div>
    <!-- <RollCall /> -->
    <NameRound />
    <div class="overlay" ref="overlayDom">
      <div class="modal">
        <!-- <h2 class="modal_title">随机点名</h2> -->
        <RollCall ref="RollCallComp" />
        <button class="cancel_button" @click="cancel_button">
          <img class="cancel_svg" src="./assets/cancel.svg" alt="" />
        </button>
      </div>
    </div>
    <!-- <Count /> -->
    <div class="button_container">
      <button class="btn btn__primary" @click="getRandomPerson">
        开始点名
      </button>
    </div>
    <footer class="copyRight">
      <p>&copy;{{ currentYear }}. {{ authorName }}</p>
    </footer>
  </div>
</template>

<script setup>
import NameRound from '@/components/NameRound.vue'
import RollCall from './components/RollCall.vue'
import Count from './components/Count.vue'
import { ref, onMounted } from 'vue'
import APIs from '@/api/serverAPI'
const authorName = '邓森'
let studentNumber = ref()
const overlayDom = ref()
const RollCallComp = ref()
const currentYear = new Date().getFullYear()
onMounted(() => {
  // 引入粒子效果
  const script = document.createElement('script')
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/canvas-nest.js/2.0.4/canvas-nest.js'
  script.async = true
  document.head.appendChild(script)
  getTotalData()
})
// 总人数
const getTotalData = async () => {
  const res = await APIs.getTotal()
  console.log(res.data[0].total)
  studentNumber.value = res.data[0].total
}
// 点名
const getRandomPerson = () => {
  RollCallComp.value.getStudentsData()
  overlayDom.value.style.display = 'flex'
}
// 关闭
const cancel_button = () => {
  RollCallComp.value.cleanIntervalHandler()
  overlayDom.value.style.display = 'none'
}
</script>

<style scoped>
.container {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* justify-content: center; */
}
.button_container {
  display: flex;
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
.btn__primary {
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  background: #6d5dfc;
  box-shadow: inset 0.2rem 0.2rem 1rem #8abdff,
    inset -0.2rem -0.2rem 1rem #5b0eeb, 0.3rem 0.3rem 0.6rem #c8d0e7;
  color: #e4ebf5;
}
.btn__primary:hover {
  color: #ffffff;
}
.btn__primary:active {
  box-shadow: inset 0.2rem 0.2rem 1rem #5b0eeb,
    inset -0.2rem -0.2rem 1rem #8abdff;
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
p {
  font-size: 1.6rem;
}
.allStudent {
  font-size: 3rem;
  color: #794ccd;
}
.studentNumber {
  color: #bdc310;
  font-size: 4rem;
}
.cancel_svg {
  width: 20%;
  height: 30%;
}
.overlay {
  position: relative;
  display: none;
  /* 初始时隐藏遮罩层 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明背景 */
  justify-content: center;
  align-items: center;
}
.overlay .cancel_button {
  font-size: 12px;
  position: absolute;
  top: 23vh;
  right: 23vw;
  /* border-style: none; */
  background-color: #fff;
  cursor: pointer;
}

.overlay .modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  width: 60vw;
  height: 60vh;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>
