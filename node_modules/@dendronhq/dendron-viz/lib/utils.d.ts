export declare const truncateString: (string?: string, length?: number) => string;
export declare const keepBetween: (min: number, max: number, value: number) => number;
export declare const getPositionFromAngleAndDistance: (angle: number, distance: number) => [number, number];
export declare const getAngleFromPosition: (x: number, y: number) => number;
export declare const keepCircleInsideCircle: (parentR: number, parentPosition: [number, number], childR: number, childPosition: [number, number], isParent?: boolean) => [number, number];
