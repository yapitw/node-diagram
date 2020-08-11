declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module '*.styl' {
    const classes: { [key: string]: string };
    export default classes;
}