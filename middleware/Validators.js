const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports.registerInputValidation = (data) => {
  let errors = {
    status: "success",
    message: {
      username: "",
      email: "",
      password: "",
      phone_number: "",
    },
  };

  //  avoid error pop-up
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";

  // Username validator
  if (Validator.isEmpty(data.username)) {
    errors.status = "error";
    errors.message = {
      ...errors.message,
      username: "Username is required.",
    };
    // isAlphanumeric = we dont want "@", "#", etc. Only want text & number.
  } else if (!Validator.isAlphanumeric(data.username)) {
    errors.status = "error";
    errors.message = {
      ...errors.message,
      username: "Username is invalid.",
    };
  } else if (!Validator.isLowercase(data.username)) {
    errors.status = "error";
    errors.message = {
      ...errors.message,
      username: "Username must be lowercase only.",
    };
  }

  // Email validator
  if (Validator.isEmpty(data.email)) {
    errors.status = "error";
    errors.message = {
      ...errors.message,
      email: "Email is required.",
    };
  } else if (!Validator.isEmail(data.email)) {
    errors.status = "error";
    errors.message = {
      ...errors.message,
      email: "Email is invalid.",
    };
  }

  // Password validator
  if (Validator.isEmpty(data.password)) {
    errors.status = "error";
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
    (errors.status = "error"),
      (errors.message = {
        ...errors.message,
        password:
          "Password must be at least 8 characters either under 30 characters.",
      });
  }

  // PhoneNumber validator
  if (Validator.isEmpty(data.phone_number)) {
    errors.status = "error";
    errors.message = {
      ...errors.message,
      phone_number: "PhoneNumber is required.",
    };
  } else if (!Validator.isMobilePhone(data.phone_number)) {
    errors.status = "error";
    errors.message = {
      ...errors.message,
      phone_number: "PhoneNumber is invalid.",
    };
  }

  return {
    errors,
    isValid: errors.status === "success",
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
  //   }
  // }
  // ###################################################
};
