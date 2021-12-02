import Base from './Base';

export default class ClassesAPI extends Base {
  getClasses = async () => {
    return this.sendRequest({
      path: `/api/Class`,
      method: 'GET'
    });
  };
}
