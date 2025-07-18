# FindTheWord

## Initial setup

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env` file in the frontend and backend directories based on the `.env.example` files.

### Start the application

```bash
pnpm dev
```

## Setup the database

```bash
pnpm prisma:generate
pnpm prisma:migrate:apply
```

## Build and run the application

```bash
pnpm build
```

```bash
pnpm start
```

## Tests

### Run tests

```bash
pnpm test:frontend
```

```bash
pnpm test:backend
```

```bash
pnpm test:e2e
```

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

### Sign commits

setup :

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

> Add the ssh key to GitHub account as a signing key.

## Oh My Zsh

### Install

```bash
# Install Zsh
sudo apt install zsh
# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# Change default shell to Zsh
chsh -s $(which zsh)
```
