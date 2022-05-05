
import Base from './Base';

export default class SchoolAPI extends Base {
  index = async () => {
    return this.sendRequest({
      path: `/api/DynamicTable/School`,
    });
  };
  
  show = async id => {
    return this.sendRequest({
      path: `/api/DynamicTable/School/id`,
    });
  }

  create = async data => {
    return this.sendRequest({
      path: `/api/DynamicTable/School`,
      method: 'POST',
      data,
    });
  }

  update = async (id, data) => {
    return this.sendRequest({
      path: `/api/DynamicTable/School/id`,
      method: 'PUT',
      data,
    });
  }

  destroy = async id => {
    return this.sendRequest({
      path: `/api/DynamicTable/School/id`,
      method: 'DELETE',
    });
  }
}

  