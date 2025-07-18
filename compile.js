const solc = require('solc');
const fs = require('fs');
const path = require('path');

const fullBytecode = fs.readFileSync(path.resolve(__dirname, 'bytecode.txt'), 'utf8');

function stripHexPrefix(hex) {
  // Check if the string starts with '0x' and remove it
  if (hex.startsWith('0x')) {
    return hex.slice(2);
  }
  return hex;
}

function stripSolcMetadata(bytecode) {
  // Lowercase for consistent matching
  const hex = bytecode.toLowerCase();

  // Swarm metadata always starts with "a165627a7a723058" and ends with "0029"
  const metadataStart = hex.indexOf('a165627a7a723058');

  if (metadataStart === -1) {
    console.warn("Swarm metadata not found. Returning original bytecode.");
    return hex;
  }

  return hex.slice(0, metadataStart);
}

const strippedBytecode = stripSolcMetadata(stripHexPrefix(fullBytecode));

// Prepare input object with keys matching import paths exactly
const input = {
  'ArtToken.sol': fs.readFileSync(path.resolve(__dirname, 'contracts', 'ArtToken.sol'), 'utf8'),
  'ERC20Metadata.sol': fs.readFileSync(path.resolve(__dirname, 'contracts', 'ERC20Metadata.sol'), 'utf8'),
  'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol': fs.readFileSync(path.resolve(__dirname, 'node_modules', 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol'), 'utf8'),
  'zeppelin-solidity/contracts/token/ERC20/BasicToken.sol': fs.readFileSync(path.resolve(__dirname, 'node_modules', 'zeppelin-solidity/contracts/token/ERC20/BasicToken.sol'), 'utf8'),
  'zeppelin-solidity/contracts/token/ERC20/ERC20.sol': fs.readFileSync(path.resolve(__dirname, 'node_modules', 'zeppelin-solidity/contracts/token/ERC20/ERC20.sol'), 'utf8'),
  'zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol': fs.readFileSync(path.resolve(__dirname, 'node_modules', 'zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol'), 'utf8'),
  'zeppelin-solidity/contracts/math/SafeMath.sol': fs.readFileSync(path.resolve(__dirname, 'node_modules', 'zeppelin-solidity/contracts/math/SafeMath.sol'), 'utf8'),
};

const optimize = 1;
const output = solc.compile({sources: input}, optimize);;

if (output.contracts) {
  console.log('Available contracts:', Object.keys(output.contracts));  
  const artTokenContract = output.contracts['ArtToken.sol:ArtToken'];

  if (artTokenContract) {
    console.log('\n=== ArtToken Contract Found ===');
    console.log('ABI:', artTokenContract.interface);

    const runtimeBytecode = artTokenContract.runtimeBytecode;
    const strippedRuntimeBytecode = stripSolcMetadata(runtimeBytecode);

    if( strippedRuntimeBytecode === strippedBytecode) {
      console.log('EUREKA!!!!! Bytecode matches the stripped bytecode from bytecode.txt');
    }
  } else {
    console.log('ArtToken contract not found in output');
  }
} else {
  console.log('No contracts found in output');
  console.log('Full output:', output);
}