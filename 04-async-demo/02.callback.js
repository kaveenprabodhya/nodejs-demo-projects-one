// asynchronous (non-blocking)
console.log("Before");
readUserData(1, function (user) {
  console.log("User ", user);
  getRepositories(user.gitHubUsername, (repo) => {
    console.log("Repositories: ", repo);
    getCommits(repo[0], (commits) => {
      console.log("Commits: ", commits);
    });
  });
});
// this nested function known as callback hell
console.log("After");

// synchronous code sample (blocking code)
// console.log("Before");
// const user = readUserData(1);
// const repo = getRepositories(user.gitHubUsername);
// const commits = getCommits(repo[0]);
// console.log("After");

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
