const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function registerInputValidation(data) {
  let errors = {
    status: "",
    message: {
      username: "",
      email: "",
      password: "",
      phone_number: "",
      country: "",
      city: "",
    },
  };
  //  avoid error pop-up
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.city = !isEmpty(data.city) ? data.city : "";

  // Username validator
  if (Validator.isEmpty(data.username)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      username: "Username is required.",
    };
    // isAlphanumeric = we dont want "@", "#", etc. Only want text & number.
  } else if (!Validator.isAlphanumeric(data.username)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      username: "Username is invalid.",
    };
  } else if (!Validator.isLowercase(data.username)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      username: "Username must be lowercase only.",
    };
  }

  // Email validator
  if (Validator.isEmpty(data.email)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      email: "Email is required.",
    };
  } else if (!Validator.isEmail(data.email)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      email: "Email is invalid.",
    };
  }

  // Password validator
  if (Validator.isEmpty(data.password)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      password: "Password is required.",
    };
  } else if (
    !Validator.isLength(data.password, {
      min: 8,
      max: 30,
    })
  ) {
    (errors.status = 422),
      (errors.message = {
        ...errors.message,
        password:
          "Password must be at least 8 characters either under 30 characters.",
      });
  }

  // PhoneNumber validator
  if (Validator.isEmpty(data.phone_number)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      phone_number: "PhoneNumber is required.",
    };
  } else if (!Validator.isMobilePhone(data.phone_number)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      phone_number: "PhoneNumber is invalid.",
    };
  }

  // Country validator
  if (Validator.isEmpty(data.country)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      country: "Country is required.",
    };
  }

  // City validator
  if (Validator.isEmpty(data.city)) {
    errors.status = 422;
    errors.message = {
      ...errors.message,
      city: "City is required.",
    };
  }

  console.log(errors);
  return {
    errors,
    // isValid = no errors occur
    isValid: isEmpty(errors.status),
  };

  // ###################################################
  // Register's Expected error output :
  // {
  //   "status": 422,
  //   "message": {
  //     "username": "Username is required.",
  //     "email": "Email is required.",
  //     "password": "Password is required."
  //     "phone_number": "phone_number is required.",
  //     "country": "country is required."
  //     "city": "city is required."
  //   }
  // }
  // ###################################################
};
