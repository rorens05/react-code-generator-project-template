import Base from "./Base";

export default class ExamAPI extends Base {
  getExams = async (id) =>
    this.sendRequest({
      path: `/api/Class/${id}/test`,
    });

  getExamInformation = async (id) =>
    this.sendRequest({
      path: `/api/Test/${id}/information`,
    });

  startTest = async (id, classId, testId) =>
    this.sendRequest({
      path: `/api/Student/${id}/class/${classId}/test/${testId}/answer/start`,
      method: "POST",
    });

  endTest = async (id, classId, testId) =>
    this.sendRequest({
      path: `/api/Student/${id}/class/${classId}/test/${testId}/answer/end`,
      method: "POST",
      data: {},
    });

  submitTestPerPart = async (id, classId, testId, partId, data) =>
    this.sendRequest({
      path: `/api/Student/${id}/class/${classId}/test/${testId}/part/${partId}/answer/range`,
      method: "POST",
      data,
    });
}
