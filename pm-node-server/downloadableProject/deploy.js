const userData = require("./src/config/userData");
let { githubId } = userData;
const ghpages = require("gh-pages");
const pathname = `${__dirname}/build`;
const repoURL =
  "https://github.com/" + githubId + "/" + githubId + ".github.io.git";

ghpages.publish(
  pathname,
  {
    branch: "master",
    repo: repoURL,
  },
  (err) => {
    if (err) console.log("ERROR: ", err);
    else {
      console.log("\nIt's Live!");
      console.log(
        "\nAccess your published portfolio at: " +
          githubId +
          ".github.io/index.html"
      );
      console.log(
        "\n(You'll have to wait for about 10 minutes for the site to update if this is your first hosting. Meanwhile, you can have a cup of coffee and text your mum; she'll like it :))"
      );
    }
  }
);
