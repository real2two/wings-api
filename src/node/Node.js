const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

const { fetch } = require("../utilities/fetch.js");

const { NodeGenerateConfiguration } = require("./NodeGenerateConfiguration.js");

const { NodeConfiguration } = require("./NodeConfiguration.js");
const { NodeDownload } = require("./NodeDownload.js");
const { NodeServerActions } = require("./NodeServerActions.js");
const { NodeServerBackups } = require("./NodeServerBackups.js");
const { NodeServerFiles } = require("./NodeServerFiles.js");
const { NodeServers } = require("./NodeServers.js");
const { NodeTransfers } = require("./NodeTransfers.js");
const { NodeUpload } = require("./NodeUpload.js");
const { NodeWebsocket } = require("./NodeWebsocket.js");

// Only include requests to Wings, not any panel API routes.
// Many documentation comments come directly from https://github.com/pterodactyl/panel/tree/develop/app/Repositories/Wings and https://github.com/devnote-dev/ptero-notes/blob/main/wings

// I know I used documentation comments incorrectly.

module.exports.Node = class {
  static get(...args) {
    return new this(...args);
  }
  static generateConfiguration({ fqdn, config }) {
    return NodeGenerateConfiguration({ fqdn, config });
  }

  constructor({ fqdn, config }) {
    this.fqdn = fqdn.endsWith("/") ? fqdn.slice(0, -1) : fqdn;
    this.config = config;

    Object.assign(this, NodeConfiguration);
    Object.assign(this, NodeDownload);
    Object.assign(this, NodeServerActions);
    Object.assign(this, NodeServerBackups);
    Object.assign(this, NodeServerFiles);
    Object.assign(this, NodeServers);
    Object.assign(this, NodeTransfers);
    Object.assign(this, NodeUpload);
    Object.assign(this, NodeWebsocket);
  }

  fetch(route, data = {}, options = {}) {
    return fetch({
      url: this.fqdn,
      route,
      data: {
        ...data,
        headers: {
          authorization: `Bearer ${this.config.token}`,
          ...data.headers,
        },
      },
      options: {
        attemptToConvertJson: options.attemptToConvertJson ?? true,
      }
    });
  }

  signJWT(values = {}, { token, expiresIn = "5m" } = { expiresIn: "5m" }) {
    if (typeof values.server_uuid !== "string" && typeof values.sub !== "string") throw new Error("Either server_uuid or sub must be defined");
    const jti = crypto.MD5(values.server_uuid || values.sub).toString();
    return {
      jti,
      token: jwt.sign({
        iss: this.config.remote,
        aud: [ this.fqdn ],
        unique_id: (Math.random() + 1).toString(36).substring(2),
        jti,
        ...values,
      }, token || this.config.token, {
        algorithm: "HS256",
        expiresIn,
      })
    };
  }
}

