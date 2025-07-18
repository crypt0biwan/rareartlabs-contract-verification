# Rare Art Labs contract verification

This repo tries to find the correct compiler settings that result in the same bytecode as the on-chain bytecode of the [Genesis Matt contract](https://etherscan.io/address/0xa6dc8b9f60b6ff2555a62cdc6acf792c4cb85948#code) and the other 870 contracts.

## Prerequisites
* Install NodeJS (see `.nvmrc` file for version)
* Install dependencies (see `package.json`) with `npm i`

### Run script and suppress warnings (needed for deprecated asm.js)
```bash
node  --no-warnings compile.js
```

or run `npm run compile`