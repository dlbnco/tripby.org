#!/usr/bin/env node

const inquirer = require('inquirer')
const ora = require('ora')
const semver = require('semver')
const { exec } = require('child_process')
const { version: currentVersion } = require('../package.json')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'NEW_VERSION',
      message: 'Type the new version',
      validate: newVersion => {
        if (semver.valid(newVersion) !== null) {
          if (semver.gt(newVersion, currentVersion)) {
            return true
          }

          return `Invalid version, must be bigger then "${currentVersion}"(current version)`
        }

        return 'Invalid version, must follow SemVer format'
      }
    },
    {
      type: 'confirm',
      name: 'I_AM_SURE',
      message:
        'This will push code to remote branches, are you sure you want to do that?',
      // Defaults to false, so you have to explicit say you are sure
      default: false
    }
  ])
  .then(({ NEW_VERSION, I_AM_SURE }) => {
    if (I_AM_SURE) {
      const TAG_PREFIX = 'v'
      const GIT_REMOTE = 'origin'
      const MASTER_BRANCH = 'master'
      const DEVELOP_BRANCH = 'develop'
      const RELEASE_BRANCH = `release/${NEW_VERSION}`

      const spinner = ora('Releasing...').start()

      /**
       * Sets version prefix in yarn config,
       * Sets the git message when adding the new version to package.json,
       * Tells yarn to not sign the git tag, as we will do it manually later.
       *
       * Checkout to develop branch,
       * Make sure it's the same as the remote
       * Merge master into develop,
       * Set the new version to package.json
       *
       * Create the release branch from develop to make sure we will merge exactly that to master
       *
       * Checkout to master branch,
       * Make sure it's the same as the remote
       * Merge release branch into master,
       * Delete release branch,
       * Push master to remote.
       *
       * Push the new tag.
       *
       * Checkout to develop again,
       * Pull from remote develop so we can push later
       * Push develop to remote
       */
      exec(
        `yarn config set version-tag-prefix "${TAG_PREFIX}" > /dev/null \
      && yarn config set version-git-message "${TAG_PREFIX}%s"  > /dev/null \
      && yarn config set version-sign-git-tag false > /dev/null \
      && git checkout ${DEVELOP_BRANCH} \
      && git reset --hard ${GIT_REMOTE}/${DEVELOP_BRANCH} \
      && git merge --no-edit ${GIT_REMOTE}/${MASTER_BRANCH} \
      && yarn version --new-version ${NEW_VERSION} \
      && git checkout -b ${RELEASE_BRANCH} \
      && git checkout ${MASTER_BRANCH} \
      && git reset --hard ${GIT_REMOTE}/${MASTER_BRANCH} \
      && git merge --no-edit ${RELEASE_BRANCH} \
      && git branch -D ${RELEASE_BRANCH} \
      && git push ${GIT_REMOTE} ${MASTER_BRANCH} \
      && git push ${GIT_REMOTE} ${TAG_PREFIX}${NEW_VERSION} \
      && git checkout ${DEVELOP_BRANCH} \
      && git pull ${GIT_REMOTE} ${DEVELOP_BRANCH} \
      && git push ${GIT_REMOTE} ${DEVELOP_BRANCH}`,
        (err, stdout) => {
          if (err) {
            spinner.fail(err)
          } else {
            spinner.succeed('Released with success!')
          }
        }
      )
    }
  })
