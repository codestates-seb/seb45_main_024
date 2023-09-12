// FORMAT :: YYYY.MM.DD
export const getStringDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

// FORMAT :: YYYY-MM-DD
export const sliceISOString = (date: string) => {
  return new Date(date).toISOString().slice(0, 10);
};

// FORMAT :: YYYY-MM-DDTHH:MM:SS
export const requestFormatDate = (date: string) => {
  return new Date(date).toISOString().split(".")[0];
};
