import request from '@/util/request';
// 获取全部学生信息

class APIs {
  static getStudents = () => {
    return request.get(`/api/students`)
  }

  // 获取学生信息
  static getStudent = (id) => {
    return request.get(`/api/students/${id}`)
  }

  // 获取总人数
  static getTotal = () => {
    return request.get(`/api/students/total`)
  }
}

export default APIs
