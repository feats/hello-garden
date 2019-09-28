#!/bin/sh -eu

ME=$(basename $0)

log_() { echo "[$ME] $@"; }

log_ "--> Setting up symbolic links"
mkdir -p node_modules
cd node_modules
[ -L __ ] || ln -s ../src/lib __
[ -L backend ] || ln -s ../src/backend backend
[ -L frontend ] || ln -s ../src/frontend frontend
[ -L fixtures ] || ln -s ../src/fixtures fixtures
