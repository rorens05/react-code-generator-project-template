import Base from "./Base";

export default class DiscussionAPI extends Base {
  PostDiscussion = async (data) => {
    return this.sendRequest({
      path: `/api/Discussion/module/4/class/4`,
      	method: 'POST',
        data
    });
    };
		getClassInfo = async () => {
			return this.sendRequest ({
				path: `/api/Class/4/student/status/true`,
				method: 'GET',
			});
		}

  }