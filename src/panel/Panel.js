const { fetch } = require("../utilities/fetch.js");

const { PanelSFTP } = require("./PanelSFTP.js");
const { PanelServers } = require("./PanelServers.js");
const { PanelServerCreation } = require("./PanelServerCreation.js");
const { PanelServerTransfer } = require("./PanelServerTransfer.js");
const { PanelServerBackup } = require("./PanelServerBackup.js");

module.exports.Panel = class {
  static get(...args) {
    return new this(...args);
  }
  constructor({ remote, token, token_id }) {
    this.remote = remote.endsWith("/") ? remote.slice(0, -1) : remote;
    this.token = token;
    this.token_id = token_id;
    
    Object.assign(this, PanelSFTP);
    Object.assign(this, PanelServers);
    Object.assign(this, PanelServerCreation);
    Object.assign(this, PanelServerTransfer);
    Object.assign(this, PanelServerBackup);
  }

  fetch(route, data = {}, options) {
    console.log({
      url: this.remote,
      route,
      data: {
        ...data,
        headers: {
          authorization: `Bearer ${this.token}.${this.token_id}`,
          ...data.headers,
        },
      },
      options: {
        attemptToConvertJson: options?.attemptToConvertJson ?? true,
      }
    })
    return fetch({
      url: this.remote,
      route,
      data: {
        ...data,
        headers: {
          authorization: `Bearer ${this.token}.${this.token_id}`,
          ...data.headers,
        },
      },
      options: {
        attemptToConvertJson: options?.attemptToConvertJson ?? true,
      }
    });
  }
}