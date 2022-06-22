// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SampleERC20
 * @dev Create a sample ERC20 standard token
 */
contract TokenStorage is ERC20 {

    constructor() ERC20("TokenStorage", "TKSTORE") {}

    struct User {
        bool registered;
        address wallet;
        string name;
        uint256 age;
    }

    mapping (address => User) internal users;

    function registerUser(string memory _name, uint256 _age, address _wallet) public {
        User storage user = users[_wallet];

        require(!user.registered, "Usuario ja cadastrado");

        user.wallet = _wallet;
        user.name = _name;
        user.age = _age;
        user.registered = true;

        _mint(_wallet, _age * 1 ether);
    }

    function getUser(address _wallet) public view returns (uint256 _age, string memory _name) {
        User storage user = users[_wallet];
        _age = user.age;
        _name = user.name;
    }
}