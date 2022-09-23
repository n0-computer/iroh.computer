+++
title = "configuration"
description = "Iroh cloud configureation"
template="docs/page.html"
[extra]
section="cloud"
+++

# gateway

# p2p

```toml
# Local listening address that other services should dial p2p on
# default: "/ip4/0.0.0.0/tcp/4444"
listening_multiaddr = "/ip4/0.0.0.0/tcp/4444"
# Bootstrap peer list.
# default
bootstrap_peers = [
  "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ", # mars.i.ipfs.io
]
# Mdns discovery enabled.
# default: false
mdns = false
# Kademlia discovery enabled.
kademlia = true
# Autonat holepunching enabled.
autonat = true
# Relay server enabled.
relay_server = true
# Relay client enabled.
relay_client = true
# Gossipsub enabled.
gossipsub = true
# 
max_conns_out = 256
max_conns_in = 256
max_conns_pending_out = 256
max_conns_pending_in = 256
max_conns_per_peer = 8
notify_handler_buffer_size = 256
connection_event_buffer_size = 256
dial_concurrency_factor = 16
```

# store

