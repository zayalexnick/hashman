import colors from './colors';
import variables from './variables';
import table from './table';
import stat from './stat';

// TODO Сделать theme

export default {
    colors,
    variables,
    notifications: {
		default: '#595959',
		primary: '#89a8ff',
		success: '#9dd089',
		warning: '#ffda7a',
		error: '#ff6c41',
		hidden: '#a8a8a8'
    },
    table,
    stat
};