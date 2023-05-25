module.exports.NodeGenerateConfiguration = ({ fqdn, config }) => {
  fqdn = fqdn.endsWith("/") ? fqdn.slice(0, -1) : fqdn;
  config.remote = config.remote.endsWith("/") ? config.remote.slice(0, -1) : config.remote;

  return {
    debug: config.debug || false,
    uuid: config.uuid,
    token_id: config.token_id,
    token: config.token,
    api: {
      host: config.api?.host || "0.0.0.0",
      port: config.api?.port || 8080,
      ssl: {
        enabled: config.api?.ssl?.enabled || true,
        cert: config.api?.ssl?.cert || `/etc/letsencrypt/live/${fqdn}/fullchain.pem`,
        key: config.api?.ssl?.key || `/etc/letsencrypt/live/${fqdn}/privkey.pem`,
      },
      upload_limit: config.api?.upload_limit || 100,
    },
    system: {
      data: config.system?.data || "/var/lib/pterodactyl/volumes",
      sftp: {
        bind_port: config.system?.sftp?.bind_port || 2020,
      },
    },
    allowed_mounts: config.allowed_mounts || [],
    remote: config.remote,
  };
};
