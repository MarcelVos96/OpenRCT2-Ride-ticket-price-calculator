export enum rideTableCol  {
/** Human readable name */
RideName,
Excitement,
Intensity,
Nausea,
/** Reserved for storing in-game ride type ids */
RideType
}

/**
 * Stores ride stat values
 * Tastes best when used with rideTableCol enum for naming columns,
 * e.g.: "rideDataArray[rideTableCol.Excitement]"
 */
export const rideDataArray: Array<[string, number, number, number, number]> = [
    ["3D Cinema", 20 ,10 ,0, -1],
    ["Air Powered Vertical Coaster", 44 ,66 ,10, -1],
    ["Alpine Coaster", 50 ,30 ,10, -1],
    ["Boat Hire", 70 ,6 ,0, -1],
    ["Bobsleigh Coaster", 50 ,30 ,10, -1],
    ["Car ride", 70 ,10 ,10, -1],
    ["Chairlift", 70 ,10 ,0, -1],
    ["Circus", 20 ,10 ,0, -1],
    ["Compact Inverted Coaster", 50 ,30 ,10, -1],
    ["Corkscrew Coaster", 50 ,30 ,10, -1],
    ["Crooked House", 15 ,8 ,0, -1],
    ["Dinghy Slide", 50 ,30 ,10, -1],
    ["Dodgems", 40 ,20 ,0, -1],
    ["Enterprise", 50 ,10 ,0, -1],
    ["Ferris Wheel", 60 ,20 ,10, -1],
    ["Flying Coaster", 50 ,30 ,10, -1],
    ["Flying Saucers", 50 ,25 ,0, -1],
    ["Ghost Train", 70 ,10 ,0, -1],
    ["Giga Coaster", 51 ,32 ,10, -1],
    ["Go Karts", 120 ,20 ,0, -1],
    ["Haunted House", 20 ,10 ,0, -1],
    ["Heartline Twister Coaster", 50 ,30 ,10, -1],
    ["Hybrid Coaster", 52 ,36 ,10, -1],
    ["Inverted Coaster", 50 ,30 ,10, -1],
    ["Inverted Hairpin Coaster", 50 ,30 ,30, -1],
    ["Inverted Impulse Coaster", 50 ,30 ,10, -1],
    ["Inverted Shuttle Coaster", 50 ,30 ,10, -1],
    ["Inverted Vertical Shuttle", 50 ,30 ,10, -1],
    ["Junior Coaster", 50 ,30 ,10, -1],
    ["Launched Freefall", 50 ,50 ,10, -1],
    ["Lay-Down Coaster", 50 ,30 ,10, -1],
    ["Lift", 80 ,10 ,0, -1],
    ["LIM Launched Coaster", 50 ,30 ,10, -1],
    ["Log Flume", 80 ,34 ,6, -1],
    ["Looping Coaster", 50 ,30 ,10, -1],
    ["Magic Carpet", 50 ,30 ,10, -1],
    ["Maze", 50 ,0 ,0, -1],
    ["Merry Go Round", 50 ,10 ,0, -1],
    ["Mine Ride", 60 ,20 ,10, -1],
    ["Mine Train Coaster", 50 ,30 ,10, -1],
    ["Mini Coaster", 50 ,30 ,10, -1],
    ["Mini Golf", 50 ,30 ,10, -1],
    ["Mini Helicopters", 70 ,10 ,10, -1],
    ["Mini Suspended Coaster", 50 ,30 ,10, -1],
    ["Miniature Railway", 70 ,6 ,-10, -1],
    ["Monorail", 70 ,6 ,-10, -1],
    ["Monorail Cycles", 50 ,10 ,10, -1],
    ["Monster Trucks", 70 ,10 ,10, -1],
    ["Motion Simulator", 24 ,20 ,10, -1],
    ["Multi-Dimension Coaster", 50 ,30 ,10, -1],
    ["Observation Tower", 80 ,10 ,0, -1],
    ["Reverse Coaster", 48 ,28 ,7, -1],
    ["Reverse Freefall Coaster", 44 ,66 ,10, -1],
    ["River Rafts", 80 ,34 ,6, -1],
    ["River Rapids", 72 ,26 ,6, -1],
    ["Roto Drop", 50 ,50 ,10, -1],
    ["Side Friction Coaster", 48 ,28 ,7, -1],
    ["Single Rail Coaster", 52 ,36 ,10, -1],
    ["Space Rings", 12 ,4 ,4, -1],
    ["Spiral Coaster", 50 ,30 ,10, -1],
    ["Spiral Slide", 50 ,10 ,0, -1],
    ["Splash Boats", 80 ,34 ,6, -1],
    ["Stand-up Coaster", 50 ,30 ,10, -1],
    ["Steel Wild Mouse", 50 ,30 ,30, -1],
    ["Steeplechase", 50 ,30 ,10, -1],
    ["Submarine Ride", 70 ,6 ,0, -1],
    ["Suspended Monorail", 70 ,6 ,-10, -1],
    ["Suspended Swinging Coaster", 50 ,30 ,10, -1],
    ["Swinging Inverter Ship", 50 ,30 ,10, -1],
    ["Swinging Ship", 50 ,30 ,10, -1],
    ["Top Spin", 24 ,20 ,10, -1],
    ["Twist", 40 ,20 ,10, -1],
    ["Twister Coaster", 52 ,36 ,10, -1],
    ["Vertical Drop Coaster", 52 ,38 ,10, -1],
    ["Virginia Reel", 30 ,15 ,25, -1],
    ["Water Coaster", 50 ,30 ,10, -1],
    ["Wooden Coaster", 52 ,33 ,8, -1],
    ["Wooden Wild Mouse", 50 ,30 ,30, -1],
]

export enum ageTableCol  {
/** Human readable name */
Age,
Multiplier,
Divisor,
Addition
}

/**
 * Stores ride age values
 */
export const rideAgeArray: Array<[number, number, number, number]> = [
    [0, 1 ,1 ,30],
    [5, 1 ,1 ,10],
    [13, 1 ,1 ,0],
    [40, 3 ,4 ,0],
    [64, 9 ,16 ,0],
    [88, 27 ,64 ,0],
    [104, 81 ,256 ,0],
    [120, 81 ,512 ,0],
    [128, 81 ,1024 ,0],
    [200, 9 ,16 ,0],
]