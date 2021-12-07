import Base from './Base';

export default class ClassesAPI extends Base {
  getClasses = async () => {
    return this.sendRequest({
      path: `/api/Class`,
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
}
