import colors from "./Colors";
import {StyleSheet} from "react-native";

export const commonStyles = StyleSheet.create({
    circleButton: {
        borderWidth: 1,
        borderColor: colors.gray,
        alignSelf: 'flex-end',
        backgroundColor: colors.mainDarker,
        borderRadius: 50,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    }
});