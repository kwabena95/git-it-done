// UI elements
const userFormEl = document.querySelector('#user-form');
const nameInputEl = document.querySelector('#username');
const repoContainerEl = document.querySelector('#repos-container');
const repoSearchTerm = document.querySelector('#repo-search-term');

// formSubmitHandler
const formSubmitHandler = (e) => {
    e.preventDefault();
    let username = nameInputEl.value.trim();
    if (username) {
        // call getUserrepos
        getUserRepos(username);
        // clear out input
        nameInputEl.value = '';
    } else {
        alert('Please enter a Github username');
    }
}

// request gitHub user API
const getUserRepos = (user) => {
    // format git API for a specific user
    let apiURL = `https://api.github.com/users/${user}/repos`;

    fetch(apiURL).then((res) => {
        // error handling
        if (res.ok) {
            // JSON method returns a promise hence the .then()
            res.json().then((data) => {
                // call displayRepos
                displayRepos(data, user);
            });
        } else {
            alert(`Error: ${res.statusText}`);
        }

    }).catch((error) => {
        // handling network error
        alert('Unable to connect to GitHub');
    });
};

// display repo
const displayRepos = (repos, searchTerm) => {
    // clear old content
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm;

    // loop over repositories
    for (let i = 0; i < repos.length; i++) {
        // format repo name
        const repoName = `${repos[i].owner.login} / ${repos[i].name}`;

        // create a container for each repo
        const repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

        // create a span element to hold repository name
        const titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        // append to container
        repoEl.append(titleEl);

        // create a status element
        const statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        // check if current repo has issue or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = `
            <i class='fas fa-times status-icon icon-danger'></i>${repos[i].open_issues_count} issue(s)`;
        } else {
            statusEl.innerHTML = `<i class='fas fa-check-square status-icon icon-success'></i>`
        }

        // check if api returned any repos
        if (repos.length === 0) {
            repoContainerEl.textContent = 'No repositories found';
            return;
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
}

// add event listener
userFormEl.addEventListener('submit', formSubmitHandler);