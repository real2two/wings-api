module.exports.NodeServerFiles = {
  /**
   * Return the contents of a given file.
   * 
   * Notes:
   * - download determines whether the file content should be returned as a download stream.
   */
  getServerFileContent({ uuid, file, download = false }) {
    // GET /api/servers/:server/files/contents
    return this.fetch(
      `/api/servers/${encodeURIComponent(uuid)}/files/contents?file=${encodeURIComponent(file)}&download=${encodeURIComponent(download)}`,
      {
        headers: {
          accept: "text/plain",
        },
      },
      { attemptToConvertJson: false }
    );
  },

  /**
   * Return a directory listing for a given path.
   */
  getServerFileDirectory({ uuid, directory = "/" }) {
    // GET /api/servers/:server/files/list-directory
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/list-directory?directory=${encodeURIComponent(directory)}`);
  },

  /**
   * Renames or moves files on the remote machine.
   * 
   * Notes:
   * - root is the root directory of the files.
   * - files is an object containing the from-to name pairs.
   */
  renameServerFiles({ uuid, root = "/", files }) {
    // PUT /api/servers/:server/files/rename

    // This is how the body should look.
    /*
    {
      "root": "/",
      "files": [
        {
          "from": "bungee.jar",
          "to": "bungeecord.jar"
        }
      ]
    }
    */

    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/rename`, {
      method: "put",
      body: { root, files }
    });
  },

  /**
   * Copy a given file and give it a unique name.
   */
  copyServerFile({ uuid, location }) {
    // POST /api/servers/:server/files/copy
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/copy`, {
      method: "post",
      body: { location }
    });
  },

  /**
   * Save new contents to a given file. This works for both creating and updating
   * a file.
   */
  writeServerFileContent({ uuid, file, content }) {
    // POST /api/servers/:server/files/write
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/write?file=${encodeURIComponent(file)}`, {
      method: "post",
      headers: {
        "content-type": "text/plain",
      },
      body: content,
    });
  },

  /**
   * Creates a new directory for the server in the given path.
   * 
   * Notes:
   * - name is the name of the directory.
   * - path is the root path that the directory should be created in.
   */
  createServerFileDirectory({ uuid, name, path = "/" }) {
    // POST /api/servers/:server/files/create-directory
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/create-directory`, {
      method: "post",
      body: { name, path }
    });
  },

  /**
   * Delete a file or folder for the server.
   * 
   * Notes:
   * - files must be an array of file names.
   * - root is the root directory of the files.
   */
  deleteServerFile({ uuid, files, root = "/" }) {
    // POST /api/servers/:server/files/delete
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/delete`, {
      method: "post",
      body: { files, root }
    });
  },

  /**
   * Compress the given files or folders in the given root.
   * 
   * Notes:
   * - files must be an array of file names.
   * - root is the root directory of the files.
   */
  compressServerFiles({ uuid, files, root = "/" }) {
    // POST /api/servers/:server/files/compress
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/compress`, {
      method: "post",
      body: { files, root }
    });
  },

  /**
   * Decompresses a given archive file.
   * 
   * Notes:
   * - file must be the file to decompress.
   * - root is the root directory of the files.
   */
  decompressServerFile({ uuid, file, root = "/" }) {
    // POST /api/servers/:server/files/decompress
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/decompress`, {
      method: "post",
      body: { file, root }
    });
  },

  /**
   * Chmods the given files.
   * 
   * Notes:
   * - files must be an array of file-mode pairs.
   * - root is the root directory of the files.
   */
  chmodServerFiles({ uuid, files, root = "/" }) {
    // POST /api/servers/:server/files/chmod
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/chmod`, {
      method: "post",
      body: { files, root }
    });
  },
  
  /**
   * Returns an object containing a list of download objects for in-progress downloads.
   */
  getPullServerFile(uuid) {
    // GET /api/servers/:server/files/pull
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/pull`);
  },
  
  /**
   * Pulls a file from the given URL and saves it to the disk.
   * All servers are limited to 3 simultaneous downloads at a time, if a server reaches this limit, the request is cancelled immediately.
   * 
   * Notes:
   * - url (string, requried) is the URL of the file to download.
   * - file_name (string, optional) is the name to save the file as.
   * - foreground (boolean, optional) determines whether the request should be downloaded synchronously.
   * - root (string, required) must be the root path to download the file to.
   * - use_header (boolean, optional) determines if it uses the remote file header for file information.
   */
  pullServerFile({ uuid, url, file_name, foreground, root = "/", use_header }) {
    // POST /api/servers/:server/files/pull
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/pull`, {
      method: "post",
      body: { url, file_name, foreground, root, use_header }
    });
  },

  /**
   * Deletes an in-progress remote file download.
   */
  deletePullServerFile({ uuid, id }) {
    // DELETE /api/servers/:server/files/pull/:download
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/files/pull/${encodeURIComponent(id)}`, {
      method: "delete"
    });
  },
};
