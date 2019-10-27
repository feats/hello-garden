#!/bin/sh -eu

ME=$(basename $0)

log_() { echo "[$ME] $@"; }

log_ "--> Setting up symbolic links in node_modules"
mkdir -p node_modules
cd node_modules
[ -L __ ] || ln -s ../../shared __
