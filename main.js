class View {
	constructor() {
		this.app = document.getElementById('app');

		this.title = this.createElement('h1', 'title');
		this.title.textContent = 'Github Search Repositories';

		this.searchLine = this.createElement('div', 'search-line');
		this.searchInput = this.createElement('input', 'search-input');
		this.searchCounter = this.createElement('span', 'counter');
		this.addedRepositories = this.createElement(
			'div',
			'add-repositories-wrapper'
		);
		this.addedRepository = this.createElement('div', 'add-repository');
		this.searchLine.append(this.searchInput);
		this.searchLine.append(this.searchCounter);

		this.repositoriesWrapper = this.createElement(
			'div',
			'repositories-wrapper'
		);
		this.repositoriesList = this.createElement('ul', 'repositories');
		this.repositoriesWrapper.append(this.repositoriesList);

		this.main = this.createElement('div', 'main');
		this.main.append(this.repositoriesWrapper);

		this.app.append(this.title);
		this.app.append(this.searchLine);
		this.app.append(this.main);
	}

	createElement(elementTag, elementClass) {
		const element = document.createElement(elementTag);
		if (elementClass) {
			element.classList.add(elementClass);
		}
		return element;
	}

	createRepository(repositoryData) {
		const repositoryElement = this.createElement('li', 'repository-prev');
		repositoryElement.innerHTML = `<span class="repository-prev-name">${repositoryData.name}</span>`;
		this.repositoriesList.append(repositoryElement);
	}
}

const REPOSITORIES_PER_PAGE = 5;

class Search {
	constructor(view) {
		this.view = view;

		this.view.searchInput.addEventListener(
			'keyup',
			this.searchRepositories.bind(this)
		);

		this.view.repositoryElement.addEventListener(
			'click',
			this.addRepository.bind(this)
		);
	}

	async searchRepositories() {
		return await fetch(
			`https://api.github.com/search/repositories?q=${this.view.searchInput.value}&per_page=${REPOSITORIES_PER_PAGE}`
		).then(res => {
			if (res.ok) {
				res.json().then(res => {
					res.items.forEach(repository =>
						this.view.createRepository(repository)
					);
				});
			}
		});
	}

	addRepository() {}
}

new Search(new View());
