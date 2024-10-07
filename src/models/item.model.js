const items = {};

export const createItem = (uuid) => {
  items[uuid] = [];
  console.log(`createItem`);
};

export const getItem = (uuid) => {
  console.log(`getItem`);
  return items[uuid];
};

export const setItem = (uuid, id, timestamp, itemScore) => {
  console.log(`setItem`);
  return items[uuid].push({ id, timestamp, itemScore });
};

export const clearItem = (uuid) => {
  console.log(`clearItem`);
  items[uuid] = [];
};
