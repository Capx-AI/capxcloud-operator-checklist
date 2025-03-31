// Contract addresses
const CONTRACTS = {
  mainnet: {
    // L1 (ethereum)
    SYMBIOTIC_OPERATOR_REGISTRY: "0xAd817a6Bc954F678451A71363f04150FDD81Af9F",
    SYMBIOTIC_NETWORK_OPT_IN_SERVICE: "0x7133415b33b438843d581013f98a08704316633c",
    CAPX_NETWORK_PROXY: "0xad12e74847d6d1487a6a3a6b75d1f509f3f627e8",
    CAPX_NETWORK_IMPLEMENTATION: "0x421fa5be140170f82631dfecd9e2b3df6781bac4",

    // L2 (arbitrum)
    L2_ATTESTATION_CENTER: "0x5103Aa9a96EB3FC4C3A700e14135E0ff3739b12c",
    L2_OBLS: "0x747c68214410326d181AD78279ae42306e2DcB69",
  },
  testnet: {
    // L1 (holesky)
    SYMBIOTIC_OPERATOR_REGISTRY: "0x6F75a4ffF97326A00e52662d82EA4FdE86a2C548",
    SYMBIOTIC_NETWORK_OPT_IN_SERVICE: "0x58973d16FFA900D11fC22e5e2B6840d9f7e13401",
    CAPX_NETWORK_PROXY: "0x476Ceb36F6f250297Bb59d45f00bdB053445E9CB",
    CAPX_NETWORK_IMPLEMENTATION: "0x29dB23c11a9BCAF78c155B27c00843E8Bf450930",

    // L2 (holesky)
    L2_ATTESTATION_CENTER: "0xd8caa8d58d6e3fB3CfD76D2ee7c982873c9Ce6e3",
    L2_OBLS: "0xAD1567e5059Df5FE37A8626BFaBEdfB5570dAF19",
  },
};

