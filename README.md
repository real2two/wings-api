# Pterodactyl Panel - Wings API library

This is a library to handle Wings routes, and the panel's remote routes.

## Node documentations

```ts
import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { Node } from "wings-api";

const fqdn = "http://localhost:8080";

// You can loads from a file...
const config = yaml.load(readFileSync("config.yml", "utf8")) as Node.Config;
// and even generate your own configuration!
const config = Node.generateConfiguration({
  fqdn,
  config: {
    uuid: "abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
    token_id: "ab123CdeFgH4ijk5",
    token: "abc1dE2FgHIJkLMNopQRsTUvwX3YZABcDEF45GHiJKlM67NOp8qrstU9wXyzabcde",
    remote: "http://example.com",
  }
});

// Create node functions
const node = Node.get({ fqdn, config });

await node.getSystemInformation();

await node.updateConfiguration({
  api: {
    upload_limit: 100,
  },
});

await node.getServers(); // Doesn't support a pagination system. I don't recommend using this.

await node.createServer({ // This function will not work directly to Wings.
  uuid: serverUUID,
  start_on_completion: true,
});
  
await node.getServerDetails(serverUUID);
  
await node.deleteServer(serverUUID);
  
/* The number is the log size. Must be a number from 1 to 100.
   If the number is less than 1 or greater than 100, it defaults to 100. */
await node.getServerLogs({
  uuid: serverUUID,
  size: 10,
});

await node.changeServerPowerState({
  uuid: serverUUID,
  action: "start",
  wait_seconds: 300,
});

await node.sendServerCommand({
  uuid: serverUUID,
  commands: ["help", "stop"],
});

await node.performServerInstall(serverUUID);

await node.performServerReinstall(serverUUID);

await node.triggerServerSync(serverUUID);

await node.revokeServerJTIs({
  uuid: serverUUID,
  jtis: ["12a3bc45d6ef78ghijk90l1mno2pq345"], // include JWI ids to revoke here (this is for the websocket)
});

node.downloadBackup({
  server_uuid: serverUUID,
  backup_uuid: exampleBackupUUID,
});

node.downloadFile({
  server_uuid: serverUUID,
  file_path: "/spigot.yml"
});

// If you replace 'URL GIVEN' and upload a file using this HTML code, the file will be added.
/*  <form action="URL GIVEN" method="post" enctype="multipart/form-data"> 
      <input name="files" type="file">
      <input type="submit">
    </form> */
node.uploadFile({
  server_uuid: serverUUID,
  directory: "/"
});
      
/* If you go to /var/lib/pterodactyl/backups and run this,
  you might realize the file is created and deleted if you run directly from here.

  This is because Wings communicates back to Pterodactyl panel,
  and checks if the backup data exists on the panel. */
await node.createServerBackup({
  uuid: serverUUID,
  backup_uuid: "your_backup_uuid",
  adapter: "wings",
  ignore: ""
});

await node.restoreServerBackup({
  uuid: serverUUID,
  backup_uuid: exampleBackupUUID,
  adapter: "wings", // or "s3" to use S3
  truncate_directory: false, // Determines if you delete everything or not.
  // download_url: "s3 download url" // Only include this if you're a "s3" adapter
});

await node.deleteServerBackup({
  uuid: serverUUID,
  backup_uuid: exampleBackupUUID,
});

await node.getServerFileContent({
  uuid: serverUUID,
  file: "spigot.yml",
  download: false, // Determines if it should return in a download stream or not.
});

await node.getServerFileDirectory({
  uuid: serverUUID,
  directory: "/",
});

await node.renameServerFiles({
  uuid: serverUUID,
  root: "/",
  files: [
    {
      from: "server.jar",
      to: "myServerJarName.jar"
    },
    {
      from: "bukkit.yml",
      to: "cache/bukkit.yml"
    },
  ],
});

await node.copyServerFile({
  uuid: serverUUID,
  location: "server.jar", // You can't name the copied file.
});

await node.writeServerFileContent({
  uuid: serverUUID,
  file: "myCoolFile.txt",
  content: "very cool\ncontent",
});

await node.createServerFileDirectory({
  uuid: serverUUID,
  name: "folder name",
  path: "/",
});

await node.deleteServerFile({
  uuid: serverUUID,
  files: [ "junk.txt", "remove_this.json" ],
  root: "/",
});

await node.compressServerFiles({
  uuid: serverUUID,
  files: [ "server.jar", "server.properties" ],
  root: "/",
});

await node.decompressServerFile({
  uuid: serverUUID,
  file: "archive-2023-05-21T191447-0400.tar.gz",
  root: "/",
});

await node.chmodServerFiles({
  uuid: serverUUID,
  files: [
    {
      file: "bukkit.yml",
      mode: "644"
    },
  ],
  root: "/"
});

await node.getPullServerFile(serverUUID); // Shows list of pull server files

await node.getPullServerFile(serverUUID); // Shows list of pull server files

await node.pullServerFile({ // Download file by URL (max 3 at once)
  uuid: serverUUID,
  url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  file_name: "rick.jpg",
  // foreground: true,
  root: "/",
  // use_header: true,
});

await node.deletePullServerFile({
  uuid: serverUUID,
  id: "b86000f3-b39f-461e-a9fc-dd5bd1082d5c", // example pull server file id
});

/*
  // https://github.com/devnote-dev/ptero-notes/blob/main/wings/websocket.md

  const ws = new WebSocket("WEBSOCKET URL HERE");
  ws.addEventListener("open", evt => {
    console.log("Connected!");
    ws.send(JSON.stringify({
      event: "auth",
      args: ["TOKEN HERE"],
    }));
  });
  ws.addEventListener("message", evt => {
    console.log(evt.data);
  });
*/
await node.generateWebsocketToken({
  server_uuid: serverUUID,
  permissions: [
    "*",
    "admin.websocket.errors",
    "admin.websocket.install",
    "admin.websocket.transfer",
  ],
});
  
await node.deleteIncomingServerTransfer(serverUUID);

await node.createServerTransfer({ // WARNING: This path hasn't been fully tested using 2 proper Wings instances.
  uuid: serverUUID,
  url: `${newNodeFqdn}/api/transfers`,
  token: newNodeToken, // <- If this path is broken, it's because of the token. I will mention this again: this path hasn't been fully tested with 2 proper Wings instances.
  start_on_completion: true,
});

await node.deleteOutgoingServerTransfer(serverUUID);
```

