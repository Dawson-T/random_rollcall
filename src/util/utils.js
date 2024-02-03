class utils {
  static getRandomObjectsFromArray(array, count) {
    if (!Array.isArray(array) || array.length === 0 || count <= 0) {
      return [];
    }

    // 克隆原数组以避免修改原数组
    let tempArray = array.slice();
    let result = [];

    for (let i = 0; i < count; i++) {
      // 随机选择一个元素
      let randomIndex = Math.floor(Math.random() * tempArray.length);
      result.push(tempArray[randomIndex]);

      // 从临时数组中移除已选元素
      tempArray.splice(randomIndex, 1);

      // 如果临时数组为空，或者已经选够了所需数量的元素，就停止循环
      if (tempArray.length === 0 || result.length === count) {
        break;
      }
    }

    return result;
  }


  static toNameArray(array) {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(array[i].uName);
    }
    return result;
  }

  // 在数组范围内容随机Index
  static getRandomIndex(length) {
    return Math.floor(Math.random() * length);
  }
}



export default utils