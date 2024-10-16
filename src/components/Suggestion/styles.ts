import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    itemContainer: {
        marginRight: 15,
        width: 120,
        alignItems: 'center',
    },
    itemImage: {
        width: width * 0.3,
        height: height / 4,
        borderRadius: 8,
    },
    placeholderImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#fff',
        fontSize: 12,
    },
    itemText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    noDataText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginTop: 10,
    },
});
export default styles;
