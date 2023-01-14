console.log("Before");
getUser(1)
  .then((user) => {
    console.log("User ", user);
    getRepositories(user.gitHubUsername).then((repos) => {
      console.log("Repositories: ", repos);
      getCommits(repos[0]).then((commits) => console.log(commits));
    });
  })
  .catch((err) => console.log("Error: ", err));
console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading user data from database...");
      resolve({ id: id, gitHubUsername: "Kaveen" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling github repositories...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading Commits...");
      resolve([
        "commit1",
        "commit2",
        "commit3",
        "commit4",
        "commit5",
        "commit6",
      ]);
    }, 2000);
  });
}
