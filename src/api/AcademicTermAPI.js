import Base from './Base';

export default class AcademicTermAPI extends Base {
  fetchAcademicTerm = async => {
    return this.sendRequest({
      path: `/api/AcademicTerm`,
      method: 'GET'
    });
  };
}