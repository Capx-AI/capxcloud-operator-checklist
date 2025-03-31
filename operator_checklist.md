operator checklist:

- signed up to symbiotic
  isEntity on symbiotic operator registry: `0xAd817a6Bc954F678451A71363f04150FDD81Af9F` (ethereum)

```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "entity_",
      "type": "address"
    }
  ],
  "name": "isEntity",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
```

- opted in to symbiotic
  isOptedIn on symbiotic network opt in service: `0x7133415b33b438843d581013f98a08704316633c` (ethereum)

```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "who",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "where",
      "type": "address"
    }
  ],
  "name": "isOptedIn",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
```

- opted in to network
  isOperatorRegistered on capx network: `0xad12e74847d6d1487a6a3a6b75d1f509f3f627e8` (ethereum)

```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }
  ],
  "name": "isOperatorRegistered",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
```

- has delegated stake
  votingPower on capx network: `0xad12e74847d6d1487a6a3a6b75d1f509f3f627e8` (ethereum)

```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_operator",
      "type": "address"
    }
  ],
  "name": "votingPower",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
```

- is active on l2
  operatorsIdsByAddress on l2 attestation center: `0x5103Aa9a96EB3FC4C3A700e14135E0ff3739b12c` (arbitrum)
  isActive on l2 obls: `0x747c68214410326d181AD78279ae42306e2DcB69` (arbitrum)
  votingPower on l2 obls: `0x747c68214410326d181AD78279ae42306e2DcB69` (arbitrum)

```json
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_operator",
      "type": "address"
    }
  ],
  "name": "operatorsIdsByAddress",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
```

```json
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_index",
      "type": "uint256"
    }
  ],
  "name": "isActive",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
```

```json
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_index",
      "type": "uint256"
    }
  ],
  "name": "votingPower",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
```
