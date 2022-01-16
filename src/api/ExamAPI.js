import Base from './Base';

export default class ExamAPI extends Base {
  getExams = async (id) =>
    this.sendRequest({
      path: `/api/Class/${id}/test`,
    });

  getExamInformation = async (id) =>
    this.sendRequest({
      path: `/api/Test/${id}/information`,
    });
}
