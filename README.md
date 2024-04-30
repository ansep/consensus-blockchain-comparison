# consensus-blockchain-comparison
Project for Sapienza University "Dependable Distributed Systems" course

Download and install go https://golang.org/doc/install

Download tendermint https://docs.tendermint.com/v0.33/introduction/install.html

Steps:

1. tendermint init
2. go inside .tendermint/config/config.toml and set under [rpc] crossorigin ["*"]

per provarlo:
3. tendermint node --proxy_app=kvstore

4. poi avviare RPCClient.js