export const saveLocalStorage = (
  name: string,
  item: { [key: string]: any },
  MAX_ITEMS: number
) => {
  const storageItem = localStorage.getItem(name);
  let latestItems: { [key: string]: any }[];

  if (storageItem) {
    // If there's already an item in localStorage under 'name', parse it
    const parseArray = JSON.parse(storageItem) as { [key: string]: any }[];

    //  Check if the item with the same id already exist in the array
    const existingItemIndex = parseArray.findIndex(
      (storageItem) => storageItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      // If item exists, update it
      parseArray[existingItemIndex] = item;
    } else {
      // If item does not exist, push it
      parseArray.push(item);
    }

    // Get the last MAX_ITEMS items from the combined array
    latestItems = parseArray.slice(-MAX_ITEMS);

    // Save the latest items back into localStorage
    localStorage.setItem(name, JSON.stringify(latestItems));
  } else {
    // If there's no existing item in localStorage under 'name', use the new item
    latestItems = [item];
    localStorage.setItem(name, JSON.stringify(latestItems));
  }

  // Return the latest items that were saved
  return latestItems;
};

export const obtainLocalStorage = (name: string) => {
  return localStorage.getItem(name);
};

export const deleteLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};
