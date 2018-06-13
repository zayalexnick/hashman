export default (number) => {
    const types = { 1: 'success', 2: 'warning', 3: 'error' };
    return types[number];
}