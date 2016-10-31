export function cleanUpBrackets(string) {
  return string.replace(/(\(|\[|\().*/g, '');
}
