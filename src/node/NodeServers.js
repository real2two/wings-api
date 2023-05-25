module.exports.NodeServers = {
  /**
   * Shows list of servers on the Wings dameon.
   * 
   * Note: There's no pagination support.
   */
  getServers() {
    // GET /api/servers
    return this.fetch("/api/servers");
  },

  /**
   * Creates a new server on the Wings daemon.
   */
  createServer({ uuid, start_on_completion = false }) {
    // POST /api/servers
    return this.fetch("/api/servers", {
      method: "post",
      body: { uuid, start_on_completion },
    });
  },

  /**
   * Returns details about a server from the Daemon instance.
   */
  getServerDetails(uuid) {
    // GET /api/servers/:server
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}`);
  },

  /**
   * Delete a server from the daemon, forcibly if passed.
   */
  async deleteServer(uuid) {
    // DELETE /api/servers/:server
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}`, {
      method: "delete",
    });
  },
};
