import Base from './Base';

export default class ClassesAPI extends Base {
  getClasses = async (id) => {
    return this.sendRequest({
      path: `/api/Teacher/${id}/classes`,
      method: 'GET'
    });
  };
  createClasses = async data => {
    return this.sendRequest({
      path: `/api/Class`,
      method: 'POST',
      data
    });
  };
  editClasses = async (id, data) => {
    return this.sendRequest({
      path: `/api/Class/${id}`,
      method: 'PUT',
      data
    });
  };

  deleteClasses = async (id) =>{
    return this.sendRequest({
      path: `/api/Class/${id}`,
      method: 'DELETE'
    })
  }

  getModule = async (id) => {
    return this.sendRequest({
      path: `/api/Module/course/${id}/item/1`,
      method: 'GET'
    });
  };

  getTaskModule = async (id, moduleId ) => {
    return this.sendRequest({
      path: `/api/Class/${id}/module/${moduleId}/task`,
      method: 'GET'
    });
  };

creatTask = async (mId, cId,  data) => {
    return this.sendRequest({
      path: `/api/Task/module/${mId}/class/${cId}`,
      method: 'POST',
      data,
      
    })
  }

  deleteTasks = async (tId) => {
    return this.sendRequest({
      path: `/api/Task/${tId}`,
      method: 'DELETE'
    })
  }

  deleteDiscussion = async (id) => {
    return this.sendRequest({
      path: `/api/Discussion/${id}`,
      method: 'DELETE'
    })
  }

  updateTask = async (tId, data) =>{
    return this.sendRequest({
      path:`/api/Task/${tId}`,
      method: 'PUT',
      data
    })
  }

  updateDiscussion = async (id, data) =>{
    return this.sendRequest({
      path: `/api/Discussion/${id}`,
      method: 'PUT',
      data
    })
  }
  
  assignDiscussion = async(id, discussionId, data) =>{
    return this.sendRequest({
      path:`/api/Class/${id}/discussion/${discussionId}/assign`,
      method: 'POST',
      data
    })
  }

