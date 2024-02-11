#!/bin/bash
set -e -x

# Get the current branch name
CURRENT_BRANCH="${GITHUB_REF#refs/heads/}"
echo $CURRENT_BRANCH

# Set the npm dist-tag based on the branch name
if [ "$CURRENT_BRANCH" == "main" ]; then
  DIST_TAG="latest"
else
  DIST_TAG="experimental"
fi

echo $DIST_TAG

# Publish the package with the appropriate dist-tag
# npm publish --tag "$DIST_TAG"