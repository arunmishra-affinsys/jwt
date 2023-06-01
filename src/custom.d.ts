declare module "*.svg" {
    const content: any;
    export default content;
  }

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  } 

  declare module "*.css" {
    const content: { [key: string]: string };
    export default content;
  }

