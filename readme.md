# Cypress starter and executer code
This code is doing all required actions around cypress and the [ORDER FORM PROJECT](https://bitbucket.honeywell.com/projects/MOF/repos/nextgenorderformapp/browse).

This is actions available:
  - Build the docker image used to execute End to End test 
  - Push the image into the correct [artifactory folder](https://artifactory-na.honeywell.com/ui/native/omt-docker-stable-local/honeywell_cypress)
  - Pull Jira test and push the output into the corresponding test execution
  - Execute test

## Requirement
 - Docker installed
 - Git installed
 - Service account common for artifactory and jira

## Manual
```
./start.sh <TEST EXECUTION ID> <USERNAME SERVICE ACCOUNT> <PASSWORD SERVICE ACCOUNT>
``` 