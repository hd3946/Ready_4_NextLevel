// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract IERC1155Mintable {
    function uri(uint256 tokenId) public view virtual returns (string memory);

    function create(uint256 id, uint256 initialSupply,string memory uri_) public virtual returns (bool);

    function mint(uint256 id, address to, uint256 amount) public virtual;

    function mint(uint256 id, address[] memory toList, uint256[] memory amounts) public virtual;

    function mintBatch( address to, uint256[] memory ids, uint256[] memory amounts) public virtual;

    function _exists(uint256 id) internal view virtual returns (bool);
    function _setURI(uint256 tokenId, string memory tokenURI) internal virtual;
    function _setBaseURI(string memory baseURI) internal virtual;
    function specifyEventTime(uint256[] calldata tokenIds, uint256[] memory specifyTime) public virtual;
    
}
