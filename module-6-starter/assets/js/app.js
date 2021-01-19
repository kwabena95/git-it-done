let getUserRepos = (user) => {
    // format git API for a specific user
    let apiURL = `https://api.github.com/users/${user}/repos`;

    fetch(apiURL).then((res) => {
        // JSON method returns a promise hence the .then()
        res.json().then((data) => {
            console.log(data);
        });
    });
};
getUserRepos('facebook');
