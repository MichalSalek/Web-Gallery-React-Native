// Genarates a Random Hex color
export const randomColor = () => {
    const letters = "0123456789ABCDEF";

    // html color code starts with #
    let color = '#';

    // generating 6 times as HTML color code consist
    // of 6 letter or digits
    for (let i = 0; i < 6; i++)
        color += letters[(Math.floor(Math.random() * 16))];

    return color;
};


