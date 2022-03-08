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
  deleteClassFile = async(data) => {
    return this.sendRequest({
      path: `/api/Class/${data.classId}/files/${data.fileId}`,
      method: 'DELETE'
    });
  };

  deleteCourseFile = async(data) => {
    return this.sendRequest({
      path: `/api/Course/${data.courseId}/files/${data.fileId}`,
      method: 'DELETE'
    });
  };

  editClassFile = async(data) => {
    return this.sendRequest({
      path: `/api/class/${data.classId}/files/${data.fileId}`,
      method: 'PUT',
      data: data.fileData
    });
  };

  editCourseFile = async(data) => {
    return this.sendRequest({
      path: `/api/course/${data.courseId}/files/${data.fileId}`,
      method: 'PUT',
      data: data.fileData
    });
  }

}
