import { FetchResponsePromise } from "../utilities";

export declare class Node {
  /**
   * Creates the node constructor.
   */
  static get({ fqdn, config }: Node.Constructor): Node;
  static generateConfiguration({ fqdn, config }: Node.GenerateConfigurationOptions): Node;
  /**
   * Creates the node constructor.
   */
  constructor({ fqdn, config }: Node.Constructor);

  /**
   * Updates the configuration information for a daemon.
   */
  updateConfiguration(config: Node.ConfigPartial): FetchResponsePromise;
  /**
   * Returns system information from the wings instance.
   */
  getSystemInformation(): FetchResponsePromise;

  /**
   * Returns the URL that allows for a backup to be downloaded by an individual
   * user; or by the Wings control software.
   */
  downloadBackup(args: { server_uuid: string; backup_uuid: string }): Node.JWTResponse;
  /**
   * Generates a one-time token with a link that the user can use to
   * download a given file.
   */
  downloadFile(args: { server_uuid: string; file_path: string }): Node.JWTResponse;

  /**
   * Returns the logs for a given server instance.
   * 
   * Note: The size must be a value between 0 to 100.
   */
  getServerLogs(args: { uuid: string; size?: number }): FetchResponsePromise;
  /**
   * Sends a power action to the server instance.
   * 
   * Notes:
   * - action must be either "start"; "stop"; "restart"; or "kill".
   * - wait_seconds must be a value between 0 to 300.
   */
  changeServerPowerState(args: { uuid: string; action: Node.ServerPowerState; wait_seconds?: number }): FetchResponsePromise;
  /**
   * Sends a command or multiple commands to a running server instance.
   * 
   * Note: commands should be an array of strings; which are commands.
   */
  sendServerCommand(args: { uuid: string; commands: string[] }): FetchResponsePromise;
  /**
   * Triggers the install process of a server and returns no content.
   */
  performServerInstall(uuid: string): FetchResponsePromise;
  /**
   * Reinstall a server on the daemon.
   */
  performServerReinstall(uuid: string): FetchResponsePromise;
  /**
   * Triggers a server sync on Wings.
   */
  triggerServerSync(uuid: string): FetchResponsePromise;
  /**
   * Revokes an array of JWT JTI's by marking any token generated before the current time on
   * the Wings instance as being invalid.
   * 
   * Note: jtis should be an array of strings; which are JTI IDs.
   */
  revokeServerJTIs(args: { uuid: string; jtis: string[] }): FetchResponsePromise;

  /**
   * Tells the remote Daemon to begin generating a backup for the server.
   * 
   * Notes:
   * - adapter must either "wings" or "s3". 
   * - backup_uuid becomes the backup file's name.
   * - ignore is the ignored files and directories.
   */
  createServerBackup(args: { uuid: string; adapter: Node.BackupAdaptar; backup_uuid: string; ignore: string }): FetchResponsePromise;
  /**
   * Sends a request to Wings to begin restoring a backup for a server.
   * 
   * Notes:
   * - adapter must either "wings" or "s3". 
   * - truncate_directory is a boolean that determines if every file and folders should be deleted before restoring the backup. 
   * - download_url should be the download URL for the S3 bucket. This is only required when the adpater is "s3".
   */
  restoreServerBackup(args: { uuid: string; backup_uuid: string; adapter: Node.BackupAdaptar; truncate_directory: boolean; download_url?: string }): FetchResponsePromise;
  /**
   * Deletes a backup from the daemon.
   */
  deleteServerBackup(args: { uuid: string; backup_uuid: string }): FetchResponsePromise;

