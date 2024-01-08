
"use strict";

import { EventEmitter } from "events";

class BaseProvider extends EventEmitter {
  constructor(config) {
    super();
    this.isDebug = !!config.isDebug;
    this.isAptos = true;
    this.callBackMap = new Map();
  }

  /**
   * @private Internal js -> native message handler
   */
  postMessage(data) {
    if (window.aptoswallet.postMessage) {
      console.log('postMessage to aptos wallet');
      window.aptoswallet.postMessage(data);
    } else {
      console.error("postMessage is not available");
    }
  }

  /**
   * @private Internal native result -> js
   */
  sendResponse(id, result) {
    let callback = this.callBackMap.get(id);
    console.log(
        `<== sendResponse id: ${id}, result: ${JSON.stringify(result)}`
    );
    if (callback) {
      // const re = {
      //   method: 'connect',
      //   status: 200,
      //   address: result,
      //   data: result
      // }
      const re = {
        address: result,
        data: result
      }
      callback(null, re);
      this.callBackMap.delete(id);
    } else {
      console.log(`callback id: ${id} not found`);
    }
  }

  /**
   * @private Internal native error -> js
   */
   sendError(id, error) {
    console.log(`<== ${id} sendError ${error}`);
    let callback = this.callBackMap.get(id);
    if (callback) {
      callback(error instanceof Error ? error : new Error(error), null);
      this.callBackMap.delete(id);
    }
  }
}

module.exports = BaseProvider;
