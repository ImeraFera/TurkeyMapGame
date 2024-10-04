

export const randomCity = (list) => {
    if (list.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}
