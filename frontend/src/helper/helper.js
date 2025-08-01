export const shortenDescription = (text, limit = 75) => {
  if (text.length <= limit) {
    return text;
  }
  return text.slice(0, limit).trim() + " ...";
}
