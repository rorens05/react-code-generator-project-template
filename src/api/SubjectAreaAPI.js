import Base from './Base';

export default class SubjectAreaAPI extends Base {
  getSubjectArea = async () => {
    return this.sendRequest({
      path: `/api/SubjectArea`,
      method: 'GET'
    });
  };

}