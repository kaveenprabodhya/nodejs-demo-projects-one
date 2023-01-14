console.log("Before");
const user = readUserData(1);
console.log(user);
console.log("After");

function readUserData(id) {
  setTimeout(() => {
    console.log("Reading user data from database...");
    return { id: id, gitHubUsername: "Kaveen" };
  }, 2000);
}
