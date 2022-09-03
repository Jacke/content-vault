interface CircleTextProps {
    r: number;
    rotate?: number;
    text: string;
    style?: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
}
export declare const CircleText: ({ r, rotate, text, ...props }: CircleTextProps) => JSX.Element;
export {};
