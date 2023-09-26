<template>
  <div>
    <p>抽取人数: {{ count }}</p>
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

    // 返回数据和方法给模板
    return {
      count,
      increment,
      decrement,
    }
  },
}
</script>
