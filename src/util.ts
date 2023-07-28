export function createUidOf<T extends Uid>(data: Array<T>) {
    let i = Date.now().toString()

    while(data.find(x => x.uid === i)) {
        i = Date.now().toString()
    }

    return i
}