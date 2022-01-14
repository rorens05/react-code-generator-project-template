import Base from './Base';

export default class ExamAPI extends Base {
  getExams = async () => {
    return this.sendRequest({
      path: `/api/Class/3/test`,
    });
  };
}
