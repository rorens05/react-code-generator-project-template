import Base from './Base';

export default class ProfileInfoAPI extends Base {

  getStudentInfo = async (id) => {
    return this.sendRequest({
      path:`/api/Student/${id}`,
      method: 'GET'
    })
  }
  getTeacherInfo = async (id) => {
    return this.sendRequest({
      path:`/api/Teacher/${id}`,
      method:'GET'
    })
  }

  updateStudentInfo = async(id, data) => {
    return this.sendRequest({
      path:`/api/Student/${id}`,
      method: 'PUT',
      data
    })
  }

  updateTeacherInfo = async(id, data) => {
    return this.sendRequest({
      path:`/api/Teacher/${id}`,
      method: 'PUT',
      data
    })
  }

}