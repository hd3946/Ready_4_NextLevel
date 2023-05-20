// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract IERC1155MetadataMintable {

    function mintWithUriByTokenId(address to, uint256 tokenId, uint256 amount) public virtual returns (bool);

    function mintWithUriByTokenId(address[] memory toList, uint256 tokenId, uint256[] memory amounts) public virtual returns (bool);

    function mintBatchWithUriByTokenId(address to, uint256[] memory tokenIds, uint256[] memory amounts) public virtual returns (bool);
}
