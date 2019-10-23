import {StyleSheet} from "react-native";
import colors from "../../common/Colors";
import dimensions from "../../common/Layout";

export const s = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        flex: 10,
        width: "100%",
        height: "100%"
    },
    button: {
        position: 'absolute',
        right: 10,
        bottom: 55,
    },
    buttonText: {
        color: colors.white,
        fontWeight: "800",
        fontSize: 20,
    },
    bottomBar: {
        width: dimensions.window.width,
        height: 13,
    },
    topBar: {
        width: dimensions.window.width,
        height: 4,
    }
});
