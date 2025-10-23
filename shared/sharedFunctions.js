export function isMissingFields(obj, keys) {
  return keys.some(key => {
    const value = obj[key];
    return value === '' || value === 0 || value === null || value === undefined;
  });
}