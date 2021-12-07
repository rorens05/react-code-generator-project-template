import Base from "./Base";

export default class DiscussionAPI extends Base {
		getClassInfo = async (id) => {
			return this.sendRequest ({
				path: `/api/Class/${id}/student/status/true`,
				method: 'GET',
			});
		}

  }