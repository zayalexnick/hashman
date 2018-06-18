export default (memory) => {
    const power = ['B', 'KB', 'MB', 'GB'];

    let i = 0;

    if (memory < 8) return `${ memory } ${power[0]}`;

    memory /= 8;
    i++;

    while (memory >= 1024)
    {
        memory /= 1000;
        i++;
    }

    return (memory === 0) ? 0 : `${parseFloat(memory).toFixed(2)} ${power[i]}`;
}