import Base from './Base';

export default class GradeAPI extends Base {

  newCourseFile = async (data) => {
    return this.sendRequest({
      path: `/api/Upload/course/1/file`,
      method: 'POST',
      data
    });
  };
}
