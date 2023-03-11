// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');
// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

/*     // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');
    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;
 */
    requestSearchQuery()
    .then(response => response.json())
    .then(data => {
      let items = data.items;
      console.log(items);
        for (let j in items){
          console.log(items[j]);
        if (data.message === "Not Found") {
          let ul = document.getElementById('userRepos');
          let li = document.createElement('li');
          li.classList.add('list-group-item');
          li.innerHTML= (`<p><strong>No Results</strong></p>`);
          ul.appendChild(li); 
        }else{ 

          let ul = document.getElementById('userRepos');

          // Create variable that will create li's to be added to ul
          let li = document.createElement('li');

          // Add Bootstrap list item class to each li
          li.classList.add('list-group-item')

          // Create the html markup for each li
          li.innerHTML = (`
      <p><strong>Repo:</strong> ${items[j].name}</p>
      <p><strong>Description:</strong> ${items[j].description}</p>
      <p><strong>URL:</strong> <a href="${items[j].html_url}">${items[j].html_url}</a></p>
  `);

          // Append each li to the ul
          ul.appendChild(li);
      }
      
        }
    })
/* 
    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github
            for (let i in data) {
                // Get the ul with id of userRepos

                if (data.message === "Not Found") {
                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')
                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${gitHubUsername}</p>`);
                    // Append each li to the ul
                    ul.appendChild(li);
                } else {

                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);

                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })*/
})
 

function requestUserRepos(username) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
}
function requestSearchQuery() {
  // create a variable to hold the `Promise` returned from `fetch`
  return Promise.resolve(fetch(`https://api.github.com/search/repositories?q=stars:>=10000&sort=stars&order=desc`));
}