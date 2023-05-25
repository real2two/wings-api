const { NodeGenerateConfiguration } = require("./NodeGenerateConfiguration.js");

module.exports.NodeConfiguration = {
  /**
   * Updates the configuration information for a daemon.
   */
  updateConfiguration(config) {
    // POST /api/update

    return this.fetch(`/api/update`, {
      method: "post",
      body: NodeGenerateConfiguration({
        fqdn: this.fqdn,
        config: {
          debug: config?.debug || this.config.debug,
          uuid: config?.uuid || this.config.uuid,
          token_id: config?.token_id || this.config.token_id,
          token: config?.token || this.config.token,
          api: {
            host: config?.api?.host || this.config.api.host,
            port: config?.api?.port || this.config.api.port,
            ssl: {
              enabled: config?.api?.ssl?.enabled || this.config.api.ssl.enabled,
              cert: config?.api?.ssl?.cert || this.config.api.ssl.cert,
              key: config?.api?.ssl?.key || this.config.api.ssl.key,
            },
            upload_limit: config?.api?.upload_limit || this.config.api.upload_limit,
          },
          system: {
            data: config?.system?.data || this.config.system.data,
            sftp: {
              bind_port: config?.system?.sftp?.bind_port || this.config.system.sftp.bind_port,
            },
          },
          allowed_mounts: config?.allowed_mounts || this.config.allowed_mounts,
          remote: config?.remote || this.config.remote,
        },
      }),
    });
  },

  /**
   * Returns system information from the wings instance.
   */
  getSystemInformation() {
    // GET /api/system
    return this.fetch(`/api/system`);
  },
};
