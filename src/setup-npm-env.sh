#!/bin/sh -eu

ME=$(basename $0)

log_() { echo "[$ME] $@"; }

log_ "--> Setting up symbolic links"
mkdir -p node_modules
cd node_modules
[ -L __ ] || ln -s ../shared __
[ -L backend ] || ln -s ../backend backend
[ -L fixtures ] || ln -s ../fixtures fixtures
