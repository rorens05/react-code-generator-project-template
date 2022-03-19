import Base from './Base';

export default class SchoolAPI extends Base {

  getSchoolLogo = async () => {
    return this.sendRequest({
      path:`/api/School/logo`,
      method: 'GET'
    })
  }

  updateSchoolLogo = async (data) => {
    return this.sendRequest({
      path:`/api/School/logo`,
      method: 'POST',
      data
    })
  }

  getSchoolTheme = async () => {
    return this.sendRequest({
      path:`/api/School/Theme`,
      method:'GET'
    })
  }

  updateSchoolTheme = async (data) => {
    return this.sendRequest({
      path:`/api/School/Theme`,
      method:'PUT',
      data
    })
  }
}