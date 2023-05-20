// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC721.sol";
import "./IERC721.sol";
import "./IERC721MetadataMintable.sol";
import "./IERC721Burnable.sol";
import "./IERC721Enumerable.sol";
import "./IERC721Metadata.sol";
import "./IERC721Receiver.sol";
import "./IPowerStation.sol";
import "./OwnerRole.sol";
import "./Roles.sol";
import "./SafeMath.sol";
import "./IERC1155.sol";
import "./IERC1155Mintable.sol";
import "./IERC1155Burnable.sol";
import "./IERC1155MetadataURI.sol";
import "./IERC1155MetadataMintable.sol";
import "./IERC1155Receiver.sol";

contract Exchange is OwnerRole, IERC721Receiver, IERC1155Receiver {
    using SafeMath for uint256;
    using Roles for Roles.Role;

    struct EventInfo{
        string name;
        uint256 timeStamp;
        uint256 eventMax;
        uint256[] tokenIds;
    }

    mapping (uint256 => address) private _signatureOwners;
    mapping (uint256 => EventInfo) public _event;

    event EventAdd(uint256 indexed eventId, uint256 specifyTime, uint256 eventCount, uint256[] tokenIds);

    constructor(address payable owner) OwnerRole(owner) {
        /* Do nothing */
    }

    function supportsInterface(bytes4 interfaceId) public pure override returns (bool) {
        return interfaceId == type(IERC1155Receiver).interfaceId || interfaceId == type(IERC165).interfaceId;
    }

    function getSignatureOwner(uint256 signatureId) public view returns (address) {
        return _signatureOwners[signatureId];
    }

    function setEventNumber(address multiToken, uint256 eventUuid, string memory eventName, uint256 eventTime, uint256 eventCount, uint256[] memory tokenIds) onlyOwner public {
        EventInfo memory info;
        info.name = eventName;
        info.timeStamp = eventTime;
        info.eventMax = eventCount;
        info.tokenIds = tokenIds;
        _event[eventUuid] = info;

        uint256[] memory timeArray = new uint256[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            timeArray[i] = eventTime;
        }

        IERC1155Mintable(multiToken).specifyEventTime(tokenIds, timeArray);
        emit EventAdd(eventUuid, eventTime, eventCount, tokenIds);
    }

    function setEventFinalRewardTime(address token, uint256 tokenId, uint256 specifyTime) public onlyOwner {
        IERC721MetadataMintable(token).setSpecifyEventTime(tokenId, specifyTime);
    }

    /* */

    function mintWithUriByTokenId(address token, uint256 tokenId, uint256 amount, uint256 signatureId, bytes memory signature) public {
        bytes memory message = abi.encodePacked("mintWithUriByTokenId", signatureId, token, msg.sender, tokenId, amount);
        bytes32 hashedMessage = keccak256(message);
        
        require(_signatureOwners[signatureId] == address(0), "Exchange: signature reused");
        require(_verifyMessage(hashedMessage, signature) == msg.sender, "Exchange: signature not verified");

        _signatureOwners[signatureId] = msg.sender;

        IERC1155MetadataMintable(token).mintWithUriByTokenId(msg.sender, tokenId, amount);
    }

    function mintBatchWithUriByTokenId(address token, uint256[] memory tokenIds, uint256[] memory amounts, uint256 signatureId, bytes memory signature) public {
        bytes memory message = abi.encodePacked("mintBatchWithUriByTokenId", signatureId, token, msg.sender, tokenIds, amounts);
        bytes32 hashedMessage = keccak256(message);
        
        require(_signatureOwners[signatureId] == address(0), "Exchange: signature reused");
        require(_verifyMessage(hashedMessage, signature) == msg.sender, "Exchange: signature not verified");

        _signatureOwners[signatureId] = msg.sender;

        IERC1155MetadataMintable(token).mintBatchWithUriByTokenId(msg.sender, tokenIds, amounts);
    }

    function burnNFT(address token, uint256 tokenId, uint256 amount, uint256 signatureId, bytes memory signature) public {
        bytes memory message = abi.encodePacked("burnNFT", signatureId, token, msg.sender, tokenId, amount);
        bytes32 hashedMessage = keccak256(message);
        
        require(_signatureOwners[signatureId] == address(0), "Exchange: signature reused");
        require(_verifyMessage(hashedMessage, signature) == msg.sender, "Exchange: signature not verified");

        _signatureOwners[signatureId] = msg.sender;

        IERC1155(token).safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        IERC1155Burnable(token).burn(address(this), tokenId, amount);
    }

    function burnBatchNFT(address token, uint256[] memory tokenIds, uint256[] memory amounts, uint256 signatureId, bytes memory signature) public {
        bytes memory message = abi.encodePacked("burnBatchNFT", signatureId, token, msg.sender, tokenIds, amounts);
        bytes32 hashedMessage = keccak256(message);
        
        require(_signatureOwners[signatureId] == address(0), "Exchange: signature reused");
        require(_verifyMessage(hashedMessage, signature) == msg.sender, "Exchange: signature not verified");

        _signatureOwners[signatureId] = msg.sender;

        IERC1155(token).safeBatchTransferFrom(msg.sender, address(this), tokenIds, amounts, "");
        IERC1155Burnable(token).burnBatch(address(this), tokenIds, amounts);
    }

    function mintNFTWithTokenURI(address token, address multiToken, uint256 eventId, uint256 tokenId,string memory tokenURI, uint256 signatureId, bytes memory signature) public {
        EventInfo memory info =  _event[eventId];
        require(info.tokenIds.length == 0, "This is an unregistered event.");

        for (uint256 i = 0; i < info.tokenIds.length; i++) {
            require(IERC1155(multiToken).balanceOf(msg.sender, info.tokenIds[i]) == 0, "You have not completed all events."); 
        }

        bytes memory message = abi.encodePacked("mintNFTWithTokenURI", signatureId, token, multiToken, eventId, msg.sender, tokenId);
        bytes32 hashedMessage = keccak256(message);
        
        require(_signatureOwners[signatureId] == address(0), "Exchange: signature reused");
        require(_verifyMessage(hashedMessage, signature) == msg.sender, "Exchange: signature not verified");

        _signatureOwners[signatureId] = msg.sender;

        IERC721MetadataMintable(token).mintWithTokenURI(msg.sender, tokenId, tokenURI);
    }

    function mintNFTWithTokenCID(address token, address multiToken, uint256 eventId, uint256 tokenId, string memory tokenCID, uint256 signatureId, bytes memory signature) public {
        EventInfo memory info =  _event[eventId];
        require(info.tokenIds.length == 0, "This is an unregistered event.");

        for (uint256 i = 0; i < info.tokenIds.length; i++) {
            require(IERC1155(multiToken).balanceOf(msg.sender, info.tokenIds[i]) == 0, "You have not completed all events."); 
        }
        bytes memory message = abi.encodePacked("mintNFTWithTokenCID", signatureId, token, multiToken, eventId, msg.sender, tokenId);
        bytes32 hashedMessage = keccak256(message);
        
        require(_signatureOwners[signatureId] == address(0), "Exchange: signature reused");
        require(_verifyMessage(hashedMessage, signature) == msg.sender, "Exchange: signature not verified");

        _signatureOwners[signatureId] = msg.sender;

        IERC721MetadataMintable(token).mintWithTokenCID(msg.sender, tokenId, tokenCID);
    }

    function burnNFT(address token, uint256 tokenId, uint256 signatureId, bytes memory signature) public {
        bytes memory message = abi.encodePacked("burnNFT", signatureId, token, msg.sender, tokenId);
        bytes32 hashedMessage = keccak256(message);
        
        require(_signatureOwners[signatureId] == address(0), "Exchange: signature reused");
        require(_verifyMessage(hashedMessage, signature) == msg.sender, "Exchange: signature not verified");

        _signatureOwners[signatureId] = msg.sender;

        IERC721(token).safeTransferFrom(msg.sender, address(this), tokenId);
        IERC721Burnable(token).burn(tokenId);
    }

    function _verifyMessage(bytes32 hashedMessage, bytes memory signature) private pure returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, hashedMessage));
        bytes32 r;
        bytes32 s;
        uint8 v;

        if (signature.length != 65) {
            return address(0);
        }

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := and(mload(add(signature, 65)), 255)
        }

        if (v < 27) {
            v += 27;
        }

        if (v != 27 && v != 28) {
            return address(0);
        }

        return ecrecover(prefixedHash, v, r, s);
    }
    
    /* IERC721Receiver & IERC721Receiver functions */

    function onERC721Received(address, address, uint256, bytes memory) override public pure returns(bytes4) {
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }

    function onERC1155Received(address, address, uint256, uint256, bytes memory) override public pure returns (bytes4) {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }

    function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) override public pure returns (bytes4) {
        return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
    }
}
