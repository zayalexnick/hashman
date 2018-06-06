const power = ['H', 'KH', 'MH', 'GH', 'TH', 'PH'];

export default (hashrate) => {

    let i = 0;

    if (hashrate === 0) return hashrate;

    while (hashrate >= 1000)
    {
        hashrate /= 1000;
        i++;
    }

    hashrate = (hashrate === 0) ? 1 : hashrate;

    return `${hashrate.toFixed(2)} ${power[i]}/s`;
}