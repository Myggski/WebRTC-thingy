/**
 * This is where some magic happends.
 * It is a base-class for a singleton pattern with generic type and static properties.
 * Because of the static properties the abstract class must be wrapped around a function.
 * @returns A function for a singleton class to extend
 */
const SingletonFunc = <T>(): any => {
  interface Singleton { }

  abstract class Singleton implements Singleton {
    private static _instance: T;

    public static get instance(): T {
      if (!Singleton._instance) {
        Singleton._instance = new (this as any)() as T;
      }


      return Singleton._instance;
    }
  }

  return Singleton;
};

export default SingletonFunc;