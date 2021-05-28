export default class Singleton<T>  {

    public static getInstance<T>(this: new () => T): T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
        }
        return (<any>this).instance;
    }

    public static destroy<T>(this: new () => T): void {
        if ((<any>this).instance) {
            (<any>this).instance = null;
        }
    }
}
