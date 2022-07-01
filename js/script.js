// this is where profile info will appear
const profileInfo = document.querySelector('.overview');
// my username
const userName = 'benjamin-gdwn';
// store ul list repo-list
const repoList = document.querySelector('.repo-list');
//  store repo-data section
let repoData = document.querySelector('.repo-data');
//  store where repo info appears
let repos = document.querySelector('.repos');
// variable to store the back to repo button
const backButton = document.querySelector('.view-repos');
// variable to to select search by input
const filterInput = document.querySelector('.filter-repos');



// create function to fetch my information github
const getProfile = async function () {

    const profileRequest = await fetch(`https://api.github.com/users/${userName} `);
    const newProfile = await profileRequest.json();
    console.log(newProfile)
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
        // show the seach bar
        filterInput.classList.remove('hide');
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
    // variable to store found languages
    const languageData = await fetchLanguages.json();
    // empty array to store languages in
    let languages = [];
    // loop to go through all languages
    for (let language in languageData){
        languages.push(language);
    }
    // call function that displays repo info in div.
    displayRepoInfo(repoInfo, languages)
}

const displayRepoInfo = function (repoInfo, languages) {
    // empty html 
    repoData.innerHTML = '';
    // variable creating new div
    const newRepoDiv = document.createElement('div');
    // html to be stored in the div
    newRepoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    // add the div to the repo data element
    repoData.append(newRepoDiv);
    // remove hide so it appears
    repoData.classList.remove('hide');
    // hide repo list
    repos.classList.add('hide');
    // remove the back button from hidden view
    backButton.classList.remove('hide');
}

// click even to the back to repos button
backButton.addEventListener('click', function () {
    // return back to main display
    repos.classList.remove('hide');
    // remove individual repo data
    repoData.classList.add('hide');
    // re-hide the back to repo button
    backButton.classList.add('hide');
})

filterInput.addEventListener('input', function(e) {
    // variable to store the input of search bar
    const searchText = e.target.value;
    // variable to select all repos
    const allRepo = document.querySelectorAll('li'); 
    // set search text to lower case
    const lowerSearch = searchText.toLowerCase();
    // loop through li objects to see if any dont match
    for (let repo of allRepo) {
        // store name of repo inner text
        let name = repo.innerText;
        // if it doesnt contain inner text - dynamic value
        if(!`${name}`.includes(lowerSearch)) {
            repo.classList.add('hide')
            // remove hide attribute when deleting search
        } else {
            repo.classList.remove('hide');
        }
    }
})

// ---------------------------------------------
// -------SKILCRUSH WAY -----------------------
// --------------------------------------------
// // Dynamic search
// filterInput.addEventListener("input", function (e) {
//     const searchText = e.target.value;
//     const repos = document.querySelectorAll(".repo");
//     const searchLowerText = searchText.toLowerCase();
  
//     for (const repo of repos) {
//       const repoLowerText = repo.innerText.toLowerCase();
//       if (repoLowerText.includes(searchLowerText)) {
//         repo.classList.remove("hide");
//       } else {
//         repo.classList.add("hide");
//       }
//     }
//   });
