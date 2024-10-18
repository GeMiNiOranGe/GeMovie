import { calculateImageDimensions } from '@shared/utils';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const imageDimensions = calculateImageDimensions(100, 2, 3);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerMovie: {
        flex: 1,
    },
    outlineMovie: {
        width: width * 0.9,
        height: 160,
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        overflow: 'hidden',
    },
    movieCard: {
        ...imageDimensions,
        marginLeft: 5,
        marginTop: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    containerText: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        padding: 15,
        flexShrink: 1,
    },
    dateText: {
        fontSize: 13,
        padding: 15,
    },
    voteText: {
        fontSize: 13,
        padding: 10,
    },
});
export default styles;
