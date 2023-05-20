// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./access/ERC165.sol";
import "./extensions/ERC1155Mintable.sol";
import "./MinterRole.sol";

abstract contract ERC1155MetadataMintable is MinterRole, ERC1155Mintable {

    function uint256ToString(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            k = k-1;
            uint8 temp = uint8(48 + _i % 10);
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function mintWithUriByTokenId(address to, uint256 tokenId, uint256 amount) public onlyMinter returns (bool) {
        mint(tokenId, to, amount);
        _setURI(tokenId, string(abi.encodePacked(uint256ToString(tokenId), ".json")));

        return true;
    }

    function mintWithUriByTokenId(address[] memory toList, uint256 tokenId, uint256[] memory amounts) public onlyMinter returns (bool) {
        mint(tokenId, toList, amounts);
        _setURI(tokenId, string(abi.encodePacked(uint256ToString(tokenId), ".json")));

        return true;
    }

    function mintBatchWithUriByTokenId(address to, uint256[] memory tokenIds, uint256[] memory amounts) public onlyMinter returns (bool) {
        _mintBatch(to, tokenIds, amounts, "");
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _setURI(tokenIds[i], string(abi.encodePacked(uint256ToString(tokenIds[i]), ".json")));
        }

        return true;
    }

}
