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

  createExam = async (classId, moduleId, data) =>
    this.sendRequest({
      path: `/api/Test/module/${moduleId}/class/${classId}`,
      method: "POST",
      data,
    });

  deleteExam = async (id) =>
    this.sendRequest({
      path: `/api/Test/${id}`,
      method: "DELETE",
    });

  addPart = async (id, typeId, data) =>
    this.sendRequest({
      path: `/api/Test/${id}/part/${typeId}`,
      method: "POST",
      data,
    });

  getParts = async (id) =>
    this.sendRequest({
      path: `/api/Test/${id}/part`,
    });

  deletePart = async (id) =>
    this.sendRequest({
      path: `/api/TestPart/${id}`,
      method: "DELETE",
    });

  deleteQuestion = async (id) =>
    this.sendRequest({
      path: `/api/Question/${id}`,
      method: "DELETE",
    });

  addEssay = async (id, partId, data) =>
    this.sendRequest({
      path: `/api/Test/${id}/part/${partId}/question/type/essay`,
      method: "POST",
      data,
    });

  editEssay = async (id, data) =>
    this.sendRequest({
      path: `/api/Question/${id}`,
      method: "PUT",
      data,
    });

  addIdentification = async (id, partId, data) =>
    this.sendRequest({
      path: `/api/Test/${id}/part/${partId}/question/type/identification`,
      method: "POST",
      data,
    });

  editIdentification = async (id, data) =>
    this.sendRequest({
      path: `/api/Question/${id}`,
      method: "PUT",
      data,
    });

  editIdentificationAnswer = async (id, data) =>
    this.sendRequest({
      path: `/api/Choices/${id}`,
      method: "PUT",
      data,
    });

  addTrueOrFalse = async (id, partId, data) =>
    this.sendRequest({
      path: `/api/Test/${id}/part/${partId}/question/type/trueorfalse`,
      method: "POST",
      data,
    });

  editTrueOrFalse = async (id, data) =>
    this.sendRequest({
      path: `/api/Question/${id}`,
      method: "PUT",
      data,
    });
    
  editTrueOrFalseAnswer = async (id, data) =>
    this.sendRequest({
      path: `/api/Choices/${id}`,
      method: "PUT",
      data,
    });

  
  addMultipleChoice = async (id, partId, data) =>
    this.sendRequest({
      path: `/api/Test/${id}/part/${partId}/question/type/multiplechoice`,
      method: "POST",
      data,
    });
    
  editMultipleChoice = async (id, data) =>
    this.sendRequest({
      path: `/api/Question/${id}`,
      method: "PUT",
      data,
    });

  editMultipleChoiceAnswer = async (id, data) =>
    this.sendRequest({
      path: `/api/Choices/${id}`,
      method: "PUT",
      data,
    });
}
