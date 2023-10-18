<template>
  <div class="container">
    <p>
      抽取人数: <input type="number" v-model="count" @input="handleChange" />
    </p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
// 使用defineEmits定义一个触发事件的方法（如果需要）
const emit = defineEmits(['count-changed'])
// 使用ref创建响应式数据
const count = ref(2)
// 增加计数的方法
function increment() {
  if (count.value > 35) {
    alert('最多支持35人')
    return
  }
  count.value++
  handleChange()
}
// 减少计数的方法
function decrement() {
  if (count.value > 2) {
    count.value--
    handleChange()
  }
}
// 监听输入框变化的方法
function handleChange(event) {
  if (count.value > 35) {
    alert('最多支持35人')
    return
  }
  if (event) {
    const value = parseInt(event.target.value)
    if (!isNaN(value)) {
      count.value = value
    }
  }
  emit('count-changed', count.value)
}
</script>

<style scoped>
.container {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container p {
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  border: none;
  outline: none;
  text-align: center;
  background: transparent;
  font-size: inherit;
  width: 3rem;
  border-radius: 20px;
  appearance: none;
  background-color: #ccc;
  -moz-appearance: textfield; /* Firefox */
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
