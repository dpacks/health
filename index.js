module.exports = function (ddb) {
  if (ddb.content) ddb = ddb.content

  function get () {
    if (!ddb || !ddb.peers) return
    ddb.update()
    var length = ddb.length
    var peers = []

    for (var i = 0; i < ddb.peers.length; i++) {
      var have = 0
      var peer = ddb.peers[i]

      if (!peer.stream || !peer.stream.remoteId) continue

      for (var j = 0; j < length; j++) {
        if (peer.remoteBitfield && peer.remoteBitfield.get(j)) have++
      }

      if (!have) continue
      peers.push({id: i, have: have, length: ddb.length})
    }

    return {
      byteLength: ddb.byteLength,
      length: ddb.length,
      peers: peers
    }
  }

  return {
    get: get
  }
}

function noop () { }
