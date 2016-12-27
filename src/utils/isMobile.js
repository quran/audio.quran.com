export default () => {
  if (__CLIENT__) {
    return window.matchMedia('(max-width: 768px)').matches;
  }
  return false;
};

