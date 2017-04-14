export default () => {
  if (__CLIENT__) {
    return window.matchMedia('(max-width: 1100px)').matches;
  }
  return false;
};
