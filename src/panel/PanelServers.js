module.exports.PanelServers = {
  /**
   * Lists all servers with their configurations that are assigned to the requesting node.
   */
  getServers({ page = 0, per_page = 50 }) {
    // GET /api/remote/servers

    // Query: ?page={number}&per_page=${number}
    return this.fetch(`/api/remote/servers?per_page=${encodeURIComponent(per_page)}&page=${encodeURIComponent(page)}`);
  },
  /**
   * Resets the state of all servers on the node to be normal.
  */
  resetServersState() {
    // POST /api/remote/servers/reset
    return this.fetch(`/api/remote/servers/reset`, {
      method: "post",
    });
  },
  /**
   * Sends activity logs to the panel.
   */
  sendActivityLogs(data) {
    // POST /api/remote/activity

    // Body:
    /*
    {
      data: [
        {
          server: string,
          event: string,
          timestamp: string, // timestamp
          metadata: , // null, string or json blob with event specific metadata (it depends)
          ip: string, // ip address or empty string
          user: string, // user uuid or empty string
        },
        ...
      ]
    }
    */
    return this.fetch(`/api/remote/activity`, {
      method: "post",
      body: { data }
    });
  },
};
