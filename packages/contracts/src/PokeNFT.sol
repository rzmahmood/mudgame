pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "forge-std/console2.sol";

contract PokeNFT is ERC721Enumerable {
  constructor(
    address owner,
    string memory name,
    string memory symbol,
    string memory baseURI,
    string memory contractURI,
    address receiver,
    uint96 feeNumerator
  ) ERC721(name, symbol) {}

  function mint(address to, uint256 tokenID) external {
    console2.log("minting token %s to %s", tokenID, to);
    _mint(to, tokenID);
  }
}
