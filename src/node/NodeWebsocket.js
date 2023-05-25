module.exports.NodeWebsocket = {
  /**
   * Creates token that gives access to the console
   */
  generateWebsocketToken({ server_uuid, permissions = [] }) {
    // https://github.com/devnote-dev/ptero-notes/blob/main/wings/websocket.md
    /*
    const ws = new WebSocket("WEBSOCKET URL HERE");
    ws.addEventListener("open", evt => {
      console.log("Connected!");
      ws.send(JSON.stringify({
        event: "auth",
        args: ["TOKEN HERE"]
      }));
    });
    ws.addEventListener("message", evt => {
      console.log(evt.data);
    });
    */

    const jwt = this.signJWT({ server_uuid, permissions }, { expiresIn: "20m" });
    return {
      method: "ws",
      url: `${this.config.api.ssl.enabled ? "wss" : "ws"}://${this.fqdn.replace(/^https?:\/\//, "")}/api/servers/${encodeURIComponent(server_uuid)}/ws`,
      jwt
    }
  },
};
