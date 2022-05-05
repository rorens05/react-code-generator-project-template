
import Base from './Base';

export default class StudentsAPI extends Base {
  index = async () => {
    return this.sendRequest({
      path: `/api/DynamicTable/Students`,
    });
  };
  
  show = async id => {
    return this.sendRequest({
      path: `/api/DynamicTable/Students/id`,
    });
  }

  create = async data => {
    return this.sendRequest({
      path: `/api/DynamicTable/Students`,
      method: 'POST',
      data,
    });
  }

  update = async (id, data) => {
    return this.sendRequest({
      path: `/api/DynamicTable/Students/id`,
      method: 'PUT',
      data,
    });
  }

  destroy = async id => {
    return this.sendRequest({
      path: `/api/DynamicTable/Students/id`,
      method: 'DELETE',
    });
  }
}

  