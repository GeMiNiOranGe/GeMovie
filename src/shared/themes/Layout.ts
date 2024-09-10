import { ViewStyle } from 'react-native';

const layout = {
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    spaceBetweenRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    /* Flexbox */
    col: {
        flexDirection: 'column',
    },
    colReverse: {
        flexDirection: 'column-reverse',
    },
    wrap: {
        flexWrap: 'wrap',
    },
    row: {
        flexDirection: 'row',
    },
    rowReverse: {
        flexDirection: 'row-reverse',
    },
    itemsCenter: {
        alignItems: 'center',
    },
    itemsStart: {
        alignItems: 'flex-start',
    },
    itemsStretch: {
        alignItems: 'stretch',
    },
    itemsEnd: {
        alignItems: 'flex-end',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    justifyAround: {
        justifyContent: 'space-around',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    /* Sizes Layouts */
    flex1: {
        flex: 1,
    },
    fullWidth: {
        width: '100%',
    },
    fullHeight: {
        height: '100%',
    },
    /* Positions */
    relative: {
        position: 'relative',
    },
    absolute: {
        position: 'absolute',
    },
    top0: {
        top: 0,
    },
    bottom0: {
        bottom: 0,
    },
    left0: {
        left: 0,
    },
    right0: {
        right: 0,
    },
    z1: {
        zIndex: 1,
    },
} as const satisfies Record<string, ViewStyle>;

export default layout;
