#!/usr/bin/

curl -u ${CIRCLE_NEKO_E2E_TOKEN}: \
     -X POST \
     -d build_parameters[CIRCLE_JOB]=test \
     https://circleci.com/api/v1.1/project/github/craftzcat/neko-e2e/tree/master
