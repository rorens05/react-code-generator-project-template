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

  getClasses = async () => {
    return this.sendRequest({
      path: `/api/Class`,
      method: 'GET'
    });
  };

  getLearn = async (id) => {
    return this.sendRequest({
      path: `/api/Module/course/${id}/item/1`,
      method: 'GET'
    });
  };

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
}
