class utils {
  // 返回 count 个名字
  static getRandomObjectsFromArray(array, count) {
    if (!Array.isArray(array) || array.length === 0 || count <= 0) {
      return [];
    }
    const shuffledArray = array.slice();
    const result = [];
    let remainingCount = count;
    while (remainingCount > 0 && shuffledArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * shuffledArray.length);
      result.push(shuffledArray[randomIndex].uName); // 只将 name 属性的值加入结果数组
      shuffledArray.splice(randomIndex, 1);
      remainingCount--;
    }
    return result;
  }
}
export default utils