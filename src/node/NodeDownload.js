module.exports.NodeDownload = {
  /**
   * Returns the URL that allows for a backup to be downloaded by an individual
   * user, or by the Wings control software.
   */
  downloadBackup({ server_uuid, backup_uuid }) {
    // GET /download/backup
    const jwt = this.signJWT({ backup_uuid, server_uuid });
    return {
      method: "get",
      url: `${this.fqdn}/download/backup?token=${jwt.token}`,
      jwt
    };
  },

  /**
   * Generates a one-time token with a link that the user can use to
   * download a given file.
   */
  downloadFile({ server_uuid, file_path }) {
    // GET /download/file
    const jwt = this.signJWT({ server_uuid, file_path });
    return {
      method: "get",
      url: `${this.fqdn}/download/file?token=${jwt.token}`,
      jwt
    };
  },
};

