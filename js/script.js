// this is where profile info will appear
const profileInfo = document.querySelector('.overview');
// my username
const userName = 'benjamin-gdwn';
// store ul list repo-list
const repoList = document.querySelector('.repo-list');


// create function to fetch my information github
const getProfile = async function () {

    const profileRequest = await fetch(`https://api.github.com/users/${userName} `);
    const newProfile = await profileRequest.json();
    // console.log(newProfile)
    // call the profile data function so it displays with the data request
    getUserData(newProfile);
}
getProfile();
// function to collect data from requeast and display.
const getUserData = function(data) {
    // create a div
    const userInfo = document.createElement('div');
    // give it a class
    userInfo.classList.add('user-info');
    // display those variables with HTML
    userInfo.innerHTML = 
    `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos} </p>
    </div>`;
    // stick that HTML in the overview
    profileInfo.append(userInfo);
    fetchRepos();
}

// function to collect repos from github
const fetchRepos = async function () {
    // added parameters to display recently updated and 100per page
    const repoRequest = await fetch(`https://api.github.com/users/${userName}/repos?sort=updated&per_page=100`);
    const newRepos = await repoRequest.json();
    // console.log(newRepos)
    getRepoData(newRepos);
}
// fetchRepos();
const getRepoData = function (repos) {
    for (let repo of repos) {
        const createRepoList = document.createElement('li');
        createRepoList.classList.add('repo');
        createRepoList.innerHTML = `<h3>${repo.name}`; 
        repoList.append(createRepoList);
    }

}
