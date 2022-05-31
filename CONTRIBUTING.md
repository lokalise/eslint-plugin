# Contributing

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

## Submitting a Change

- Clone the repo.
- `npm install`
- `npm test`.
- `git checkout -b my-branch-name`. Short, sweet, accurate and lower-case names are the best.

---

- Add your code changes.
- Commit ([follow our conventions](#commit-message-convention)) and push.
- Create PR, add Linked JIRA Ticket in description if necessary.
- `npm run prepare-release` **IF**:
    - CI ✅
    - Code is Approved ✅
    - Your branch is up-to-date with base branch ✅
    - If code, modifies `dist` output ✅
- Review changelog (refine commits if needed) and bumps. 
- `git add . && git commit -am "chore: release vx.x.x" && git push origin HEAD` - **replace x.x.x with proper bump version**
- Squash and merge the PR in `main`. Keep the title, delete the description.

---

- Draft a [new release](https://github.com/lokalise/mc_sandbox/releases/new) tagged with your [version](https://github.com/lokalise/mc_sandbox/blob/main/package.json#L3). Leave description empty. If your tag is not present, wait a bit and / or check if something went wrong on CI.
- Publish Release 🚀
- Confirm the new package was uploaded successfully in [npm](https://www.npmjs.com/package/@lokalise/eslint-plugin)

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Available Types

- feat → Addition or removal of features. Eg: `feat: add table on landing page`, `feat: remove table from landing page`
- fix → Bug fixing, followed by the bug. Eg: `fix: illustration overflows in mobile view`
- docs → Updates on documentation (*.md).
- chore → For releases.
- refactor → Changes in code, same output, but different approach.
- ci → Update github workflows, actions, linting.
- test → Update unit tests.
- revert → when reverting commits
- perf → Fixing something regarding performance (deriving state, using memo, callback)

### Breaking Changes

- Append `!` to the type. Eg.
```
'feat!: removed prop variant on landing page'
```
- Add details if needed. Eg.
```
git commit -m 'feat!: removed prop variant on landing page

BREAKING CHANGE: Use prop style instead.'
```