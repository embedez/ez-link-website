import bcrypt from "bcrypt";


/**
 * Creates a hash of the provided data using bcrypt.
 *
 * @param {string} data - The data to hash.
 * @returns {Promise<string>} - A promise that resolves to the hash.
 * @throws {Error} - If an error occurred during the hashing process.
 */
export const createHash = async (data: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10); // replace 10 with your desired number of salt rounds
    const hash = await bcrypt.hash(data, salt)

    return hash;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


/**
 * Validates whether the given data matches the provided hash.
 *
 * @param {string} data - The data to be validated.
 * @param {string} hash - The hash to be compared against.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the data matches the hash.
 */
export const validateHash = async (data: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(data, hash);
}