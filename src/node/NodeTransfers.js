module.exports.NodeTransfers = {
  /**
   * Start a server transfer.
   * 
   * This should only be ran in another dameon.
   */
  // startServerTransfer() {
  //   // POST /api/transfers
  //   return this.fetch(`/api/transfers`, {
  //     method: "post",
  //   });
  // },
  
  /**
   * Cancels an incoming server transfer request.
   */
  deleteIncomingServerTransfer(uuid) {
    // DELETE /api/transfers/:server
    return this.fetch(`/api/transfers/${encodeURIComponent(uuid)}`, {
      method: "delete",
    });
  },

  /**
   * Create a server transfer
   */
  createServerTransfer({ uuid, url, token, start_on_completion = false }) {
    // POST /api/servers/:server/transfer
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/transfer`, {
      method: "post",
      body: {
        url,
        token: this.signJWT({ sub: uuid }, { token, expiresIn: "15m" }).token,
        server: {
          uuid,
          start_on_completion,
        },
      }
    });
  },
  
  /**
   * Cancels an outgoing transfer request for the server.
   */
  deleteOutgoingServerTransfer(uuid) {
    // DELETE /api/servers/:server/transfer
    return this.fetch(`/api/servers/${encodeURIComponent(uuid)}/transfer`, {
      method: "delete",
    });
  },
};
