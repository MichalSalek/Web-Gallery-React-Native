import {totalWaitingTime} from "../constants/Other";

export const APIShotsSaver = async (secondsSetter, secondsRemaining, canGenerateSetter) => {
    secondsSetter(secondsRemaining);

    let intervalCounterHelper = secondsRemaining;
    const secondsInterval = await setInterval(() => {
        intervalCounterHelper -= 1;
        secondsSetter(intervalCounterHelper);
    }, 1000);

    setTimeout(async () => {
        canGenerateSetter(true);
        clearInterval(secondsInterval);
        secondsSetter(totalWaitingTime);
    }, secondsRemaining * 1000);
};