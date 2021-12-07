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

  createCourseUnit = async (id, data) => {
    return this.sendRequest({
      path: `/api/Module/course/${id}/item/1`,
      method: 'POST',
      data
    });
  };

  getCourseUnit = async (id, data) => {
    return this.sendRequest({
      path: `/api/Module/course/${id}/item/1`,
      method: 'GET',
    });
  };

  getCourseUnitPages = async (courseid, moduleid) => {
    return this.sendRequest({
      path: `/api/Content/course/${courseid}/module/${moduleid}/pages`,
      method: 'GET',
    });
  };

  getCourseUnitPagesContent = async (courseid, moduleid, pagesid) => {
    return this.sendRequest({
      path: `/api/Content/course/${courseid}/module/${moduleid}/pages/${pagesid}`,
      method: 'GET',
    });
  };

  createLesson = async (courseid, moduleid, data) => {
    return this.sendRequest({
      path: `/api/Content/course/${courseid}/module/${moduleid}`,
      method: 'POST',
      data
    });
  };

  editLesson = async (courseid, moduleid, data) => {
    return this.sendRequest({
      path: `/api/Content/course/${courseid}/module/${moduleid}`,
      method: 'PUT',
      data
    });
  };

  getExamInformation = async (id) => {
    return this.sendRequest({
      path: `/api/Test/module/${id}`,
      method: 'GET',
    });
  };
  
  
  createExam = async (moduleid, data) => {
    return this.sendRequest({
      path: `/api/Test/module/${moduleid}`,
      method: 'POST',
      data
    });
  };

}