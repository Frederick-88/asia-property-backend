const BookingListsModel = require("../models/BookingListsModel");
const RealEstatesModel = require("../models/RealEstatesModel");

module.exports = {
  createBookingList: (req, res, next) => {
    BookingListsModel.find()
      .then((getResponse) => {
        // find highest number created, and add 1 to prevent duplication.
        let highestNumber = 0;
        getResponse.forEach((booking) => {
          const getNumber = parseInt(
            booking.bookingTitle.replace(/[^0-9]/g, "")
          );
          highestNumber = Math.max(getNumber, highestNumber);
        });
        const number = highestNumber + 1;

        const obj = {
          bookingTitle: `Booking-${number}`,
          userId: req.body.userId,
          realEstateId: req.body.realEstateId,
        };

        BookingListsModel.create(obj)
          .then((results) => {
            BookingListsModel.findById(results._id)
              .populate("userId")
              .then((response) => {
                // update the selected real estate
                const editRealEstateObj = {
                  is_featured: true,
                };
                RealEstatesModel.findByIdAndUpdate(
                  req.body.realEstateId,
                  editRealEstateObj,
                  { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
                )
                  .then((realEstateResponse) => {
                    const newResponse = {
                      _id: response._id,
                      bookingTitle: response.bookingTitle,
                      user: response.userId,
                      realEstate: realEstateResponse,
                    };
                    res.status(200).json({
                      status: "success",
                      message: "Successfully created a new booking list.",
                      results: newResponse,
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

  updateBookingListById: (req, res, next) => {
    const bookingListId = req.query.id;

    BookingListsModel.findById(bookingListId)
      .then((selectedBookingList) => {
        const editObj = {
          bookingTitle: selectedBookingList.bookingTitle,
          userId: req.body.userId || selectedBookingList.userId,
          realEstateId:
            req.body.realEstateId || selectedBookingList.realEstateId,
        };

        BookingListsModel.findByIdAndUpdate(
          bookingListId,
          editObj,
          { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
        )
          .then((results) => {
            BookingListsModel.findById(results._id)
              .populate("userId")
              .then((response) => {
                // update the selected real estate
                const editRealEstateObj = {
                  is_featured: true,
                };
                RealEstatesModel.findByIdAndUpdate(
                  req.body.realEstateId,
                  editRealEstateObj,
                  { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
                )
                  .then((realEstateResponse) => {
                    const newResponse = {
                      _id: response._id,
                      bookingTitle: response.bookingTitle,
                      user: response.userId,
                      realEstate: realEstateResponse,
                    };
                    res.status(200).json({
                      status: "success",
                      message: `Successfully updated the booking list of ${selectedBookingList.bookingTitle}.`,
                      results: newResponse,
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

  getAllBookingLists: (req, res, next) => {
    BookingListsModel.find()
      .populate("userId")
      .populate("realEstateId")
      .then((response) => {
        const newResponse = response.map((booking) => {
          return {
            _id: booking._id,
            bookingTitle: booking.bookingTitle,
            user: booking.userId,
            realEstate: booking.realEstateId,
          };
        });
        res.status(200).json({
          status: "success",
          message: "Successfully get all booking lists.",
          results: newResponse,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getBookingListById: (req, res, next) => {
    BookingListsModel.findById(req.params.bookingListId)
      .populate("userId")
      .populate("realEstateId")
      .then((response) => {
        const newResponse = {
          _id: response._id,
          bookingTitle: response.bookingTitle,
          user: response.userId,
          realEstate: response.realEstateId,
        };
        res.status(200).json({
          status: "success",
          message: `Successfully get the booking list of ${response.bookingTitle}.`,
          results: newResponse,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  deleteBookingListById: (req, res, next) => {
    const bookingListId = req.query.id;

    BookingListsModel.findById(bookingListId)
      .then((selectedBookingList) => {
        BookingListsModel.findByIdAndRemove(bookingListId)
          .then(() => {
            res.status(200).json({
              status: "success",
              message: `Successfully deleted ${selectedBookingList.bookingTitle} booking list.`,
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
