import Base from './Base';

export default class CoursesAPI extends Base {
  getCourses = async () => {
    return this.sendRequest({
      path: `/api/Course`,
      method: 'GET'
    });
  };

  editCourse = async (id, data) => {
    return this.sendRequest({
      path: `/api/Course/${id}`,
      method: 'PUT',
      data
    });
  };

  getCourseInformation = async (id) => {
    return this.sendRequest({
      path: `/api/Course/${id}`,
      method: 'GET'
    });
  }

  createCourse = async data => {
    return this.sendRequest({
      path: `/api/Course`,
      method: 'POST',
      data
    });
  };

}