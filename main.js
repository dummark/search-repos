class View {
	constructor() {
		this.app = document.getElementById('app');

		this.title = this.createElement('h1', 'title');
		this.title.textContent = 'Github Search Repositories';

		this.searchLine = this.createElement('div', 'search-line');
		this.searchInput = this.createElement('input', 'search-input');
		this.searchCounter = this.createElement('span', 'counter');
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
}

class Search {
	constructor(view) {
		this.view = view;

		this.view.searchInput.addEventListener('keyup', this.searchRepositories());
	}

	searchRepositories() {}
}

new Search(new View());
