// UI elements
const issueContainerEl = document.querySelector('#issues-container');


// request repo issues
const getRepoIssues = (repo) => {
    const apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
    fetch(apiUrl).then(res => {
        // request was successful
        if (res.ok) {
            res.json().then(data => {
                displayIssues(data);
            });
        } else {
            alert('There was a problem with your request!');
        }

    });
}

// display issues
const displayIssues = (issues) => {
    // check if theres no issue then display a message
    if (issues.length === 0) {
        issueContainerEl.textContent = 'This repo has no open issues!';
    }

    // loop through the response
    for (let i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        const issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');

        // create a span to hold issues title
        const titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        const typeEl = document.createElement('span');

        // check if issue is an actual issue or a pull request
        (issues[i].pull_request) ? typeEl.textContent = '(Pulled request)' : typeEl.textContent = '(Issue)';

        // append to container
        issueEl.appendChild(typeEl);

        // append the link to container
        issueContainerEl.appendChild(issueEl);
    }


}

getRepoIssues('facebook/react');