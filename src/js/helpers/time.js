/**
 * Converts milliseconds into mm:ss format
 *
 * @param {int} millis - The amount in milliseconds
 *
 * @ref - https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
 */
export const millisecondsToTime = (milli) => {
  const seconds = Math.floor((milli / 1000) % 60);
  const minutes = Math.floor((milli / (60 * 1000)) % 60);

  return minutes + ":" + seconds;
};