  updateAssignDiscusion = async(id, discussionId, data) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/discussion/${discussionId}/assign`,
      method: 'PUT',
      data
    })
  }

  createAssignment = async (mId, cId, data) =>{
    return this.sendRequest({
      path: `/api/Assignment/module/${mId}/class/${cId}`,
      method: 'POST',
      data
    })
  }

  delateAssignment = async (aId) => {
    return this.sendRequest({
      path: `/api/Assignment/${aId}`,
      method: 'DELETE'
    })
  }

  updateAssignment = async (aId, data) => {
    return this.sendRequest({
      path: `/api/Assignment/${aId}`,
      method: 'PUT',
      data
    })
  }

  assignAssignment = async (id, assignmentId, data) => {
    return this.sendRequest({
      path: `/api/Class/${id}/assignment/${assignmentId}/assign`,
      method: 'POST',
      data
    })
  }

  updateAssignAssignment = async (id, assignmentId, data) => {
    return this.sendRequest({
      path: `/api/Class/${id}/assignment/${assignmentId}/assign`,
      method: 'PUT',
      data
    })
  }

  assignTask = async (id, taskId, data) => {
    return this.sendRequest({
      path: `/api/Class/${id}/task/${taskId}/assign`,
      method: 'POST',
      data
    })
  }

  updateAssignTask = async (id, taskId, data) => {
    return this.sendRequest({
      path: `/api/Class/${id}/task/${taskId}/assign`,
      method: 'PUT',
      data
    })
  } 

  assignInteractive = async (id, interactiveId, data) => {
    return this.sendRequest({
      path:`/api/Class/${id}/interactive/${interactiveId}/assign`,
      method: 'POST',
      data
    })
  }

  updateAssignInteractive = async (id, interactiveId, data) => {
    return this.sendRequest({
      path:`/api/Class/${id}/interactive/${interactiveId}/assign`,
      method: 'PUT',
      data
    })
  }

  createAnnouncementClass = async (typeId, data) => {
    return this.sendRequest({
      path:`/api/Announcement/type/${typeId}/reference`,
      method: 'POST',
      data
    })
  }

  getAnnouncementClass = async(classId) => {
    return this.sendRequest({
      path: `/api/Announcement/class/${classId}`,
      method: 'GET'
    })
  }

  deleteAnnouncement = async(id) => {
    return this.sendRequest({
      path: `/api/Announcement/${id}`,
      method: 'DELETE'
    })
  }

  updateAnnouncement = async (id, data) => {
    return this.sendRequest({
      path: `/api/Announcement/${id}`,
      method: 'PUT',
      data
    })
  }

  getFeedClass = async (id) => {
    return this.sendRequest({
      path: `/api/Class/${id}/feed`,
      method: 'GET'
    })
  }

  getArchive = async () => {
    return this.sendRequest({
      path:`/api/Class/archive`,
      method:'GET'
    })
  }

  retrieveArchive = async(id) => {
    return this.sendRequest({
      path: `/api/Class/${id}/archive/retrieve`,
      method: 'POST'
    })
  }

//get pages
  getPages = async (cId, mId) => {
    return this.sendRequest({
      path: `/api/Content/class/${cId}/module/${mId}/pages`,
      method: 'GET'
    });
  };

  getDiscussionUnit = async (classId,moduleId) => {
    return this.sendRequest({
      path: `/api/Class/${classId}/module/${moduleId}/discussionwithresponse`,
      method: 'GET'
    });
  };

  createDiscussionModule = async (moduleId, classId, data) =>{
    return this.sendRequest({
      path: `/api/Discussion/module/${moduleId}/class/${classId}`,
      method: 'POST',
      data
    })
  }

  getContent = async (cId, mId, pId) => {
    return this.sendRequest({
    path: `/api/Content/class/${cId}/module/${mId}/pages/${pId}`,
    method: 'GET',
    });
  }

  getLink = async (id, typeId) => {
    return this.sendRequest({
      path: `/api/Class/${id}/link/type/${typeId}`,
      method: 'GET',
    });
  }

  createLinks = async (id, typeId, data) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/link/type/${typeId}`,
      method: 'POST',
      data
    })
  }

  deleteLinks = async (id, linkId) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/link/${linkId}`,
      method: 'DELETE'
    })
  }
  
  getStudentList = async (id, isAccepted) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/student/status/${isAccepted}`,
      method: 'GET'
    })
  }
  getStudentEnrolledList = async (id, isAccepted) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/student/status/${isAccepted}`,
      method: 'GET'
    })
  }

  acceptStudent = async (id, isAccepted, data) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/student/status/${isAccepted}`,
      method: 'PUT',
      data
    })
  }
  removeStudentWaitingList = async (id, data) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/student/status`,
      method: 'PUT',
      data
    })
  }
  removeStudentClassList = async (id, studentId) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/student/${studentId}/status`,
      method: 'DELETE',
    })
  }
  editClassLinks = async (id, linkId, data) => {
    return this.sendRequest({
      path: `/api/Class/${id}/link/${linkId}`,
      method: 'PUT',
      data
    })
  }

  getInteractive = async (id, moduleId) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/module/${moduleId}/interactive`,
      method: 'GET'
    })
  }

  getAssignment = async (id, moduleId) =>{
    return this.sendRequest({
      path: `/api/Class/${id}/module/${moduleId}/assignment`,
      method: 'GET'
    })
  }

  getClassModules = async (id) =>{
    return this.sendRequest({
      path: `/api/Module/class/${id}/item/1`,
      method: 'GET'
    })
  }

  getClassTestModules = async (classid, moduleid) =>{
    return this.sendRequest({
      path: `/api/Class/${classid}/module/${moduleid}/test`,
      // path: `/api/Class/${classid}/test/info?moduleId=${moduleid}`,
      method: 'GET'
    })
  }

  getTestReport = async (classid, testid) =>{
    return this.sendRequest({
      path: `/api/Class/${classid}/test/${testid}/report`,
      method: 'GET'
    })
  }

  getClassAssignmentModules = async (classid, moduleid) =>{
    return this.sendRequest({
      path: `/api/Class/${classid}/module/${moduleid}/assignment`,
      method: 'GET'
    })
  }

  getAssignmentReport = async (classid, assignmentid) =>{
    return this.sendRequest({
      // path: `/api/Class/${classid}/assignment/report`,
      path: `/api/Class/${classid}/assignment/${assignmentid}/report`,
      method: 'GET'
    })
  }

  getClassTaskModules = async (classid, moduleid) =>{
    return this.sendRequest({
      path: `/api/Class/${classid}/module/${moduleid}/task`,
      method: 'GET'
    })
  }

  getTaskReport = async (classid, taskid) =>{
    return this.sendRequest({
      // path: `/api/Class/${classid}/task/report`,
      path: `/api/Class/${classid}/task/${taskid}/report`,
      method: 'GET'
    })
  }

  getExamAnalysis = async (studentid, classid, testid) =>{
    return this.sendRequest({
      path: `/api/Student/${studentid}/class/${classid}/test/${testid}/score/analysis`,
      method: 'GET'
    })
  }

  getClassInteractiveModules = async (classid, moduleid) =>{
    return this.sendRequest({
      path: `/api/Class/${classid}/module/${moduleid}/interactive`,
      method: 'GET'
    })
  }

  getInteractiveReport = async (classid, interactiveid) =>{
    return this.sendRequest({
      // path: `/api/Class/${classid}/task/report`,
      path: `/api/Class/${classid}/interactive/${interactiveid}/report`,
      method: 'GET'
    })
  }
  
  considerAnswerExamTrue = async (studentid, classid, testid, answerid, data) =>{
    return this.sendRequest({
      path:`/api/Student/${studentid}/class/${classid}/test/${testid}/answer/${answerid}`,
      method: 'PUT',
      data
    });
  };

}
