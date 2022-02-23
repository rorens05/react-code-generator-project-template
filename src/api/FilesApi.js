import Base from './Base';

export default class GradeAPI extends Base {

  newCourseFile = async (data) => {
    return this.sendRequest({
      path: `/api/Upload/course/${data.id}/file`,
      method: 'POST',
      data: data.data
    });
  };

  getCourseFiles = async (id) => {
    return this.sendRequest({
      path: `/api/Course/${id}/files`,
      method: 'GET'
    });
  };

  newClassFile = async (data) => {
    return this.sendRequest({
      path: `/api/Upload/class/${data.id}/file`,
      method: 'POST',
      data: data.data
    });
  };

  getClassFiles = async (id) => {
    return this.sendRequest({
      path: `/api/Class/${id}/files`,
      method: 'GET'
    });
  };

  getAllClassFiles = async() => {
    return this.sendRequest({
      path: `/api/Class/files`,
      method: 'GET',
    });
  }

  getAllCourseFiles = async() => {
    return this.sendRequest({
      path: `/api/Course/files`,
      method: 'GET',
    });
  }
}
