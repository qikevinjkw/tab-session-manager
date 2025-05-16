import browser from "webextension-polyfill";
import log from "loglevel";
import { getSettings, setSettings } from "src/settings/settings";
import { saveCurrentSession } from "./save";
import exportSessions from "./export";
import { showDoneBadge } from "./setBadge";


const logDir = "background/keyboardShortcuts";


const getCurrentTabName = async () => {
  let tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  });

  if (!getSettings("ifSavePrivateWindow") && tabs[0].incognito) {
    tabs = await browser.tabs.query({ active: true });
    tabs = tabs.filter(element => !element.incognito);
    const tabTitle = tabs[0] != undefined ? tabs[0].title : "";
    return tabTitle;
  } else {
    return tabs[0].title;
  }
};

export const onCommandListener = async command => {
  log.log(logDir, "onCommandListener()", command);
  switch (command) {
    case "saveAllWindow": {
      const name = await getCurrentTabName();
      saveCurrentSession(name, [], "saveAllWindows");
      showDoneBadge();
      break;
    }
    case "saveCurrentWindow": {
      const name = await getCurrentTabName();
      saveCurrentSession(name, [], "saveOnlyCurrentWindow");
      showDoneBadge();
      break;
    }
    case "exportSessions": {
      exportSessions();
      break;
    }
  }
};
