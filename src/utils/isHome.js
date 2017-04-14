export default function showHome(path) {
  return path !== '/' && path.indexOf('section') !== 1;
}
