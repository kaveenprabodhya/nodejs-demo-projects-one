console.log("Before");
readUserData(1, getRepositoriesData);
console.log("After");

function getRepositoriesData(user) {
  console.log("User ", user);
  getRepositories(user.gitHubUsername, getCommitsData);
}

function getCommitsData(repo) {
  console.log("Repositories: ", repo);
  getCommits(repo[0], displayCommits);
}

function displayCommits(commits) {
  console.log("Commits: ", commits);
}

function readUserData(id, callback) {
  setTimeout(() => {
    console.log("Reading user data from database...");
    callback({ id: id, gitHubUsername: "Kaveen" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling github repositories...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(commits, callback) {
  setTimeout(() => {
    console.log("Reading Commits...");
    callback([
      "commit1",
      "commit2",
      "commit3",
      "commit4",
      "commit5",
      "commit6",
    ]);
  }, 1000);
}
