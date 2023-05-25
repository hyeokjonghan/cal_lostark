export function sortByNumber(targetArray:Array<any>, indexName:string, sort:string = "desc") {
    const sortedArray = [...targetArray]

    if(sort === "desc") {
        sortedArray.sort((obj1, obj2) => {
            return obj2[indexName] - obj1[indexName]
        })
    } else if(sort === "asc") {
        sortedArray.sort((obj1, obj2) => {
            return obj1[indexName] - obj2[indexName]
        })
    } else {
        throw new Error('Invalid sort option')
    }

    return sortedArray
}

export default {sortByNumber}