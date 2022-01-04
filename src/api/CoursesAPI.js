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
      path: `/api/Content/course/${courseid}/module/${moduleid}`,
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

  editLesson = async (id, data) => {
    return this.sendRequest({
      path: `/api/Content/${id}`,
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

  createAssignment = async (moduleid, data) => {
    return this.sendRequest({
      path: `/api/Assignment/module/${moduleid}`,
      method: 'POST',
      data
    });
  };

  createTask = async (moduleid, data) => {
    return this.sendRequest({
      path: `/api/Task/module/${moduleid}`,
      method: 'POST',
      data
    });
  };

  createDiscussion = async (moduleid, data) => {
    return this.sendRequest({
      path: `/api/Discussion/module/${moduleid}`,
      method: 'POST',
      data
    });
  };


  editExam = async (moduleid, data) => {
    return this.sendRequest({
      path: `/api/Test/module/${moduleid}`,
      method: 'PUT',
      data
    });
  };

  editTask = async (moduleid, data) => {
    return this.sendRequest({
      path: `/api/Task/module/${moduleid}`,
      method: 'PUT',
      data
    });
  };

  editDiscussion = async (moduleid, data) => {
    return this.sendRequest({
      path: `/api/Discussion/module/${moduleid}`,
      method: 'PUT',
      data
    });
  };

  editAssignment = async (moduleid, data) => {
    return this.sendRequest({
      path: `/api/Assignment/module/${moduleid}`,
      method: 'PUT',
      data
    });
  };

  getDiscussionInformation = async (id) => {
    return this.sendRequest({
      path: `/api/Discussion/module/${id}`,
      method: 'GET',
    });
  };

  getAssignmentInformation = async (id) => {
    return this.sendRequest({
      path: `/api/Assignment/module/${id}`,
      method: 'GET',
    });
  };

  getTaskInformation = async (id) => {
    return this.sendRequest({
      path: `/api/Task/module/${id}`,
      method: 'GET',
    });
  };

  getVideosLinks = async (id) => {
    return this.sendRequest({
      path: `/api/Course/${id}/link/type/2`,
      method: 'GET',
    });
  };

  getConferencesLinks = async (id) => {
    return this.sendRequest({
      path: `/api/Course/${id}/link/type/1`,
      method: 'GET',
    });
  };

  getLinks = async (id) => {
    return this.sendRequest({
      path: `/api/Course/${id}/link/type/3`,
      method: 'GET',
    });
  };

  deleteLesson = async (id, data) => {
    return this.sendRequest({
      path: `/api/Content/${id}`,
      method: 'DELETE',
      data
    });
  };

  



}