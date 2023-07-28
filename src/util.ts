export function createUidOf<T extends Uid>(data: Array<T>) {
    let i = Date.now().toString(),
        found = data.find(x => x.uid === i)

    while(found) {
        i = Date.now().toString()
    }

    return i
}