module.exports.NodeServerBackups = {
  /**
   * Tells the remote Daemon to begin generating a backup for the server.
   * 
   * Notes:
   * - adapter must either "wings" or "s3". 
   * - backup_uuid becomes the backup file's name.
   * - ignore is the ignored files and directories.
   */
  createServerBackup({ uuid, adapter, backup_uuid, ignore = "" }) {
    // POST /api/servers/:server/backup
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/backup`, {
      method: "post",
      body: {
        adapter,
        uuid: backup_uuid,
        ignore
      },
    });
  },

  /**
   * Sends a request to Wings to begin restoring a backup for a server.
   * 
   * Notes:
   * - adapter must either "wings" or "s3". 
   * - truncate_directory is a boolean that determines if every file and folders should be deleted before restoring the backup. 
   * - download_url should be the download URL for the S3 bucket. This is only required when the adpater is "s3".
   */
  restoreServerBackup({ uuid, backup_uuid, adapter, truncate_directory, download_url }) {
    // POST /api/servers/:server/backup/:backup/restore
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/backup/${encodeURIComponent(backup_uuid)}/restore`, {
      method: "post",
      body: {
        adapter,
        uuid: backup_uuid,
        truncate_directory,
        download_url
      },
    });
  },

  /**
   * Deletes a backup from the daemon.
   */
  deleteServerBackup({ uuid, backup_uuid }) {
    // DELETE /api/servers/:server/backup/:backup
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/backup/${encodeURIComponent(backup_uuid)}`, {
      method: "delete",
    });
  }
};
