class Random {
    /**
   * 从给定的姓名数组中随机返回一个姓名。
   * @param {Array} namesArray - 包含姓名的数组。
   * @returns {string} - 随机选择的姓名。
   * @throws {Error} - 如果输入不是一个非空数组，则抛出错误。
   */
    static getRandomName(namesArray) {
        // 首先，检查输入是否是一个非空数组。
        if (!Array.isArray(namesArray)) {
            throw new Error('输入必须是一个数组');
        }
        if (namesArray.length === 0) {
            throw new Error('输入数组不能为空');
        }
        // 将随机小数乘以数组长度，然后使用Math.floor()取整数部分，以获取随机索引。
        const randomIndex = Math.floor(Math.random() * namesArray.length);

        // 返回随机选择的姓名。
        return namesArray[randomIndex];
    }

    // 将抽取的姓名生成dom并添加的html中
    static addNameToHtml(name) {
        // 生成dom
        const divElement = document.createElement("div");
        divElement.className = "card";
        divElement.textContent = `${name}`;
        return divElement
    }
}

// 类创建点名器
// class RandomPicker {
//     constructor(studentList) {
//         this.studentList = studentList;
//         this.observers = [];
//         this.isPicking = false;
//         this.interval = null;
//     }
//     notifyObservers(student) {
//         this.observers.forEach(observer => observer(student));
//     }
//     // 开始点名
//     startPicking() {
//         if (!this.isPicking) {
//             this.isPicking = true;
//             this.interval = setInterval(() => {
//                 const randomIndex = Math.floor(Math.random() * this.studentList.length);
//                 const selectedStudent = this.studentList[randomIndex];
//                 this.notifyObservers(selectedStudent);
//             }, 100);
//         }
//     }
//     // 停止点名
//     stopPicking() {
//         if (this.isPicking) {
//             this.isPicking = false;
//             clearInterval(this.interval);
//         }
//     }
//     // 添加监听对象
//     addObserver(observer) {
//         this.observers.push(observer);
//     }
// }

export default Random ;