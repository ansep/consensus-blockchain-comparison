let Tendermint = require('tendermint')
 
// some full node's RPC port
let peer = 'ws://localhost:26657/websocket'
 
// `state` contains a part of the chain we know to be valid. If it's
// too old, we cannot safely verify the chain and need to get a newer
// state out-of-band.
let state = {
  // a header, in the same format as returned by RPC
  // (see http://localhost:26657/commit, under `"header":`)
  header: {
    "version": {
      "block": "11",
      "app": "1"
    },
    "chain_id": "test-chain-Xyd0c3",
    "height": "4920",
    "time": "2024-04-29T19:13:04.903246683Z",
    "last_block_id": {
      "hash": "1B2C93310290C97AF5320D61156C59B6BB44FCE75F45FDE5E338AFDA981909C3",
      "parts": {
        "total": 1,
        "hash": "15D550C346A9FE3E1F4CC06D8EB135F35A7BF08B9FAFE559DB955E0AEADB22C1"
      }
    },
    "last_commit_hash": "8E0B5A4830D1BC4157BE0CBDBB9743CCA9FCB6880D327B43A55C2865562D8C97",
    "data_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
    "validators_hash": "F7F938A61BC91D6807F057240DB00692E51E2F7B4E9366C7DF47F54583999558",
    "next_validators_hash": "F7F938A61BC91D6807F057240DB00692E51E2F7B4E9366C7DF47F54583999558",
    "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
    "app_hash": "0A00000000000000",
    "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
    "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
    "proposer_address": "92216D65707444A79D9B09133A2FF8F82CE154F6"
  },
 
  // the valdiator set for this header, in the same format as returned by RPC
  // (see http://localhost:26657/validators)
  validators: [
    {
      "address": "92216D65707444A79D9B09133A2FF8F82CE154F6",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "dndUjBrKAvPURRVUKTFgYHuwM8BBfnzluZNQ3AvesuE="
      },
      "voting_power": "10",
      "proposer_priority": "0"
    }
  ],
 
  // the commit (validator signatures) for this header, in the same format as
  // returned by RPC (see http://localhost:26657/commit, under `"commit":`)
  commit: {
    "height": "4920",
    "round": 0,
    "block_id": {
      "hash": "C8E0A6829DBEDFAC09079CDEDC3C0EE713F2292ED76AA1AA3CD443BD261BCB24",
      "parts": {
        "total": 1,
        "hash": "A32315905F3BD6370D5B339D1895C980EE19BA9833AA4823E5DF86C81A2A34D3"
      }
    },
    "signatures": [
      {
        "block_id_flag": 2,
        "validator_address": "92216D65707444A79D9B09133A2FF8F82CE154F6",
        "timestamp": "2024-04-29T19:13:05.925868936Z",
        "signature": "7KYV28V1NOWWvm1u4FEQ7HnJCdj3N8iehh7G+bhNi/nHvJrJyAn2speBgAD0ty54zPWhxt7bM2q80AB14BntBg=="
      }
    ]
  }
}
 
// options
let opts = {
  // the maximum age of a state to be safely accepted,
  // e.g. the unbonding period
  // (in seconds)
  maxAge: 1728000 // defaults to 30 days
}
 
// instantiate client. will automatically start syncing to the latest state of
// the blockchain
let node = Tendermint(peer, state, opts)
 
// make sure to handle errors
node.on('error', (err) => { console.log("Error: " +err) })
// emitted once we have caught up to the current chain tip
node.on('synced', () => { console.log("SYNC") })
// emitted every time we have verified a new part of the blockchain
node.on('update', () => { console.log("UPDATE") })
 
// returns the height of the most recent header we have verified
//console.log(node)
 
// returns the state object ({ header, validators, commit }) of the most recently
// verified header, should be stored and used to instantiate the light client
// the next time the user runs the app
