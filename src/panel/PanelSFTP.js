module.exports.PanelSFTP = {
  /**
   * Authenticate a set of credentials and return the associated server details
   * for a SFTP connection on the daemon. This supports both public key and password
   * based credentials.
   */
  validateSftpCredentials({ type, username, password }) {
    // POST /api/remote/sftp/auth

    // Body:
    /*
    {
      type: string, // "public_key" (what it's called) || "ssh_key" (not what it's actually called)
      username: string,
      password: string,
    }
    */
    return this.fetch(`/api/remote/sftp/auth`, {
      method: "post",
      body: { type, username, password }
    });
  },
};
