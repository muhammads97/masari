#!/bin/sh

set -e

echo "Installing JS deps"
corepack enable
yarn install --frozen-lockfile

echo "Installing pods"
yarn pod-install