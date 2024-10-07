#!/bin/bash

MOD_FILES=`git ls-files . --modified`

if [[ ! -z $MOD_FILES ]]; then
    echo "ERROR: Untracked changes present on branch"
    echo "Please commit these before proceeding"
    exit 1
fi