#!/bin/bash
set -xe
git config --global user.email "jnm+johanmartindev@catenare.com"
git config --global user.name "Johan Martin"
git config --global --unset gpg.ssh.program
nvm install --lts
nvm use
npm i -g @frctl/fractal npm@latest prettier stylelint stylelint-config-standard stylelint-config-prettier stylelint-config-recommended
exit
