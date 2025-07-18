pragma solidity ^0.4.4;


interface ERC20Metadata {
  function name() external view returns (string _name);

  function symbol() external view returns (string _symbol);

  function tokenURI() external view returns (string);
}
