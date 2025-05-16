import React from "react";
import browser from "webextension-polyfill";
import log from "loglevel";
import openUrl from "../actions/openUrl";
import { sendUndoMessage, sendRedoMessage } from "../actions/controlSessions";
import UndoIcon from "../icons/undo.svg";
import RedoIcon from "../icons/redo.svg";
import ExpandIcon from "../icons/expand.svg";
import SettingsIcon from "../icons/settings.svg";
import "../styles/Header.scss";

const logDir = "popup/components/Header";

const openSettings = () => {
  log.info(logDir, "openSettings()");
  const url = "../options/index.html#settings";
  openUrl(url);
};

const openSessionListInTab = () => {
  log.info(logDir, "openSessionListInTab()");
  const url = "../popup/index.html#inTab";
  openUrl(url);
  window.close();
};

export default props => {
  const { openModal, undoStatus } = props;

  return (
    <div id="header">
      <div className="title">Tab Session Manager</div>
      <div className="rightButtons">
        
        <button
          className={`undoButton ${undoStatus.undoCount == 0 ? "disable" : ""}`}
          onClick={sendUndoMessage}
          title={browser.i18n.getMessage("undoLabel")}
        >
          <UndoIcon />
          <div className="count">
            {undoStatus.undoCount > 0 && undoStatus.undoCount}
          </div>
        </button>
        <button
          className={`redoButton ${undoStatus.redoCount == 0 ? "disable" : ""}`}
          onClick={sendRedoMessage}
          title={browser.i18n.getMessage("redoLabel")}
        >
          <RedoIcon />
          <div className="count">
            {undoStatus.redoCount > 0 && undoStatus.redoCount}
          </div>
        </button>
        <div className="separation" />
        <button
          className={"openInTabButton"}
          onClick={openSessionListInTab}
          title={browser.i18n.getMessage("openSessionListInTabLabel")}
        >
          <ExpandIcon />
        </button>
        <button
          className={"settingsButton"}
          onClick={openSettings}
          title={browser.i18n.getMessage("settingsLabel")}
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
};
