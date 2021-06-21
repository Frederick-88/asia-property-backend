const FeaturedListsModel = require("../models/FeaturedListsModel");
const RealEstatesModel = require("../models/RealEstatesModel");

module.exports = {
  createFeaturedList: (req, res, next) => {
    FeaturedListsModel.find()
      .then((getResponse) => {
        // find highest number created, and add 1 to prevent duplication.
        let highestNumber = 0;
        getResponse.forEach((featured) => {
          const getNumber = parseInt(
            featured.featured_title.replace(/[^0-9]/g, "")
          );
          highestNumber = Math.max(getNumber, highestNumber);
        });
        const number = highestNumber + 1;

        const obj = {
          featured_title: `Featured-RealEstate-${number}`,
          featured_cost: req.body.featured_cost || "100.000",
          userId: req.body.userId,
          realEstateId: req.body.realEstateId,
        };

        FeaturedListsModel.create(obj)
          .then((results) => {
            FeaturedListsModel.findById(results._id)
              .populate({
                path: "userId",
                select: { password: 0, created_at: 0, updated_at: 0 },
              })
              .then((response) => {
                // update the selected real estate
                const editRealEstateObj = {
                  is_featured: true,
                };
                RealEstatesModel.findByIdAndUpdate(
                  obj.realEstateId,
                  editRealEstateObj,
                  { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
                )
                  .then((response2) => {
                    RealEstatesModel.findById(response2._id)
                      .select("-created_at -updated_at") // remove 'created_at' & 'updated_at' after find
                      .populate({
                        path: "agent",
                        model: "Agents",
                        select: { created_at: 0, updated_at: 0 },
                      })
                      .then((realEstateResponse) => {
                        const newResponse = {
                          _id: response._id,
                          featured_title: response.featured_title,
                          featured_cost: response.featured_cost,
                          user: response.userId,
                          realEstate: realEstateResponse,
                        };
                        res.status(200).json({
                          status: "success",
                          message: "Successfully created a new featured list.",
                          results: newResponse,
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(500).json(error);
                  });
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

  updateFeaturedListById: (req, res, next) => {
    const featuredListId = req.query.id;

    FeaturedListsModel.findById(featuredListId)
      .then((selectedFeaturedList) => {
        const editObj = {
          featured_title: selectedFeaturedList.featured_title,
          featured_cost:
            req.body.featured_cost || selectedFeaturedList.featured_cost,
          userId: req.body.userId || selectedFeaturedList.userId,
          realEstateId:
            req.body.realEstateId || selectedFeaturedList.realEstateId,
        };

        FeaturedListsModel.findByIdAndUpdate(
          featuredListId,
          editObj,
          { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
        )
          .then((results) => {
            FeaturedListsModel.findById(results._id)
              .populate({
                path: "userId",
                select: { password: 0, created_at: 0, updated_at: 0 },
              })
              .then((response) => {
                // update the selected real estate
                const editRealEstateObj = {
                  is_featured: true,
                };
                RealEstatesModel.findByIdAndUpdate(
                  editObj.realEstateId,
                  editRealEstateObj,
                  { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
                )
                  .then((response2) => {
                    RealEstatesModel.findById(response2._id)
                      .select("-created_at -updated_at") // remove 'created_at' & 'updated_at' after find
                      .populate({
                        path: "agent",
                        model: "Agents",
                        select: { created_at: 0, updated_at: 0 },
                      })
                      .then((realEstateResponse) => {
                        const newResponse = {
                          _id: response._id,
                          featured_title: response.featured_title,
                          featured_cost: response.featured_cost,
                          user: response.userId,
                          realEstate: realEstateResponse,
                        };
                        res.status(200).json({
                          status: "success",
                          message: `Successfully updated the featured list of ${selectedFeaturedList.featured_title}.`,
                          results: newResponse,
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(500).json(error);
                  });
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

  getAllFeaturedLists: (req, res, next) => {
    FeaturedListsModel.find()
      .populate({
        path: "userId",
        select: { password: 0, created_at: 0, updated_at: 0 },
      })
      .populate({
        path: "realEstateId",
        select: { created_at: 0, updated_at: 0 },
        // nested array/response/data populate method
        populate: {
          path: "agent",
          model: "Agents",
          select: { created_at: 0, updated_at: 0 },
        },
      })
      .then((response) => {
        response.forEach((res) => {
          return {
            _id: res._id,
            featured_title: res.featured_title,
            featured_cost: res.featured_cost,
            user: res.userId,
            realEstate: res.realEstateId,
          };
        });

        res.status(200).json({
          status: "success",
          message: "Successfully get all featured lists.",
          results: response,
        });
      })

      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getFeaturedListById: (req, res, next) => {
    FeaturedListsModel.findById(req.params.featuredListId)
      .populate({
        path: "userId",
        select: { password: 0, created_at: 0, updated_at: 0 },
      })
      .populate({
        path: "realEstateId",
        select: { created_at: 0, updated_at: 0 },
        // nested array/response/data populate method
        populate: {
          path: "agent",
          model: "Agents",
          select: { created_at: 0, updated_at: 0 },
        },
      })
      .then((response) => {
        const newResponse = {
          _id: response._id,
          featured_title: response.featured_title,
          featured_cost: response.featured_cost,
          user: response.userId,
          realEstate: response.realEstateId,
        };
        res.status(200).json({
          status: "success",
          message: `Successfully get the featured list of ${response.featured_title}.`,
          results: newResponse,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  deleteFeaturedListById: (req, res, next) => {
    const featuredListId = req.query.id;

    FeaturedListsModel.findById(featuredListId)
      .populate("realEstateId")
      .then((selectedFeaturedList) => {
        FeaturedListsModel.findByIdAndRemove(featuredListId)
          .then(() => {
            // update the selected real estate
            const editRealEstateObj = {
              is_featured: false,
            };
            RealEstatesModel.findByIdAndUpdate(
              selectedFeaturedList.realEstateId._id,
              editRealEstateObj,
              { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
            )
              .then(() => {
                res.status(200).json({
                  status: "success",
                  message: `Successfully deleted ${selectedFeaturedList.featured_title} featured list.`,
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
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
};
