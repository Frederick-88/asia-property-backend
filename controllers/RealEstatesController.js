const RealEstatesModel = require("../models/RealEstatesModel");

module.exports = {
  createRealEstate: (req, res, next) => {
    const obj = {
      name: req.body.name,
      agent: req.body.agent,
      type: req.body.type,
      price: req.body.price,
      is_featured: req.body.is_featured,
      is_renting: req.body.is_renting,
      bedroom_count: req.body.bedroom_count,
      bathroom_count: req.body.bathroom_count,
      building_size: req.body.building_size,
      description: req.body.description,
      status: req.body.status,
      address: req.body.address,
      country: req.body.country,
      city: req.body.city,
    };

    if (req.files.length) {
      const array = [];
      req.files.forEach((file) => {
        const url = "https://asia-property.herokuapp.com/";
        array.push(url + file.filename);
      });
      obj.images = array;

      RealEstatesModel.create(obj)
        .then((results) => {
          RealEstatesModel.findById(results._id)
            .populate({
              path: "agent",
              select: [
                "name",
                "email",
                "image",
                "phone_number",
                "country",
                "city",
              ],
            })
            .then((response) => {
              res.status(200).json({
                status: "success",
                message: "Successfully created a new real estate.",
                results: response,
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    } else {
      res.status(422).json({
        status: "error",
        message: "Image is required.",
      });
    }
  },

  updateRealEstateById: (req, res, next) => {
    const realEstateId = req.query.id;

    RealEstatesModel.findById(realEstateId)
      .then((selectedRealEstate) => {
        const editObj = {
          name: req.body.name || selectedRealEstate.name,
          agent: req.body.agent || selectedRealEstate.agent,
          type: req.body.type || selectedRealEstate.type,
          price: req.body.price || selectedRealEstate.price,
          is_featured: req.body.is_featured || selectedRealEstate.is_featured,
          is_renting: req.body.is_renting || selectedRealEstate.is_renting,
          bedroom_count:
            req.body.bedroom_count || selectedRealEstate.bedroom_count,
          bathroom_count:
            req.body.bathroom_count || selectedRealEstate.bathroom_count,
          description: req.body.description || selectedRealEstate.description,
          status: req.body.status || selectedRealEstate.status,
          address: req.body.address || selectedRealEstate.address,
          country: req.body.country || selectedRealEstate.country,
          city: req.body.city || selectedRealEstate.city,
        };

        if (req.files.length) {
          const url = "https://asia-property.herokuapp.com/";
          const array = [];
          req.files.forEach((file) => {
            array.push(url + file.filename);
          });

          editObj.images = array;
        } else {
          editObj.images = selectedRealEstate.images;
        }

        RealEstatesModel.findByIdAndUpdate(
          realEstateId,
          editObj,
          { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
        )
          .populate({
            path: "agent",
            select: [
              "name",
              "email",
              "image",
              "phone_number",
              "country",
              "city",
            ],
          })
          .then((response) => {
            res.status(200).json({
              status: "success",
              message: `Successfully updated the real estate of ${selectedRealEstate.name}.`,
              results: response,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getAllRealEstates: (req, res, next) => {
    RealEstatesModel.find()
      .populate({
        path: "agent",
        select: ["name", "email", "image", "phone_number", "country", "city"],
      })
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Successfully get all real estates.",
          results: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getRealEstateById: (req, res, next) => {
    RealEstatesModel.findById(req.params.realEstateId)
      .populate({
        path: "agent",
        select: ["name", "email", "image", "phone_number", "country", "city"],
      })
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: `Successfully get the real estate of ${response.name}.`,
          results: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  searchRealEstate: (req, res) => {
    // search function reference -> https://stackoverflow.com/questions/10610131/checking-if-a-field-contains-a-string
    const urlNameQuery = req.query.search_query;
    const urlTypeQuery = req.query.type;
    const realEstateNameQuery = new RegExp(urlNameQuery, "i"); //regex for search by query

    const searchQuery = {};
    if (urlNameQuery) {
      searchQuery.name = realEstateNameQuery;
    }
    if (urlTypeQuery && urlTypeQuery === "for-rent") {
      searchQuery.is_renting = true;
    } else if (urlTypeQuery && urlTypeQuery === "for-sale") {
      searchQuery.is_renting = false;
    }

    RealEstatesModel.find(searchQuery)
      .populate({
        path: "agent",
        select: ["name", "email", "image", "phone_number", "country", "city"],
      })
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: `Successfully get real estates based on search query.`,
          results: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  deleteRealEstateById: (req, res, next) => {
    const realEstateId = req.query.id;

    RealEstatesModel.findById(realEstateId)
      .then((selectedRealEstate) => {
        RealEstatesModel.findByIdAndRemove(realEstateId)
          .then(() => {
            res.status(200).json({
              status: "success",
              message: `Successfully deleted ${selectedRealEstate.name} real estate.`,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
};
