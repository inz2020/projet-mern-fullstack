export const dataParser = (time) => {

    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    }

    let timestamp = Date.parse(time);

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

    return date.toString();

}


//fonction qui va interrogé ce qui lui est passé en paramètre, si ce paramètre est vide ou pas

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    )
}

//Interpreter le champ timestamp(timesatamp est le nbre de milliseconde ecoulé depuis 1970) de notre DB
export const timestampParser = (nber) => {

    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    }

    let date = new Date(nber).toLocaleDateString("fr-FR", options);

    return date.toString();


}