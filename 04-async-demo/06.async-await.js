console.log("Before");

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (e) {
    console.log("Error ", e);
  }
}
displayCommits();
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
      //   resolve(["repo1", "repo2", "repo3"]);
      reject(new Error("Could not get the repos."));
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
