// Validation function for email
const isValidEmail = (value) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

// Validation function for URL
const isValidURL = (value) => {
  // Regular expression for URL validation
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(value);
};

// Validation function for postal code (US format)
const isValidPostalCode = (value) => {
  // Regular expression for US postal code validation
  const postalCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
  return postalCodeRegex.test(value);
};

// Validation function for password
const isValidPassword = (value) => {
  // Regular expression for password validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\[\]{}\-<>,.?/~]).{8,}$/;
  return passwordRegex.test(value);
};

export function validationField(value = "", field) {
    const validate = field.validate || {};
    const title = field.title || {};
    let error = ""
    // Apply validation rules
    if (validate) {
      if (validate.required && value.trim() === '') {
        error = `${title} is required.`;
      } else if (validate.minLength && value.length < validate.minLength) {
        error = `${title} must be at least ${validate.minLength} characters long.`;
      } else if (validate.maxLength && value.length > validate.maxLength) {
        error = `${title} must be at most ${validate.maxLength} characters long.`;
      } else if (validate.validInputType) {
        switch (validate.validInputType) {
          case 'email':
            if (!isValidEmail(value)) {
              error = `${title} is not a valid email address.`;
            }
            break;
          case 'url':
            if (!isValidURL(value)) {
              error = `${title} is not a valid URL.`;
            }
            break;
          case 'postal-code':
            if (!isValidPostalCode(value)) {
              error = `${title} is not a valid postal code.`;
            }
            break;
          case 'password':
            if (!isValidPassword(value)) {
              error = `${title} must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`;
            }
            break;
          case 'simple-string':
            if (!/^[a-zA-Z0-9]*$/.test(value)) {
              error = `${title} should contain only letters and numbers.`;
            }
            break;
          case 'alphabet-only':
            if (!/^[a-zA-Z]*$/.test(value)) {
              error = `${title} should contain only alphabet characters.`;
            }
            break;
          case 'alphabet-space':
            if (!/^[a-zA-Z\s]*$/.test(value)) {
              error = `${title} should contain only alphabet characters and spaces.`;
            }
            break;
          case 'alphanumeric-only':
            if (!/^[a-zA-Z0-9]*$/.test(value)) {
              error = `${title} should contain only letters and numbers.`;
            }
            break;
          case 'alphanumeric-space':
            if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
              error = `${title} should contain only letters, numbers, and spaces.`;
            }
            break;
          case 'alphanumeric-hyphen':
            if (!/^[a-zA-Z0-9-]*$/.test(value)) {
              error = `${title} should contain only letters, numbers, and hyphens.`;
            }
            break;
          case 'number-only':
            if (!/^[0-9]*$/.test(value)) {
              error = `${title} should contain only numbers.`;
            }
            break;
          case 'number-hyphen':
            if (!/^[0-9-]*$/.test(value)) {
              error = `${title} should contain only numbers and hyphens.`;
            }
            break;
          default:
            break;
        }
      } else if (validate.pattern && !new RegExp(validate.pattern).test(value)) {
        error = `${title} does not match the required pattern.`;
      }
    }

    return error
}