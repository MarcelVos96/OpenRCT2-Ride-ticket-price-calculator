import { viewModel } from "./viewModel";

/**
 * Get EIN rating for a ride in the park
 * @param inParkRideId id of ride *within park*
 * @returns
 */

export function getEin(inParkRideId: number): [number, number, number] | undefined {
    let ride = map.getRide(inParkRideId);
    let rideAgeS : string = ride.age == 1 ? "" : "s"
    if (ride != null) {
        viewModel.rideAge.set(String(ride.age) + " month" + rideAgeS)
        return [Math.max(ride.excitement, 0), Math.max(ride.intensity, 0), Math.max(ride.nausea, 0)];
    }
    return undefined;
}
