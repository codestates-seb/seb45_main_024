/**
 * @params ["12:FireBase", "22:ReactNative"]
 * @returns ["FireBase", "ReactNative"]
 */
export const extractTextAfterColon = (arr: string[] | undefined) => {
  const result = arr?.map(item => {
    const colonIndex = item.indexOf(":");
    if (colonIndex !== -1) {
      return item.slice(colonIndex + 1);
    }
    return item;
  });

  return result;
};

/**
 * @params ["12:FireBase", "22:ReactNative"]
 * @returns [12, 22]
 */
export const extractNumbersBeforeColon = (arr: string[] | undefined) => {
  const result = arr?.map(item => {
    const colonIndex = item.indexOf(":");
    if (colonIndex !== -1) {
      const numberPart = item.slice(0, colonIndex);
      const parsedNumber = parseFloat(numberPart);
      return isNaN(parsedNumber) ? 0 : parsedNumber;
    }
    return null;
  });

  return result;
};
