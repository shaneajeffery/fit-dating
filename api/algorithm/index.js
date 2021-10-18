/**
 * Create subset based off of this order of elimination:
 *
 * Location
 * Gender
 * Age
 *
 *
 *
 **/

/**
 * Let the user determine the order of importance of the following:
 *
 * Activities
 * Religion
 * Politics
 * Likes Dogs / Cats / Animals
 * Has / Wants Kids
 * Height
 * Job / Employment Status
 *
 */

const axios = require('axios').default;
require('dotenv').config();

const matchingAlgo = async (
  orderOfImportanceArray,
  zipCode,
  distance,
  unitOfDistance
) => {
  const zipCodes = await axios.get(
    `https://www.zipcodeapi.com/rest/${process.env.ZIP_CODE_API_KEY}/radius.json/${zipCode}/${distance}/${unitOfDistance}`
  );

  console.log(zipCodes);
};

module.exports = matchingAlgo;
