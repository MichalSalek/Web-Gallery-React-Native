import {StyleSheet} from "react-native";
import colors from "../../common/Colors";
import dimensions from "../../common/Layout";

export const s = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 140
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 50
    },
    heading: {
        fontSize: 20,
        color: colors.white,

    },
    bottomBar: {
        width: dimensions.window.width,
        height: 10,
        marginVertical: 10
    },
    topBar: {
        width: dimensions.window.width,
        height: 10,
        marginVertical: 6
    }
});
