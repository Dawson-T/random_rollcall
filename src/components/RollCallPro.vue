<template>
  <!-- <div class="container_call">
    <div class="name">
      <h1 class="text-fade"></h1>
    </div>
  </div> -->
  <div class="call_container" ref="call_container">
    <div class="card">丁扬1号</div>
    <div class="card">丁扬2号</div>
    <div class="card">丁扬3号</div>
    <div class="card">丁扬4号</div>
    <div class="card">丁扬1号</div>
    <div class="card">丁扬2号</div>
    <div class="card">丁扬3号</div>
    <div class="card">丁扬4号</div>
    <div class="card">丁扬1号</div>
    <div class="card">丁扬2号</div>
    <div class="card">丁扬3号</div>
    <div class="card">丁扬4号</div>
    <div class="card">丁扬1号</div>
    <div class="card">丁扬2号</div>
    <div class="card">丁扬3号</div>
    <div class="card">丁扬4号</div>
  </div>

  <!-- <Count /> -->
  <!-- <button class="btn btn__primary">开始点名</button> -->
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Count from '@/components/Count.vue'
let container_call = ref()
onMounted(() => {
  nextTick(() => {
    console.log(container_call)
  })
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
.btn__secondary:hover {
  color: #6d5dfc;
}
.btn__secondary:active {
  box-shadow: inset 0.2rem 0.2rem 0.5rem #c8d0e7,
    inset -0.2rem -0.2rem 0.5rem #ffffff;
}
.call_container {
  margin-top: 5%;
  width: 100%;
  height: 75%;
  display: flex;
  flex-wrap: wrap; /* 当卡片数量超过一行时自动换行 */
  justify-content: space-between; /* 在每排之间均匀分布卡片 */
}
.card {
  width: 20%;
  height: 10%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
