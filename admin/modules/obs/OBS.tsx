import OBSWebSocket from "obs-websocket-js";

import { OBSWebsocketConfig } from "../../../api/APITypes";
import { setOBSConnected, setOBSFailed, setSceneList } from "./OBSStore";

const obs = new OBSWebSocket();

obs.on("ConnectionOpened", () => setOBSConnected(true));
obs.on("ConnectionClosed", () => setOBSConnected(false));
obs.on("error", console.error);

class OBS {
  async connect(config: OBSWebsocketConfig) {
    await obs
      .connect({
        address: `${config.host}:${config.port}`,
        password: config.password,
      })
      .then(() => this._preload())
      .catch(() => setOBSFailed());

    return this;
  }

  _preload() {
    this.getScenes().then((response) => setSceneList(response.scenes));
  }

  async disconnect() {
    obs.disconnect();
    return this;
  }

  getScenes() {
    return obs.send("GetSceneList");
  }

  setScene(sceneName: string) {
    return obs.send("SetPreviewScene", { "scene-name": sceneName });
  }
}

export default new OBS();
