/** @module */

/**
 * Utility function to convert a duration in seconds to a more human
 * readable [HH:]MM:SS
 *
 * @function
 * @param {Number} seconds - the number of seconds in question
 * @return {string} - the string representing the supplied seconds
 */
const secondsToDuration = (seconds) => {
  if (!seconds)
    return "0:00";
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  seconds = Math.floor(seconds % 60);

  const doubleDigits = (val) => `${val > 9 ? '' : '0'}${val}`;

  const minStr = hours ? `${hours}:${doubleDigits(minutes)}` : `${minutes}`;
  return `${minStr}:${doubleDigits(seconds)}`;
};

export default secondsToDuration;
