module.exports.NodeServerActions = {
  /**
   * Returns the logs for a given server instance.
   * 
   * Note: The size must be a value between 0 to 100.
   */
  getServerLogs({ uuid, size = 100 }) {
    // GET /api/servers/:server/logs
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/logs?size=${encodeURIComponent(size)}`);
  },

  /**
   * Sends a power action to the server instance.
   * 
   * Notes:
   * - action must be either "start", "stop", "restart", or "kill".
   * - wait_seconds must be a value between 0 to 300.
   */
  changeServerPowerState({ uuid, action, wait_seconds = 0 }) {
    // POST /api/servers/:server/power
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/power`, {
      method: "post",
      body: { action, wait_seconds },
    });
  },

  /**
   * Sends a command or multiple commands to a running server instance.
   * 
   * Note: commands should be an array of strings, which are commands.
   */
  sendServerCommand({ uuid, commands }) {
    // POST /api/servers/:server/commands
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/commands`, {
      method: "post",
      body: { commands },
    });
  },

  /**
   * Triggers the install process of a server and returns no content.
   */
  performServerInstall(uuid) {
    // POST /api/servers/:server/install
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/install`, {
      method: "post",
    });
  },

  /**
   * Reinstall a server on the daemon.
   */
  performServerReinstall(uuid) {
    // POST /api/servers/:server/reinstall
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/reinstall`, {
      method: "post",
    });
  },

  /**
   * Triggers a server sync on Wings.
   */
  triggerServerSync(uuid) {
    // POST /api/servers/:server/sync
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/sync`, {
      method: "post",
    });
  },

  /**
   * Revokes an array of JWT JTI's by marking any token generated before the current time on
   * the Wings instance as being invalid.
   * 
   * Note: jtis should be an array of strings, which are JTI IDs.
   */
  revokeServerJTIs({ uuid, jtis }) {
    // POST /api/servers/:server/ws/deny
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/ws/deny`, {
      method: "post",
      body: { jtis }
    });
  },
};
