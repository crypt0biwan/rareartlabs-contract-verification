pragma solidity ^0.4.4;

import "./ERC20Metadata.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract ArtToken is StandardToken, ERC20Metadata {

  string public name;
  string public symbol;
  string public tokenURI;
  address public creator;

  uint public decimals = 0;

  function ArtToken (string assetTitle, uint supply, string _tokenURI, address _creator, address _owner) public payable {
    name = assetTitle;
    totalSupply_ = supply;
    tokenURI = _tokenURI;
    creator = _creator;
    balances[_owner] = supply;
  }

  function tokenURI() external view returns (string) {
    return tokenURI;
  }

  function name() external view returns (string _name) {
    _name = name;
  }

  function symbol() external view returns (string _symbol) {
    _symbol = symbol;
  }
}