  /**
   * Return the contents of a given file.
   * 
   * Notes:
   * - download determines whether the file content should be returned as a download stream.
   */
  getServerFileContent(args: { uuid: string; file: string; download?: boolean }): FetchResponsePromise;
  /**
   * Return a directory listing for a given path.
   */
  getServerFileDirectory(args: { uuid: string; directory?: string }): FetchResponsePromise;
  /**
   * Renames or moves files on the remote machine.
   * 
   * Notes:
   * - root is the root directory of the files.
   * - files is an object containing the from-to name pairs.
   */
  renameServerFiles(args: { uuid: string; root?: string; files: { from: string; to: string }[] }): FetchResponsePromise;
  /**
   * Copy a given file and give it a unique name.
   */
  copyServerFile(args: { uuid: string; location: string }): FetchResponsePromise;
  /**
   * Save new contents to a given file. This works for both creating and updating
   * a file.
   */
  writeServerFileContent(args: { uuid: string; file: string; content: string }): FetchResponsePromise;
  /**
   * Creates a new directory for the server in the given path.
   * 
   * Notes:
   * - name is the name of the directory.
   * - path is the root path that the directory should be created in.
   */
  createServerFileDirectory(args: { uuid: string; name: string; path?: string }): FetchResponsePromise;
  /**
   * Delete a file or folder for the server.
   * 
   * Notes:
   * - files must be an array of file names.
   * - root is the root directory of the files.
   */
  deleteServerFile(args: { uuid: string; files: string[]; root?: string }): FetchResponsePromise;
  /**
   * Compress the given files or folders in the given root.
   * 
   * Notes:
   * - files must be an array of file names.
   * - root is the root directory of the files.
   */
  compressServerFiles(args: { uuid: string; files: string[]; root?: string }): FetchResponsePromise;
  /**
   * Decompresses a given archive file.
   * 
   * Notes:
   * - file must be the file to decompress.
   * - root is the root directory of the files.
   */
  decompressServerFile(args: { uuid: string; file: string; root?: string }): FetchResponsePromise;
  /**
   * Chmods the given files.
   * 
   * Notes:
   * - files must be an array of file-mode pairs.
   * - root is the root directory of the files.
   */
  chmodServerFiles(args: { uuid: string; files: { file: string; mode: string }[]; root?: string }): FetchResponsePromise;
  /**
   * Returns an object containing a list of download objects for in-progress downloads.
   */
  getPullServerFile(uuid: string): FetchResponsePromise;
  /**
   * Pulls a file from the given URL and saves it to the disk.
   * All servers are limited to 3 simultaneous downloads at a time; if a server reaches this limit; the request is cancelled immediately.
   * 
   * Notes:
   * - url (string; requried) is the URL of the file to download.
   * - file_name (string; optional) is the name to save the file as.
   * - foreground (boolean; optional) determines whether the request should be downloaded synchronously.
   * - root (string; required) must be the root path to download the file to.
   * - use_header (boolean; optional) determines if it uses the remote file header for file information.
   */
  pullServerFile(args: { uuid: string; url: string; file_name: string; foreground?: boolean; root?: string; use_header?: boolean }): FetchResponsePromise;
  /**
   * Deletes an in-progress remote file download.
   */
  deletePullServerFile(args: { uuid: string; id: string }): FetchResponsePromise;

  /**
   * Shows list of servers on the Wings dameon.
   * 
   * Note: There's no pagination support.
   */
  getServers(): FetchResponsePromise;
  /**
   * Creates a new server on the Wings daemon.
   */
  createServer(args: { uuid: string; start_on_completion?: boolean }): FetchResponsePromise;
  /**
   * Returns details about a server from the Daemon instance.
   */
  getServerDetails(uuid: string): FetchResponsePromise;
  /**
   * Delete a server from the daemon; forcibly if passed.
   */
  deleteServer(uuid: string): FetchResponsePromise;

  /**
   * Cancels an incoming server transfer request.
   */
  deleteIncomingServerTransfer(uuid: string): FetchResponsePromise;
  /**
   * Start a server transfer
   */
  createServerTransfer(args: { uuid: string; url: string; token: string; start_on_completion?: boolean }): FetchResponsePromise;
  /**
   * Cancels an outgoing transfer request for the server.
   */
  deleteOutgoingServerTransfer(uuid: string): FetchResponsePromise;

  /**
   * Uploads a file to a server
   */
  uploadFile(args: { server_uuid: string; directory?: string }): Node.JWTResponse;

  /**
   * Creates token that gives access to the console
   */
  generateWebsocketToken(args: { server_uuid: string; permissions?: string[] }): FetchResponsePromise;
}

export declare namespace Node {
  export interface Config {
    debug: boolean;
    uuid: string;
    token_id: string;
    token: string;
    api: {
      host: string;
      port: number;
      ssl: {
        enabled: boolean;
        cert: string;
        key: string;
      };
      upload_limit: number;
    };
    system: {
      data: string;
      sftp: {
        bind_port: number;
      };
    };
    allowed_mounts: string[];
    remote: string;
  }
  export interface ConfigPartial {
    debug?: boolean;
    uuid?: string;
    token_id?: string;
    token?: string;
    api?: {
      host?: string;
      port?: number;
      ssl?: {
        enabled?: boolean;
        cert?: string;
        key?: string;
      };
      upload_limit?: number;
    };
    system?: {
      data?: string;
      sftp?: {
        bind_port?: number;
      };
    };
    allowed_mounts?: string[];
    remote?: string;
  }
  export interface GenerateConfigurationOptions { fqdn: string, config: NodeConfigGenerateConfiguration }
  export interface GenerateConfigurationConfig extends NodeConfigPartial {
    uuid: string,
    token_id: string,
    token: string,
    remote: string,
  }
  export interface Constructor { fqdn: string; config: NodeConfig }
  export interface JWTOptions { token?: string; expiresIn: string }
  export interface JWTResponse { method: string; url: string; jwt: NodeJWTOptions }

  export type NodeServerPowerState = "start" | "stop" | "kill" | "restart";
  export type NodeBackupAdaptar = "wings" | "s3";
}