## Panel documentations

```ts
import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { Panel } from "wings-api";
import type { Node } from "wings-api";

const { remote, token, token_id } = yaml.load(readFileSync("config.yml", "utf8")) as Node.Config;
const panel = Panel.get({ remote, token, token_id });

await panel.getServers({
  page: 0,
  per_page: 1,
});
 
await panel.resetServersState();
 
await panel.getServerConfiguration(serverUUID);
 
await panel.getServerInstallationScript(serverUUID);
 
await panel.setServerInstallStatus({
  uuid: serverUUID,
  successful: true,
  reinstall: false,
});
 
await panel.getServerBackupRemoteUploadURLs({ // WARNING: This path hasn't been tested thoroughly.
  backup_id: serverUUID,
  size: 100,
});
 
await panel.sendServerRestorationStatus({
  backup_id: serverUUID,
  successful: true,
});
 
await panel.setServerTransferStatus({
  uuid: serverUUID,
  successful: true,
});
 
await panel.validateSftpCredentials({
  type: "password", // or "public_key" (for ssh keys)
  username: "username.a1bc2345",
  password: "password",
});
 
await panel.setServerBackupStatus({ // // WARNING: This path hasn't been tested thoroughly.
  backup_id: serverUUID,
  checksum: "a0b124c3def45g67890h12i3j4567k8l9mn01234",
  checksum_type: "sha1",
  size: 1234,
  successful: false,
  parts: null,
});
 
await panel.sendActivityLogs([
  {
    user: "abcde1fg-2345-6789-012h-ij34kl5m6789",
    server: "a1bc2345-678d-9e01-2f3g-4hijk5l6m789",
    event: "server:sftp.write", // This is an example event
    metadata: { // Metadata depends on the event
      files: [ "/fake.log" ],
    },
    ip: "0.0.0.0",
    timestamp: "1968-01-01T00:00:00.000000000Z",
  },
  ... // You can send multiple activities in one request.
]);
```
