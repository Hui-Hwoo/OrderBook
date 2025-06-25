export function areFloatsEqual(
    a: number,
    b: number,
    epsilon: number = 0.000001
): boolean {
    return Math.abs(a - b) < epsilon;
}
