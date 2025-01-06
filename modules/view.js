export class View {
	constructor(api) {
		this.app = document.getElementById('app');
		this.api = api;

		this.title = this.createElement('h1', 'title');
		this.title.textContent = 'Github Search Repositories';

		this.searchLine = this.createElement('div', 'search-line');
		this.searchInput = this.createElement('input', 'search-input');
		this.searchCounter = this.createElement('span', 'counter');
		this.addedRepositoriesWrapper = this.createElement(
			'div',
			'add-repositories-wrapper'
		);
		this.addedRepository = this.createElement('div', 'add-repository');
		this.addedRepositories = [];

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
		this.main.append(this.addedRepositoriesWrapper);

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

		repositoryElement.addEventListener('click', () => {
			if (!this.addedRepositories.some(repo => repo.id === repositoryData.id)) {
				this.addRepository(repositoryData);
				this.addedRepositories.push(repositoryData);
			}

			this.searchInput.value = '';
			this.clearRepositories();
		});

		repositoryElement.innerHTML = `<span class="repository-prev-name">${repositoryData.name}</span>`;
		this.repositoriesList.append(repositoryElement);
	}

	addRepository(repo) {
		const reposEl = this.createElement('div', 'add-repository');

		const infoRepo = `<p>Name: ${repo.name}</p>
            <p>Owner: ${repo.owner.login}</p>
            <p>Stars: ${repo.stargazers_count}</p>`;

		const removeBtn = this.createElement('button', 'remove-repo-btn');
		removeBtn.textContent = '✖';
		removeBtn.addEventListener('click', () => {
			reposEl.remove();
			this.addedRepositories = this.addedRepositories.filter(
				r => r.id !== repo.id
			);
		});

		reposEl.innerHTML = infoRepo;
		reposEl.appendChild(removeBtn);

		this.addedRepositoriesWrapper.appendChild(reposEl);
	}

	clearRepositories() {
		this.repositoriesList.innerHTML = '';
	}
}
