const AgentsModel = require("../models/AgentsModel");

module.exports = {
  createAgent: (req, res, next) => {
    const obj = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: req.body.country,
      city: req.body.city,
    };

    if (req.file && req.file.path) {
      const url = "https://asia-property.herokuapp.com/public/uploads/";
      obj.image = url + req.file.path;
    }

    AgentsModel.create(obj)
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Successfully created a new agent.",
          results: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  updateAgentById: (req, res, next) => {
    const agentId = req.query.id;
    AgentsModel.findById(agentId)
      .then((selectedAgent) => {
        const url = "https://asia-property.herokuapp.com/public/uploads/";
        // if request body not exist replace with the existing/old one
        const editObj = {
          name: req.body.name || selectedAgent.name,
          email: req.body.email || selectedAgent.email,
          phone_number: req.body.phone_number || selectedAgent.phone_number,
          country: req.body.country || selectedAgent.country,
          city: req.body.city || selectedAgent.city,
        };
        if (req.file && req.file.path) {
          editObj.image = url + req.file.path;
        } else {
          editObj.image = selectedAgent.image;
        }

        AgentsModel.findByIdAndUpdate(
          agentId,
          editObj,
          { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
        )
          .then((response) => {
            res.status(200).json({
              status: "success",
              message: `Successfully updated the data of ${selectedAgent.name}.`,
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

  getAllAgents: (req, res, next) => {
    AgentsModel.find()
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Successfully get all agents.",
          results: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getAgentById: (req, res, next) => {
    AgentsModel.findById(req.params.agentId)
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: `Successfully get the data of ${response.name}.`,
          results: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  deleteAgentById: (req, res, next) => {
    const agentId = req.query.id;
    AgentsModel.findById(agentId)
      .then((selectedAgent) => {
        AgentsModel.findByIdAndRemove(agentId)
          .then(() => {
            res.status(200).json({
              status: "success",
              message: `Successfully deleted ${selectedAgent.name}.`,
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
