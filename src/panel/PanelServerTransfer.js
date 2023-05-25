module.exports.PanelServerTransfer = {
  /**
   * The daemon notifies the panel about a transfer success or failure.
   */
  setServerTransferStatus({ uuid, success }) {
    // POST /api/remote/servers/{uuid}/transfer/success
    // POST /api/remote/servers/{uuid}/transfer/failure

    return this.fetch(`/api/remote/servers/${encodeURIComponent(uuid)}/transfer/${success ? "success" : "failure"}`, {
      method: "post",
    });
  },
};
