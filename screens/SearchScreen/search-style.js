import {StyleSheet} from "react-native";
import colors from "../../common/Colors";
import dimensions from "../../common/Layout";

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
        marginTop: 5,
        alignItems: 'center',
    },
    thumb: {
        width: dimensions.window.width / 3 - 10,
        height: dimensions.window.height / 5 + 2,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    searchContainer: {
        flexDirection: "row",
        width: dimensions.window.width,
        height: 35,
        position: 'absolute',
        bottom: 11,
        paddingHorizontal: dimensions.window.width / 5,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.gray,
        borderStyle: "solid",
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 20,
        fontWeight: '600',
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: 11,
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
        marginTop: 20,
        borderRadius: 1,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    buttonMoreText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 16,
        padding: 3,

    },
    fullImageContainer: {
        width: dimensions.window.width,
        height: dimensions.window.height,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,

    },
    fullImageBox: {
        flex: 1,
        backgroundColor: colors.black
    },
    fullImage: {
        width: dimensions.window.width,
        height: "100%",
    },
    fullImageBottomSection: {
        height: 210,
        backgroundColor: colors.black,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },

    fullImageTitle: {
        fontSize: 14,
        color: colors.white,
        marginTop: 4
    },
    fullImageButtons: {
        marginBottom: 80,
        flexDirection: 'row'
    }
});
