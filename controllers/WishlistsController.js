const WishlistsModel = require("../models/WishlistsModel");
const RealEstatesModel = require("../models/RealEstatesModel");

// Best Populate Example = WishlistController + WishlistsModel.
// It makes user only need to provide the id field. and can return the response in a proper way.

module.exports = {
  createWishlist: (req, res, next) => {
    const obj = {
      userId: req.body.user_id,
      realEstateId: req.body.real_estate_id,
    };

    WishlistsModel.create(obj)
      .then((results) => {
        WishlistsModel.findById(results._id)
          .populate({
            path: "userId",
            select: { password: 0, created_at: 0, updated_at: 0 },
          })
          .populate({
            path: "realEstateId",
            select: { created_at: 0, updated_at: 0 },
            populate: {
              path: "agent",
              model: "Agents",
              select: { created_at: 0, updated_at: 0 },
            },
          })
          .then((response) => {
            const newResponse = {
              _id: response._id,
              user: response.userId,
              realEstate: response.realEstateId,
            };
            res.status(200).json({
              status: "success",
              message: "Successfully created a new wishlist.",
              results: newResponse,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getAllWishlists: (req, res, next) => {
    WishlistsModel.find()
      .populate({
        path: "userId",
        select: { password: 0, created_at: 0, updated_at: 0 },
      })
      .populate({
        path: "realEstateId",
        select: { created_at: 0, updated_at: 0 },
        populate: {
          path: "agent",
          model: "Agents",
          select: { created_at: 0, updated_at: 0 },
        },
      })
      .then((response) => {
        const newResponse = [];
        response.forEach((res) => {
          newResponse.push({
            _id: res._id,
            user: res.userId,
            realEstate: res.realEstateId,
          });
        });

        res.status(200).json({
          status: "success",
          message: "Successfully get all wishlists.",
          results: newResponse,
        });
      })

      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getWishlistByUserId: (req, res, next) => {
    const userIdUrlQuery = req.params.userId;
    WishlistsModel.find({ userId: userIdUrlQuery })
      .populate({
        path: "userId",
        select: { password: 0, created_at: 0, updated_at: 0 },
      })
      .populate({
        path: "realEstateId",
        select: { created_at: 0, updated_at: 0 },
        populate: {
          path: "agent",
          model: "Agents",
          select: { created_at: 0, updated_at: 0 },
        },
      })
      .then((response) => {
        let newResponse = [];
        const realEstateList = [];
        response.forEach((res) => {
          realEstateList.push(res.realEstateId);
        });

        if (response.length) {
          newResponse = {
            _id: response[0]._id,
            user: response[0].userId,
            wishlists: realEstateList,
          };
        }
        const username = (newResponse.user && newResponse.user.username) || "";

        res.status(200).json({
          status: "success",
          message: `Successfully get wishlist list ${
            username ? `by user of ${username}` : "by id"
          }.`,
          results: newResponse,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  deleteWishlistById: (req, res, next) => {
    const userIdUrlQuery = req.query.user_id;
    const realEstateIdUrlQuery = req.query.real_estate_id;

    WishlistsModel.find({
      userId: userIdUrlQuery,
      realEstateId: realEstateIdUrlQuery,
    })
      .then((selectedWishlist) => {
        WishlistsModel.findByIdAndRemove(selectedWishlist[0]._id)
          .then(() => {
            res.status(200).json({
              status: "success",
              message: `Successfully deleted the wishlist.`,
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
