export function createUidOf<T extends Uid>(data: Array<T>) {
    const find = (id: string) => data.find(x => x.uid === id)

    let id: string, found

    do {
        id = Date.now().toString()
        found = find(id)
    } while (found)

    return id
}