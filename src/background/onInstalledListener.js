import browser from "webextension-polyfill";
import log from "loglevel";
import { getSettings, setSettings } from "src/settings/settings";
import { init } from "./background";
import updateOldSessions from "./updateOldSessions";
import { setSessionStartTime } from "./save";
import { setAutoSave } from "./autoSave";

const logDir = "background/onInstalledListener";

const openOptionsPage = active => {
  browser.tabs.create({
    url: "options/index.html#information?action=updated",
    active: active
  });
};

export default async details => {
  if (details.reason != "install" && details.reason != "update") return;
  await init();
  await setSessionStartTime();
  log.info(logDir, "onInstalledListener()", details);
  const isShowOptionsPage = getSettings("isShowOptionsPageWhenUpdated");

  if (isShowOptionsPage) {
    openOptionsPage(false);
  }
  setSettings("isShowUpdated", true);
  await updateOldSessions();
  setAutoSave();
};
