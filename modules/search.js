export class Search {
	constructor(view, api) {
		this.view = view;
		this.api = api;

		this.view.searchInput.addEventListener(
			'keyup',
			this.debounce(this.searchRepositories.bind(this), 500)
		);
	}

	searchRepositories() {
		const searchValue = this.view.searchInput.value;
		if (searchValue) {
			this.clearRepositories();
			this.api.searchRepositories(searchValue).then(res => {
				if (res.ok) {
					res.json().then(res => {
						res.items.forEach(repository =>
							this.view.createRepository(repository)
						);
					});
				}
			});
		} else {
			this.clearRepositories();
		}
	}

	clearRepositories() {
		this.view.repositoriesList.innerHTML = '';
	}

	debounce(func, wait, immediate) {
		let timeout;
		return function () {
			const context = this,
				args = arguments;
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
}
