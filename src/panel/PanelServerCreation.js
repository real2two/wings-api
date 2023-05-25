module.exports.PanelServerCreation = {
  /**
   * Returns details about the server that allows Wings to self-recover and ensure
   * that the state of the server matches the Panel at all times.
   */
  getServerConfiguration(uuid) {
    // GET /api/remote/servers/{uuid}
    return this.fetch(`/api/remote/servers/${encodeURIComponent(uuid)}`);
  },
  /**
   * Returns installation information for a server.
   */
  getServerInstallationScript(uuid) {
    // GET /api/remote/servers/{uuid}/install
    return this.fetch(`/api/remote/servers/${encodeURIComponent(uuid)}/install`);
  },
  /**
   * Updates the installation state of a server.
   */
  setServerInstallStatus({ uuid, successful, reinstall }) {
    // POST /api/remote/servers/{uuid}/install

    // Body:
    /*
    {
      successful: boolean,
      reinstall: boolean,
    }
    */
    return this.fetch(`/api/remote/servers/${encodeURIComponent(uuid)}/install`, {
      method: "post",
      body: { successful, reinstall }
    });
  },
};
