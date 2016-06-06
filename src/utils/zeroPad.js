export default (num, places) => {
  const zero = places - num.toString().length + 1;

  return Array(+(zero > 0 && zero)).join('0') + num;
};
