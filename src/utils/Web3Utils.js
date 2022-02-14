export const getChainName = (id) => {
    switch (id) {
        case 1:
          return "Ethereum";
        case 3:
          return "Ropsten";
        case 4:
          return "Rinkeby";
        case 5:
          return "Goerli";
        case 42:
          return "Kovan";
        default:
          return "Network";
    }
}

export const normalizeId = (id) => {
  if (isHex(id)) {
    return parseInt(id, 16);
  }
  return id;
}

function isHex(number) {
  const regex = /^0x[0-9a-f]+$/i;
  return Boolean(regex.test(number));
}