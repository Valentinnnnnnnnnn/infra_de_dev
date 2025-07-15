## GIT

### Commit format

```bash
git add .
git commit -m "<type>(<scope>): <subject>

<body>(optional)

<footer>(optional)>
"
```

### Commit types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature

### Commitizen

Commitizen is a tool to help you write standardized commit messages. It can be installed globally.

> github.com/commitizen/cz-cli

```bash
npm install -g commitizen
```

### Commitizen usage

```bash
git add .
git cz
```
