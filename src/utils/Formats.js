function roundToTwo(num) {    
    return +(Math.round(num + "e+7")  + "e-7");
}

export const weiToNumber = (web3, wei) => {
    return roundToTwo(web3.utils.fromWei(wei, "ether"));
}

export const shortenAddress = (address) => {
    return address.substr(0, 5) + "..." + address.substr(-4)
}