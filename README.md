# Janken-API

## System Architecture
<p align="center">
  <img src="./architecture.png" width="600">
</p>

## Interact with CLI
- deploy contract
```sh
node cmd/cmd.js deploy snip721
node cmd/cmd.js deploy janken
```

- mint SNIP721 token
```sh
node cmd/cmd.js tx mint_nft
```

- make offer
```sh
node cmd/cmd.js tx make_offer
```

- accept offer
```sh
node cmd/cmd.js tx accept_offer
```

- decline offer
```sh
node cmd/cmd.js tx decline_offer
```
