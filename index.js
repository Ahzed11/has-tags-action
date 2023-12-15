const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const context = github.context;
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);

    const tags = await octokit.request('GET /repos/{owner}/{repo}/tags', {
        owner: context.repo.owner,
        repo: context.repo.repo,
        headers: {
        'X-GitHub-Api-Version': '2022-11-28'
        }
        });

    core.setOutput("hasTags", tags.data.length > 0);
}

run();