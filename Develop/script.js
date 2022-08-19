// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}
// Function to generate a password to return to writePassword function
function generatePassword() {
  
  // Declaring arrays to be used in this function
  const special = [' ','!','"','#','$','%','&',"'",'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[',']','^','_','`','{','|','}','~'];
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
  const lowers = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const uppers = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const generatedPassword = new Array();
  const optionsIncluded = new Array();

  // This function will call the function who's character will be added based on number passed into it
  function addChar(numToCall) {
    var charToPush;
    if (numToCall === 0) {
      charToPush = addLowers();
    } else if (numToCall === 1) {
      charToPush = addUppers();
    } else if (numToCall === 2) {
      charToPush = addNumber();
    } else {
      charToPush = addSpecial();
    }
    return charToPush;
  }

  // Function will increment the randomly generated number. Used if the option corresponding to that number was not selected by the user
  function increment(numToIncrement) {
    if (numToIncrement >= (optionsIncluded.length-1)) {
      return 0;
    } else {
      return numToIncrement+1;
    }
  }

  // Function to return a character from the special characters array
  function addSpecial() {
    return special[Math.floor(Math.random() * special.length)];
  }

  // Function to return a character from the numbers array
  function addNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
  }

  // Function to return a character from the lowercase letters array
  function addLowers() {
    return lowers[Math.floor(Math.random() * lowers.length)];
  }

  // Function to return a character from the uppercase letters array
  function addUppers() {
    return uppers[Math.floor(Math.random() * uppers.length)];
  }

  // Function we can call to do the checking
  function checkOption(numToCheck) {
    var isIncluded = false;
    var i = 0; 

    if (numToCheck === 0) {
      while (!isIncluded) {
        isIncluded = generatedPassword.includes(lowers[i]);
        i++;
        if (i === lowers.length) {
          return isIncluded;
        }
      }
    } else if (numToCheck === 1) {
      while (!isIncluded) {
        isIncluded = generatedPassword.includes(uppers[i]);
        i++;
        if (i === uppers.length) {
          return isIncluded;
        }
      }
    } else if (numToCheck === 2) {
      while (!isIncluded) {
        isIncluded = generatedPassword.includes(numbers[i]);
        i++;
        if (i === numbers.length) {
          return isIncluded;
        }
      }
    } else {
      while (!isIncluded) {
        isIncluded = generatedPassword.includes(special[i]);
        i++;
        if (i === special.length) {
          return isIncluded;
        }
      }
    }
      return isIncluded;
  }

  // Function to put the random assortment of chars together into an array
  function createPassword() {
    for (var i=0; i < passLength; i++) {
      // Generating a random number based on the number of potential options
      var ranNum = Math.floor(Math.random() * optionsIncluded.length);
      var charToPush;
  
      // Validating that we only include characters the user requested
      while (!optionsIncluded[ranNum]) {
        ranNum = increment(ranNum);
      }
      
      //  Adding our character to our password array
      charToPush = addChar(ranNum);
      generatedPassword.push(charToPush);
    }
  }
  
  // Function to make sure we included all the options selected by the user
  function validatePassword() {
    for (var i=0; i<optionsIncluded.length; i++) {
      if (optionsIncluded[i]) {
        if (!checkOption(i)) {
          generatedPassword.length = 0;
          createPassword();
        }
      }
    }
  }

  // Asking for the length of the password and validating the input
  var passLength = window.prompt("How long does your password need to be? (minimum 8 characters)");
  if (passLength < 8 || passLength > 128) {
    window.alert("You must choose a number between 8 and 128. Please start over.");
    return "start over";
  }

  // Prompting for what types of characters they want included in their password
  optionsIncluded[0] = window.confirm("Would you like to include lowercase letters?");
  optionsIncluded[1] = window.confirm("Would you like to include uppercase letters?");
  optionsIncluded[2] = window.confirm("Would you like to include numbers?");
  optionsIncluded[3] = window.confirm("Would you like to include special characters?");
  
  // Validating that at least 1 option was selected
  if (!optionsIncluded[0] && !optionsIncluded[1] && !optionsIncluded[2] && !optionsIncluded[3]) {
    window.alert("You must include at least one option. Please start over.");
    return "start over";
  }

  createPassword();
  validatePassword();

  // Returning our generated password to the writePassword function
  return generatedPassword.join("");
}

// Add event listener to generate button
generateBtn.addEventListener("click", function () {
  writePassword();
});