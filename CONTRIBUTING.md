## Contributing

[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have suggestions for how this project could be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you have questions, too, we'd love to hear them.

We'd also love PRs. If you're thinking of a large PR, we advise opening up an issue first to talk about it, though! Look at the links below if you're not sure how to open a PR.

## Submitting a pull request

1. Clone the repo.
1. `npm install`.
1. `npm test`.
1. `git checkout -b my-branch-name`.
1. Make your change(s):
    - Add necessary tests
    - Add docs for the specific rules
    - Bump the package using [SEMVER](https://semver.org/) approach.
    - Commit and push your changes
1. Squash and merge the pull request in `main`.
    - The title of the PR needs to follow ([conventional commits guidelines](https://platform.uno/docs/articles/uno-development/git-conventional-commits.html)) as it will be used for changelog purposes.
    - If it is a breaking change include `!` next to the type of your commit as in `fix!: removed prop x`
1. Release.
    - Draft a [new release](https://github.com/lokalise/eslint-plugin/releases/new)
    - Add a new tag based on [current main branch](https://github.com/lokalise/eslint-plugin/blob/main/package.json#L3) package version `vx.x.x`
    - Add in description breaking changes related info if necessary
    - Publish Release
    - Confirm the new package was uploaded successfully in [npm](https://www.npmjs.com/package/@lokalise/eslint-plugin)
1. Done 🚀
