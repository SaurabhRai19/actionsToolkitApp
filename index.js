const core = require('@actions/core');
const github = require('@actions/github');
const artifact = require('@actions/artifact');
const artifactClient = artifact.create()


async function run(){
try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
 
  //Octokit Package
  const myToken = core.getInput('myToken');
  const octokit = github.getOctokit(myToken)
  
  const {data: issue} = await octokit.rest.issues.create({
    owner: 'saurabhrai19',
    repo: 'practice_repo',
    title: 'Issue created from custom action app',
  });
  console.log(issue);
  //--------------
  //Cache Dependencies

  const cache = require('@actions/cache');
const paths = [
    'node_modules',
    'packages/*/node_modules/'
]
const key = 'npm-foobar-d5ea0750';
const cacheId = await cache.saveCache(paths, key);

console.log(cacheId);




  //
  /*Artifact Package - Path Issue

  const artifactName = 'my-artifact';
const files = [
    '/actionsToolkitApp/file1.txt'
]
const rootDirectory = 'ActionsToolkitPackages/actionsToolkitApp'
const options = {
    continueOnError: true
}

const uploadResult = await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options);

  --------------------------*/

  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
}
run();