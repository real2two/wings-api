import { FetchResponsePromise } from "../utilities";

export declare class Panel {
  static get({ remote, token, token_id }: Panel.PanelConstructor): Panel;
  constructor({ remote, token, token_id }: Panel.PanelConstructor);

  /**
   * Returns the required presigned urls to upload a backup to S3 cloud storage.
   */
  getServerBackupRemoteUploadURLs(data: { backup_id: string, size?: number }): FetchResponsePromise
  /**
   * Handles updating the state of a backup.
   */
  setServerBackupStatus(data: { backup_id: string, checksum: string, checksum_type: string, size: number, successful: boolean, parts: { etag: string, part_number: number }[] | null }): FetchResponsePromise
  /**
   * Handles toggling the restoration status of a server.
   */
  sendServerRestorationStatus(data: { backup_id: string, successful: boolean }): FetchResponsePromise

  /**
   * Returns details about the server that allows Wings to self-recover and ensure
   * that the state of the server matches the Panel at all times.
   */
  getServerConfiguration(uuid: string): FetchResponsePromise
  /**
   * Returns installation information for a server.
   */
  getServerInstallationScript(uuid: string): FetchResponsePromise
  /**
   * Updates the installation state of a server.
   */
  setServerInstallStatus(data: { uuid: string, successful: boolean, reinstall: boolean }): FetchResponsePromise

  /**
   * Lists all servers with their configurations that are assigned to the requesting node.
   */
  getServers(data: { page: number, per_page: number }): FetchResponsePromise
  /**
   * Resets the state of all servers on the node to be normal.
  */
  resetServersState(): FetchResponsePromise
  /**
   * Sends activity logs to the panel.
   */
  sendActivityLogs(data: Activity[]): FetchResponsePromise

  /**
   * The daemon notifies the panel about a transfer success or failure.
   */
  setServerTransferStatus(data: { uuid: string, successful: boolean }): FetchResponsePromise

  /**
   * Authenticate a set of credentials and return the associated server details
   * for a SFTP connection on the daemon. This supports both public key and password
   * based credentials.
   */
  validateSftpCredentials(data: { type: "password" | "public_key", username: string, password: string }): FetchResponsePromise
}

export declare namespace Panel {
  export interface PanelConstructor {
    remote: string;
    token: string;
    token_id: string;
  }
  export interface Activity {
    user: string;
    server: string;
    event: string;
    metadata: null | string | object;
    ip: string;
    timestamp: string;
  }
}
