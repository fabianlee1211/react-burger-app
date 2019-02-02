// Equivalent to Object.assign({}, obj, properties)
export const updatedObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};