// Contract ABIs (minimal versions with only the functions we need)
const ABIS = {
  isEntity: [
    {
      inputs: [{ internalType: "address", name: "entity_", type: "address" }],
      name: "isEntity",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  isOptedIn: [
    {
      inputs: [
        { internalType: "address", name: "who", type: "address" },
        { internalType: "address", name: "where", type: "address" },
      ],
      name: "isOptedIn",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  isOperatorRegistered: [
    {
      inputs: [{ internalType: "address", name: "operator", type: "address" }],
      name: "isOperatorRegistered",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  votingPower: [
    {
      inputs: [{ internalType: "address", name: "_operator", type: "address" }],
      name: "votingPower",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  l2VotingPower: [
    {
      inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
      name: "votingPower",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  operatorsIdsByAddress: [
    {
      inputs: [{ internalType: "address", name: "_operator", type: "address" }],
      name: "operatorsIdsByAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  isActive: [
    {
      inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
      name: "isActive",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};

// Provider setup
const providers = {
  mainnet: {
    l1: new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/cfbG2jJdddQ1A64OaB3C0uV60A9qM_KD"),
    l2: new ethers.providers.JsonRpcProvider("https://arb-mainnet.g.alchemy.com/v2/cfbG2jJdddQ1A64OaB3C0uV60A9qM_KD"),
  },
  testnet: {
    l1: new ethers.providers.JsonRpcProvider("https://eth-holesky.g.alchemy.com/v2/cfbG2jJdddQ1A64OaB3C0uV60A9qM_KD"),
    l2: new ethers.providers.JsonRpcProvider("https://eth-holesky.g.alchemy.com/v2/cfbG2jJdddQ1A64OaB3C0uV60A9qM_KD"),
  },
};

// Helper function to update status UI
function updateStatus(elementId, status) {
  console.log(`Updating status for ${elementId}:`, status);
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element not found: ${elementId}`);
    return;
  }
  const spinner = element.querySelector(".animate-spin");
  const check = element.querySelector(".check");
  const cross = element.querySelector(".cross");

  spinner.classList.add("hidden");
  check.classList.add("hidden");
  cross.classList.add("hidden");

  if (status === "loading") {
    spinner.classList.remove("hidden");
  } else if (status === true) {
    check.classList.remove("hidden");
    check.classList.add("text-green-500");
  } else {
    cross.classList.remove("hidden");
    cross.classList.add("text-red-500");
  }
}

// Function to check if all checks passed
function checkAllPassed() {
  const statusElements = document.querySelectorAll('[id$="-status"]');
  return Array.from(statusElements).every((element) => {
    const check = element.querySelector(".check");
    return check && !check.classList.contains("hidden");
  });
}

// Function to trigger success celebration
function triggerSuccess() {
  const successMessage = document.getElementById("successMessage");
  successMessage.classList.remove("hidden");

  // Trigger confetti
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);

  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 5000);
}

// Get current network selection
function getCurrentNetwork() {
  const networkToggle = document.getElementById("networkToggle");
  return networkToggle.checked ? "testnet" : "mainnet";
}

// Main function to check operator status
async function checkOperator() {
  console.log("Starting operator check...");
  const address = document.getElementById("operatorAddress").value;
  console.log("Input address:", address);

  if (!ethers.utils.isAddress(address)) {
    alert("Please enter a valid Ethereum address");
    return;
  }

  // Reset all statuses to loading
  const statusElements = document.querySelectorAll('[id$="-status"]');
  statusElements.forEach((element) => {
    updateStatus(element.id, "loading");
  });

  try {
    const network = getCurrentNetwork();
    const contracts = CONTRACTS[network];
    const provider = providers[network];

    // Wrap each check in its own try-catch to preserve state
    try {
      console.log("Checking Symbiotic Registration...");
      // 1. Check Symbiotic Registration
      const symbioticRegistry = new ethers.Contract(contracts.SYMBIOTIC_OPERATOR_REGISTRY, ABIS.isEntity, provider.l1);
      const isRegistered = await symbioticRegistry.isEntity(address);
      console.log("Symbiotic Registration result:", isRegistered);
      updateStatus("symbiotic-registration-status", isRegistered);
    } catch (error) {
      console.error("Error checking Symbiotic Registration:", error);
      updateStatus("symbiotic-registration-status", false);
    }

    try {
      console.log("Checking Symbiotic Opt-in...");
      // 2. Check Symbiotic Opt-in
      const networkRegistry = new ethers.Contract(contracts.SYMBIOTIC_NETWORK_OPT_IN_SERVICE, ABIS.isOptedIn, provider.l1);
      const isOptedIn = await networkRegistry.isOptedIn(address, contracts.CAPX_NETWORK_PROXY);
      console.log("Symbiotic Opt-in result:", isOptedIn);
      updateStatus("symbiotic-optin-status", isOptedIn);
    } catch (error) {
      console.error("Error checking Symbiotic Opt-in:", error);
      updateStatus("symbiotic-optin-status", false);
    }

    try {
      console.log("Checking Network Registration...");
      // 3. Check Network Registration
      const capxNetwork = new ethers.Contract(contracts.CAPX_NETWORK_PROXY, ABIS.isOperatorRegistered, provider.l1);
      const isNetworkRegistered = await capxNetwork.isOperatorRegistered(address);
      console.log("Network Registration result:", isNetworkRegistered);
      updateStatus("network-registration-status", isNetworkRegistered);
    } catch (error) {
      console.error("Error checking Network Registration:", error);
      updateStatus("network-registration-status", false);
    }

    try {
      console.log("Checking Stake Delegation...");
      // 4. Check Stake Delegation
      const capxNetworkWithVotingPower = new ethers.Contract(contracts.CAPX_NETWORK_PROXY, [...ABIS.isOperatorRegistered, ...ABIS.votingPower], provider.l1);
      const hasStake = await capxNetworkWithVotingPower.votingPower(address);
      console.log("Stake Delegation result:", hasStake.toString());
      updateStatus("stake-delegation-status", hasStake.gt(0));

      let l2VotingPower;
      try {
        console.log("Checking Active Status...");
        // 5. Check Active Status on L2
        const l2Attestation = new ethers.Contract(contracts.L2_ATTESTATION_CENTER, ABIS.operatorsIdsByAddress, provider.l2);
        const operatorId = await l2Attestation.operatorsIdsByAddress(address);
        console.log("Operator ID:", operatorId.toString());

        const l2Obls = new ethers.Contract(contracts.L2_OBLS, [...ABIS.isActive, ...ABIS.l2VotingPower], provider.l2);
        const isActive = await l2Obls.isActive(operatorId);
        console.log("Active Status result:", isActive);
        updateStatus("active-status", isActive);

        // Check L2 OBLS voting power
        l2VotingPower = await l2Obls.votingPower(operatorId);
        console.log("L2 Voting Power result:", l2VotingPower.toString());
        updateStatus("l2-voting-power-status", l2VotingPower.gt(0));
      } catch (error) {
        console.error("Error checking L2 status:", error);
        updateStatus("active-status", false);
        updateStatus("l2-voting-power-status", false);
        l2VotingPower = ethers.BigNumber.from("0");
      }

      // Show warning if L1 and L2 voting power don't match
      const l2VotingPowerWarning = document.getElementById("l2VotingPowerWarning");
      if (hasStake.gt(0) && l2VotingPower.eq(0)) {
        l2VotingPowerWarning.classList.remove("hidden");
      } else {
        l2VotingPowerWarning.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error checking Stake Delegation:", error);
      updateStatus("stake-delegation-status", false);
    }

    // After all checks are complete, check if all passed
    if (checkAllPassed()) {
      triggerSuccess();
    }
  } catch (error) {
    console.error("Unexpected error in checkOperator:", error);
  }
}

// Add event listener when the page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded, setting up event listeners...");
  const checkButton = document.getElementById("checkButton");
  if (checkButton) {
    checkButton.addEventListener("click", checkOperator);
    console.log("Event listener added to check button");
  } else {
    console.error("Check button not found!");
  }
});
