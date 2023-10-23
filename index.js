const bip39 = require('bip39');
const fs = require('fs');
// const { utils } = require('ethers');
const {
  isValidMnemonic,
} = require("@ethersproject/hdnode");
const filePath = 'phrase.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const initialWords  = data.trim().split(' ');
  if (initialWords .length === 12) {
    function generatePermutations(arr, n) {
      if (n === 1) {
        if (bip39.validateMnemonic(arr.join(' '))) {
          console.log(arr.join(' '));
        }
        // if (isValidMnemonic(arr.join(' '))) {
        //   console.log(arr.join(' '));
        // }
      } else {
        for (let i = 0; i < n - 1; i++) {
          generatePermutations(arr, n - 1);
          if (n % 2 === 0) {
            // Swap the i-th and last elements
            [arr[i], arr[n - 1]] = [arr[n - 1], arr[i]];
          } else {
            // Swap the first and last elements
            [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];
          }
        }
        generatePermutations(arr, n - 1);
      }
    }
    
    generatePermutations(initialWords, initialWords.length);
  } else {
    console.log('Invalid recovery phrase. It should contain 12 words.');
  }
});


