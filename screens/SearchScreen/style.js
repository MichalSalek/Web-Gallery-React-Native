import {StyleSheet} from "react-native";
import colors from "../../constants/Colors";
import dimensions from "../../constants/Layout";

export const s = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
    },
    image: {
        flex: 10,
        width: "100%",
        height: "100%",
    },
    list: {
        marginTop: 22,

        alignItems: 'center',
    },
    thumb: {
        width: dimensions.window.width / 3 - 10,
        height: dimensions.window.height / 5,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    searchContainer: {
        flexDirection: "row",
        width: dimensions.window.width,
        height: 30,
        position: 'absolute',
        bottom: 13,
        paddingHorizontal: dimensions.window.width / 4,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.gray,
        borderStyle: "solid",
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: '600',
    },
    button: {
        borderWidth: 1,
        borderColor: colors.gray,
        alignSelf: 'flex-end',
        backgroundColor: colors.mainDarker,
        borderRadius: 50,
        position: 'absolute',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 30,
    },
    buttonText: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 18,
    },
    picturesContainer: {
        flex: 1,
        marginBottom: dimensions.window.height / 10,
        alignItems: "center",
    },
    buttonMore: {
        backgroundColor: colors.main,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        width: dimensions.window.width / 3,
        paddingVertical: 5,
        borderRadius: 5
    },
    noMore: {
        backgroundColor: colors.secondaryDarker,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    buttonMoreText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 18,
        padding: 5,

    }
});