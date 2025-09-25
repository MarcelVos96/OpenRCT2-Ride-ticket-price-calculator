/**
 * Stores list of rides in park, bound with their in-park ids,
 * can return alphabetical list of rides in park,
 * can return within-park ID of ride based on its name
 */

export enum ridesInParkCol {
    inParkId,
    rideName,
    rideType
}

/**
 * contains in park ID paired with name of the ride (eg. "Merry-go-around 1" or "Woodchiper")
 */
export var ridesInPark = Array<[number, string, number]>(0)

/**
 * Useful for ui - creates sorted list of ride names and stores their bindings to park ids in this module
 * @returns array of ride names within a park, e.g. [""]
 */
export function getRideListNames(): string[] {
    ridesInPark = []
    map.rides.forEach(ride => {
        if (ride.classification == "ride") {
            ridesInPark.push([ride.id, ride.name, ride.type])
        }
    })
    let nameList: string[] = []
    ridesInPark.forEach(ride => {
        nameList.push(ride[ridesInParkCol.rideName].slice())
    })
    return nameList.sort()
}

/**
 * Returns park ride id by name of the ride
 * @param name name of the ride (eg. "Merry-go-around 1" or "Woodchiper")
 * @returns id of ride *within a park*
 */
export function getParkRideID(name: string): number | undefined {
    for (let i=0;  i<ridesInPark.length; i++) {
        console.log(ridesInPark[i][ridesInParkCol.rideName])
        if (ridesInPark[i][ridesInParkCol.rideName] == name) {
            return ridesInPark[i][ridesInParkCol.inParkId]
        }
    }
    return undefined
}

