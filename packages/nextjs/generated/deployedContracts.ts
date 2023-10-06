const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        EventAliases: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
              ],
              name: "adminSetName",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "aliases",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "users",
                  type: "address[]",
                },
              ],
              name: "getNames",
              outputs: [
                {
                  internalType: "string[]",
                  name: "",
                  type: "string[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
              ],
              name: "setName",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        SaltToken: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MINTER_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "_wallets",
                  type: "address[]",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "mintMultiple",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        AvocadoToken: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MINTER_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        BananaToken: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MINTER_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        TomatoToken: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MINTER_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        EventSBT: {
          address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "gemAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Paused",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Unpaused",
              type: "event",
            },
            {
              inputs: [],
              name: "DEADLINE_TIME",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenType",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "uri",
                  type: "string",
                },
              ],
              name: "addTokenType",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256[]",
                  name: "tokenTypes",
                  type: "uint256[]",
                },
                {
                  internalType: "string[]",
                  name: "uris",
                  type: "string[]",
                },
              ],
              name: "addTokenTypeBatch",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "to",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "tokenType",
                  type: "uint256[]",
                },
              ],
              name: "batchMint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenType",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "pause",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "paused",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "supply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "tokenByIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "tokenOfOwnerByIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "unpause",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        DisperseFunds: {
          address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_saltAddr",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "InsufficientDai",
              type: "error",
            },
            {
              inputs: [],
              name: "InsufficientSalt",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              inputs: [],
              name: "DAI_FAUCET_AMOUNT",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "DISPENSER_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "SALT_FAUCET_AMOUNT",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "users",
                  type: "address[]",
                },
              ],
              name: "disperseBatch",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "saltAddr",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        BasicDexAvocado: {
          address: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_creditToken",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_assetToken",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "InitError",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_liquidityAvailable",
                  type: "uint256",
                },
              ],
              name: "InsufficientLiquidityError",
              type: "error",
            },
            {
              inputs: [],
              name: "SlippageError",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              name: "TokenTransferError",
              type: "error",
            },
            {
              inputs: [],
              name: "ZeroQuantityError",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_liquidityMinted",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_creditTokenAdded",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_assetTokenAdded",
                  type: "uint256",
                },
              ],
              name: "LiquidityProvided",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_liquidityAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_creditTokenAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_assetTokenAmount",
                  type: "uint256",
                },
              ],
              name: "LiquidityRemoved",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tradeDirection",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tokensSwapped",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tokensReceived",
                  type: "uint256",
                },
              ],
              name: "TokenSwap",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "assetIn",
                  type: "uint256",
                },
              ],
              name: "assetInPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditOut",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "assetOut",
                  type: "uint256",
                },
              ],
              name: "assetOutPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditIn",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokensIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "minTokensBack",
                  type: "uint256",
                },
              ],
              name: "assetToCredit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "tokenOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "assetToken",
              outputs: [
                {
                  internalType: "contract IERC20",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditIn",
                  type: "uint256",
                },
              ],
              name: "creditInPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "assetOut",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditOut",
                  type: "uint256",
                },
              ],
              name: "creditOutPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "assetIn",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokensIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "minTokensBack",
                  type: "uint256",
                },
              ],
              name: "creditToAsset",
              outputs: [
                {
                  internalType: "uint256",
                  name: "tokenOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "creditToken",
              outputs: [
                {
                  internalType: "contract IERC20",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditTokenDeposited",
                  type: "uint256",
                },
              ],
              name: "deposit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "liquidityMinted",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAssetAddr",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getCreditAddr",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
              ],
              name: "getLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokens",
                  type: "uint256",
                },
              ],
              name: "init",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "liquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "xInput",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "xReserves",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "yReserves",
                  type: "uint256",
                },
              ],
              name: "price",
              outputs: [
                {
                  internalType: "uint256",
                  name: "yOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "totalLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditTokenAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "assetTokenAmount",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        BasicDexBanana: {
          address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_creditToken",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_assetToken",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "InitError",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_liquidityAvailable",
                  type: "uint256",
                },
              ],
              name: "InsufficientLiquidityError",
              type: "error",
            },
            {
              inputs: [],
              name: "SlippageError",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              name: "TokenTransferError",
              type: "error",
            },
            {
              inputs: [],
              name: "ZeroQuantityError",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_liquidityMinted",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_creditTokenAdded",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_assetTokenAdded",
                  type: "uint256",
                },
              ],
              name: "LiquidityProvided",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_liquidityAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_creditTokenAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_assetTokenAmount",
                  type: "uint256",
                },
              ],
              name: "LiquidityRemoved",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tradeDirection",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tokensSwapped",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tokensReceived",
                  type: "uint256",
                },
              ],
              name: "TokenSwap",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "assetIn",
                  type: "uint256",
                },
              ],
              name: "assetInPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditOut",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "assetOut",
                  type: "uint256",
                },
              ],
              name: "assetOutPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditIn",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokensIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "minTokensBack",
                  type: "uint256",
                },
              ],
              name: "assetToCredit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "tokenOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "assetToken",
              outputs: [
                {
                  internalType: "contract IERC20",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditIn",
                  type: "uint256",
                },
              ],
              name: "creditInPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "assetOut",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditOut",
                  type: "uint256",
                },
              ],
              name: "creditOutPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "assetIn",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokensIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "minTokensBack",
                  type: "uint256",
                },
              ],
              name: "creditToAsset",
              outputs: [
                {
                  internalType: "uint256",
                  name: "tokenOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "creditToken",
              outputs: [
                {
                  internalType: "contract IERC20",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditTokenDeposited",
                  type: "uint256",
                },
              ],
              name: "deposit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "liquidityMinted",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAssetAddr",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getCreditAddr",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
              ],
              name: "getLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokens",
                  type: "uint256",
                },
              ],
              name: "init",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "liquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "xInput",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "xReserves",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "yReserves",
                  type: "uint256",
                },
              ],
              name: "price",
              outputs: [
                {
                  internalType: "uint256",
                  name: "yOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "totalLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditTokenAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "assetTokenAmount",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        BasicDexTomato: {
          address: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_creditToken",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_assetToken",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "InitError",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_liquidityAvailable",
                  type: "uint256",
                },
              ],
              name: "InsufficientLiquidityError",
              type: "error",
            },
            {
              inputs: [],
              name: "SlippageError",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              name: "TokenTransferError",
              type: "error",
            },
            {
              inputs: [],
              name: "ZeroQuantityError",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_liquidityMinted",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_creditTokenAdded",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_assetTokenAdded",
                  type: "uint256",
                },
              ],
              name: "LiquidityProvided",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_liquidityAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_creditTokenAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_assetTokenAmount",
                  type: "uint256",
                },
              ],
              name: "LiquidityRemoved",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tradeDirection",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tokensSwapped",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_tokensReceived",
                  type: "uint256",
                },
              ],
              name: "TokenSwap",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "assetIn",
                  type: "uint256",
                },
              ],
              name: "assetInPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditOut",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "assetOut",
                  type: "uint256",
                },
              ],
              name: "assetOutPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditIn",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokensIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "minTokensBack",
                  type: "uint256",
                },
              ],
              name: "assetToCredit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "tokenOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "assetToken",
              outputs: [
                {
                  internalType: "contract IERC20",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditIn",
                  type: "uint256",
                },
              ],
              name: "creditInPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "assetOut",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditOut",
                  type: "uint256",
                },
              ],
              name: "creditOutPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "assetIn",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokensIn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "minTokensBack",
                  type: "uint256",
                },
              ],
              name: "creditToAsset",
              outputs: [
                {
                  internalType: "uint256",
                  name: "tokenOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "creditToken",
              outputs: [
                {
                  internalType: "contract IERC20",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "creditTokenDeposited",
                  type: "uint256",
                },
              ],
              name: "deposit",
              outputs: [
                {
                  internalType: "uint256",
                  name: "liquidityMinted",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAssetAddr",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getCreditAddr",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
              ],
              name: "getLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokens",
                  type: "uint256",
                },
              ],
              name: "init",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "liquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "xInput",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "xReserves",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "yReserves",
                  type: "uint256",
                },
              ],
              name: "price",
              outputs: [
                {
                  internalType: "uint256",
                  name: "yOutput",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "totalLiquidity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [
                {
                  internalType: "uint256",
                  name: "creditTokenAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "assetTokenAmount",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        CongratsVIPLounge: {
          address: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "VIPs",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getAddresses",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "addy",
                  type: "address",
                },
              ],
              name: "setVIPStatus",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
