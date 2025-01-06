const URL = 'https://api.github.com/';
const REPOSITORIES_PER_PAGE = 5;

export class Api {
	async searchRepositories(value) {
		return await fetch(
			`${URL}search/repositories?q=${value}&per_page=${REPOSITORIES_PER_PAGE}`
		);
	}

	loadRepositoryData(repo) {
		console.log(repo);
	}
}
