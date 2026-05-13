export default class PrioritiesService {
	constructor(repo) {
		this.repo = repo
	}

	async listPriorities() {
		return this.repo.listPriorities()
	}
}
