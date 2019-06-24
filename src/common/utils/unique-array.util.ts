const uniqueArray = (array: any[]) => {
  return array.filter((item, index) => {
    return array.indexOf(item) >= index;
  });
};

export { uniqueArray };
