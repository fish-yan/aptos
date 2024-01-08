
window.addEventListener('changeAddress', (e) => {
  window.martian.address = e.detail.address
})

const legacyApis = {
  createNFTCollection: (t, a, n, e, i) => {},
  createNFT: (t, a, n, i, e, r) => {},
  signGenericTransaction: async(s, t, a, n) => {},
  getAccountBalance: s => {
    const t = e =>{
      window.removeEventListener("gtcoins", t),
          200 === e.detail.status ? s({
            status: 200,
            message: "Balance fetched successfully",
            data: e.detail.data
          }) : s({
            status: -32603,
            message: "Unable to fetch balance"
          })
    };
    window.addEventListener("gtcoins", t);
    window.dispatchEvent(new CustomEvent("aipht"))
  },
  getSentEvents: s => {
    const t = e => {
      window.removeEventListener("gtsevent", t),
          200 === e.detail.status ? s({
            status: 200,
            message: "Sent events fetched successfully",
            data: e.detail.data
          }) : s({
            status: -32603,
            message: "Unable to fetch sent events"
          })
    };
    window.addEventListener("gtsevent", t);
    window.dispatchEvent(new CustomEvent("aipsvt"))
  },
  getReceivedEvents: s => {
    const t = e => {
      window.removeEventListener("gtrevent", t),
          200 === e.detail.status ? s({
            status: 200,
            message: "Received events fetched successfully",
            data: e.detail.data
          }) : s({
            status: -32603,
            message: "Unable to fetch received events"
          })
    }
    window.addEventListener("gtrevent", t);
    window.dispatchEvent(new CustomEvent("aiprvt"))
  },
  disconnect: () => (
      window.martian._isConnected = !1, window.martian.legacy.isConnected = !1, window.martian.address = null, !(window.martian.legacy.address = null)),
      isConnected: !1,
      address: null
};

