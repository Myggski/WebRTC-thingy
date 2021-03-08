import { BadRequestError } from '../apiError';

export const Required = (propertyName: string): any => {
  return (target: any, propertyKey: string): any => {
    let _val = target[propertyKey];

    const descriptor = {
      get() {
        return _val;
      },
      set(newPropertyValue: any) {
        if (!newPropertyValue) {
          throw new BadRequestError(`The property ${propertyName || propertyKey} is required`);
        } else {
          _val = newPropertyValue;
        }
      },
      enumerable: true,
      configurable: true
    };

    Object.defineProperty(target, propertyKey, descriptor);
  };
};