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

  getLearn = async (id) => {
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

  creatTask = async (mId, cId, [{data},{data1}]) => {
    return this.sendRequest({
      path: `/api/Task/module/${mId}/class/${cId}`,
      method: 'POST',
      data,
      data1
    })
  }

//get pages
  getPages = async (cId, mId) => {
    return this.sendRequest({
      path: `/api/Content/class/${cId}/module/${mId}/pages`,
      method: 'GET'
    });
  };

  getDiscussionUnit = async (mId) => {
    return this.sendRequest({
    path: `/api/Discussion/module/${mId}`,
    method: 'GET',
    });
  };

  createDiscussion = async (id, cId, data) => {
    return this.sendRequest({
      path: `/api/Discussion/module/${id}/class/${cId}`,
      method: 'POST',
      data
    });
  };

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
