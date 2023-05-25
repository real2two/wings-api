module.exports.PanelServerBackup = {
  /**
   * Returns the required presigned urls to upload a backup to S3 cloud storage.
   */
  getServerBackupRemoteUploadURLs({ backup_id, size = 10 }) {
    // GET /api/remote/backups/{backup}

    // Query: ?size={number}
    return this.fetch(`/api/remote/backups/${encodeURIComponent(backup_id)}?size=${encodeURIComponent(size)}`);
  },
  /**
   * Handles updating the state of a backup.
   */
  setServerBackupStatus({ backup_id, checksum, checksum_type, size, successful, parts }) {
    // POST /api/remote/backups/{backup}

    // Body
    /*
    {
      data: {
        checksum: string,
        checksum_type: string,
        size: number,
        successful, boolean,
        parts: [
          {
            etag: string,
            part_number: number,
          },
        ],
      },
    }
    */
    return this.fetch(`/api/remote/backups/${encodeURIComponent(backup_id)}`, {
      method: "post",
      body: { checksum, checksum_type, size, successful, parts }
    });
  },
  /**
   * Handles toggling the restoration status of a server.
   */
  sendServerRestorationStatus({ backup_id, successful }) {
    // POST /api/remote/backups/{backup}/restore

    // Body:
    /*
    {
      successful: boolean,
    }
    */
    return this.fetch(`/api/remote/backups/${encodeURIComponent(backup_id)}/restore`, {
      method: "post",
      body: { successful }
    });
  },
};
