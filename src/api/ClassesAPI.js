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

}
