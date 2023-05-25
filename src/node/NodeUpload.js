module.exports.NodeUpload = {
  /**
   * Uploads a file to a server
   */
  uploadFile({ server_uuid, directory = "/" }) {
    // POST /upload/file

    // If you replace 'URL GIVEN' and upload a file using this HTML code, the file will be added.
    /*  <form action="URL GIVEN" method="post" enctype="multipart/form-data"> 
          <input name="files" type="file">
          <input type="submit">
        </form> */

    const jwt = this.signJWT({ server_uuid });
    return {
      method: "post",
      url: `${this.fqdn}/upload/file?token=${jwt.token}&directory=${encodeURIComponent(directory)}`,
      jwt
    };
  },
};
