#!/usr/bin/env bash

cd `dirname -- $0`
cd ..

unformatted=`gofmt -l .`

if [ `echo $unformatted | wc -l` != 0 ]; then
  echo "some files are not formatted well:"
  echo $unformatted
  exit 1
fi
