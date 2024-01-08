
class MartianWeb3 {
    requestId;
    address;
    _isConnected = !1;
    constructor() {
        this.requestId = 1
    }
    async connect() {
        return new Promise(async(e, s) => {
            try {
                var t = await this._message("connect", {});
                window.martian._isConnected = !0,
                window.martian.address = t.address,
                e(t)
            } catch(e) {
                s(e)
            }
        })
    }
    async isConnected() {
        return Promise.resolve(this._isConnected)
    }
    async disconnect() {
        var e = await this._message("disconnect", {});
        return this._isConnected = !1,
            this.address = null,
            e
    }
    async account() {
        return this._message("account", this.address)
    }
    async getAccount(e) {
        return this._message("getAccount", e)
    }
    async getAccountResources(e, s) {
        return this._message("getAccountResources", {
            address: e,
            query: s
        })
    }
    async getAccountTransactions(e, s) {
        return this._message("getAccountTransactions", {
            address: e,
            query: s
        })
    }
    async signAndSubmitTransaction(e) {
        return this._message("signAndSubmitTxn", e)
    }
    async generateTransaction(e, s, t) {
        return this._message("generateTransaction", {
            sender: e,
            payload: s,
            options: t
        })
    }
    async signGenericTransaction(e) {
        return this._message("signGenericTxn", e)
    }
    async signTransaction(e) {
        return this._message("signTransaction", e)
    }
    async generateBCSTransaction(e) {
        return this._message("generateBCSTransaction", e)
    }
    async generateBCSSimulation(e) {
        return this._message("generateBCSSimulation", e)
    }
    async submitSignedBCSTransaction(e) {
        return this._message("submitSignedBCSTransaction", e)
    }
    async signMessage(e) {
        return this._message("signMessage", e)
    }
    async submitTransaction(e) {
        return this._message("submitTransaction", e)
    }
    async getChainId() {
        return this._message("getChainId", {})
    }
    async getLedgerInfo() {
        return this._message("getLedgerInfo", {})
    }
    async getTransactions(e) {
        return this._message("getTransactions", e)
    }
    async getTransaction(e) {
        return this._message("getTransaction", e)
    }
    async transactionPending(e) {
        return this._message("getTransactionPending", e)
    }
    async getTableItem(e, s, t = {}) {
        return this._message("getTableItem", {
            handle: e,
            data: s,
            params: t
        })
    }
    async createCollection(e, s, t) {
        return this._message("createCollection", {
            name: e,
            description: s,
            uri: t
        })
    }
    async createToken(e, s, t, a, n, i = this.address, r = 0, c = 0, o = [], d = [], u = []) {
        return this._message("createToken", {
            collectionName: e,
            name: s,
            description: t,
            supply: a,
            uri: n,
            royalty_payee_address: "0" === i.toString() ? this.address: i,
            royalty_points_denominator: r,
            royalty_points_numerator: c,
            property_keys: o,
            property_values: d,
            property_types: u
        })
    }
    _message(i, e) {
        const r = this.requestId;
        this.requestId += 1;
        return new Promise(function(t, a) {
                const n = e => {
                    if (e.detail.responseMethod === i && e.detail.id === r) {
                        const s = e.detail.response;
                        window.removeEventListener("martian_contentscript_message", n),
                        "connect" === i && (window.martian._isConnected = 200 === s.status, 200 !== s.status && (s.error = "User rejected the request")),
                            s.error ? a(s.error ?? "Error") : t(s)
                    }
                };
                window.addEventListener("martian_contentscript_message", n),
                    window.dispatchEvent(new CustomEvent("martian_injected_script_message", {
                        detail: {
                            method: i,
                            data: e,
                            id: r
                        }
                    }))
            })
    }
}

window.martian = new MartianWeb3