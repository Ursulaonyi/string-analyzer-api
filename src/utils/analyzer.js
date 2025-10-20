const crypto = require('crypto');

function analyzeString(value) {
  // Length
  const length = value.length;

  // Palindrome (case-insensitive, no spaces)
  const cleanString = value.toLowerCase().replace(/\s/g, '');
  const is_palindrome = cleanString === cleanString.split('').reverse().join('');

  // Unique characters
  const unique_characters = new Set(value.toLowerCase()).size;

  // Word count
  const word_count = value.trim().split(/\s+/).filter(w => w.length > 0).length;

  // SHA256 hash
  const sha256_hash = crypto.createHash('sha256').update(value).digest('hex');

  // Character frequency map
  const character_frequency_map = {};
  for (const char of value.toLowerCase()) {
    if (char !== ' ') {
      character_frequency_map[char] = (character_frequency_map[char] || 0) + 1;
    }
  }

  return {
    length,
    is_palindrome,
    unique_characters,
    word_count,
    sha256_hash,
    character_frequency_map
  };
}

module.exports = { analyzeString };