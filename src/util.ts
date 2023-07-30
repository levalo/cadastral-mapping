export const getRandom = (max: number) => Math.floor(Math.random() * max)

export function createIdOf<T extends { id?: string | number }>(data: Array<T>) {
    const find = (id: string) => data.find(x => x.id === id)

    let id: string, found

    do {
        id = getRandom(999999).toString()
        found = find(id)
    } while (found)

    return id
}