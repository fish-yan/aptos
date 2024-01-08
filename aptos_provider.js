
"use strict";

import BaseProvider from "./base_provider";
// import {AptosClient} from "aptos";

class AptosWeb3Provider extends BaseProvider {

  constructor(config) {
    super(config);
    this.requestId = 0;
    this.address;
    this._isConnected = false;
    // this.client = new AptosClient('https://fullnode.devnet.aptoslabs.com');
  }

  _message(method, data) {
    const id = ++this.requestId
    let body = {
      id: id,
      method: method,
      data: data
    }
    const that = this;
    return new Promise(function (resolve, reject) {
      console.log(method + "  ==== " + data);

      that.callBackMap.set(id, (error, data) => {
        console.log('set callback');
        if (error) {
          console.log('reject');
          reject(error);
        } else {
          console.log('resolve');
          resolve(data);
        }
      });
      that.postMessage(JSON.stringify(body))
    })
  }

  request(param) {
    return this._message({method: param.method, data: param})
  }

}

module.exports = AptosWeb3Provider;
