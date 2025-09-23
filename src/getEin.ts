/**
 * Get EIN rating for a ride in the park
 * @param inParkRideId id of ride *within park*
 * @returns
 */

export function getEin(inParkRideId: number): [number, number, number] | undefined {
    if (inParkRideId < map.numRides) {
        let ride = map.getRide(inParkRideId);
        return [ride.excitement, ride.intensity, ride.nausea];
    }
    else {
        return undefined;
    }
}
