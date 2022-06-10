// this is where profile info will appear
const profileInfo = document.querySelector('.overview');
// my username
const userName = 'benjamin-gdwn';
// store ul list repo-list
const repoList = document.querySelector('.repo-list');
//  store repo-data section
let repoData = document.querySelector('.repo-data');
//  store where repo info appears
const repos = document.querySelector('.repos');



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
    // Call the async function once profile data is compiled
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
    // loop through each repo and create list items, with repo name as h3
    for (let repo of repos) {
        const createRepoList = document.createElement('li');
        createRepoList.classList.add('repo');
        createRepoList.innerHTML = `<h3>${repo.name}`; 
        // append list items to ul
        repoList.append(createRepoList);
    }

}

// create click event to see if user clicks on h3
repoList.addEventListener('click', function(e) {
    // if they do then..
    if(e.target.matches('h3')) {
        // target innertext
        const repoName = e.target.innerText;
        // call async function to repo Info
        getRepoInfo(repoName);
    }
})

// function get specific repo info
const getRepoInfo = async function (repoName) {

    const repoInfoRequest = await fetch(`https://api.github.com/repos/${userName}/${repoName}`);
    const repoInfo = await repoInfoRequest.json();
    console.log(repoInfo);
    // create an array of languages
    const fetchLanguages = await fetch(`https://api.github.com/repos/${userName}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData)
    let languages = [];
    for (let language in languageData){
        languages.push(language);
        console.log(languages)
        // console.log(language, languageData[language])
    }
    displayRepoInfo(repoInfo, languages)
}

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = '';
    const newRepoDiv = document.createElement('div');
    
    newRepoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(newRepoDiv);
    repoData.classList.remove('hide');
    repos.classList.add('hide');
}