<template>
  <div class="container">
    <p>
      抽取人数: <input type="number" v-model="count" @input="handleChange" />
    </p>

    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { defineProps, defineEmits, ref } from 'vue'

export default {
  setup(props, context) {
    // 使用defineProps获取父组件传递的属性（如果有的话）
    const propsData = defineProps({})

    // 使用defineEmits定义一个触发事件的方法（如果需要）
    const emit = defineEmits(context)

    // 使用ref创建响应式数据
    const count = ref(1)

    // 增加计数的方法
    function increment() {
      count.value++
    }
    // 减少计数的方法
    function decrement() {
      if (count.value > 0) {
        count.value--
      }
    }

    // 监听输入框变化的方法
    function handleChange(event) {
      const value = parseInt(event.target.value)
      if (!isNaN(value)) {
        count.value = value
      }
    }

    // 返回数据和方法给模板
    return {
      count,
      increment,
      decrement,
    }
  },
}
</script>

<style scoped>
.container {
  font-size: 1rem;
}

input {
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  width: 3rem;
  /* height: 3rem; */
  appearance: none;
  -moz-appearance: textfield; /* Firefox */
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
