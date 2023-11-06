
import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";
import { exec } from "child_process";
import * as fs from 'fs';

const scandirMethod = (dir: string) => {
  return fs.readdirSync(dir);
}

const removeFileMethod = (pathFile: string) => {
  try{
    fs.unlinkSync(pathFile);
    return true;
  } catch(e) {
    return false;
  }
}


module.exports = defineConfig({
  "reporter": "junit",
  "reporterOptions": {
    "mochaFile": "results/test-results.xml",
    "testCaseSwitchClassnameAndName": false,
  },
  e2e: {
    "baseUrl": "https://fpasquer-dev.softco.service.honeywell.com",
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", browserify(config, {
          typescript: require.resolve("typescript"),
        })
      );
      on('task', {
        scandir(dir) {
          return scandirMethod(dir);
        }
      })
      on('task', {
        removeFile(pathFile) {
          return removeFileMethod(pathFile);
        }
      })
      on("after:screenshot", (details) => {
        const cmd = [
          "curl -D-",
          "-u \"" + process.env.JIRA_USERNAME + ":" + process.env.JIRA_PASSWORD + "\"",
          "-X POST",
          "-H \"X-Atlassian-Token: no-check\"",
          "-F \"file=@" + details.path + "\"",
          "https://acsjira.honeywell.com/rest/api/2/issue/" + process.env.JIRA_PROJECT_KEY + "/attachments"
        ]
        exec(cmd.join(" "), (err: Error, stdout: string, stderr: string) => {});
      });
      return config;
    },
  },
  "hosts": {
    "fpasquer-dev.softco.service.honeywell.com": "127.0.0.1"
  },
});
