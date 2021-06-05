const AgentsModel = require("../models/AgentsModel");
require("dotenv").config();

module.exports = {
  createAgent: (req, res, next) => {
    console.log(req.body.image);
    console.log(req.file);

    const obj = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: req.body.country,
      city: req.body.city,
    };

    if (req.file && req.file.path) {
      obj.image = req.file.path;
    }

    AgentsModel.create(obj)
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Successfully created a new agent!",
          results: response,
        });
      })
      .catch((error) => res.status(500).json(error));
  },

  updateAgentById: (req, res, next) => {
    agentId = req.params.agentId;
    AgentsModel.findById(agentId).then((selectedAgent) => {
      AgentsModel.findByIdAndUpdate(
        agentId,
        // if request body not exist replace with the existing/old one
        {
          image: (req.file && req.file.path) || selectedAgent.image,
          name: req.body.name || selectedAgent.name,
          email: req.body.email || selectedAgent.email,
          phone_number: req.body.phone_number || selectedAgent.phone_number,
          country: req.body.country || selectedAgent.country,
          city: req.body.city || selectedAgent.city,
        },
        { new: true } // used when we use findByIdAndUpdate, to return the edited document instead of old one
      )
        .then((response) => {
          console.log(response); // todo : change message with name
          res.status(200).json({
            status: "success",
            message: `Successfully edited the data of ${agentId} .`,
            results: response,
          });
        })
        .catch((error) => res.status(500).json(error));
    });
  },

  getAllAgents: (req, res, next) => {
    AgentsModel.find({})
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Successfully get all agents!",
          results: response,
        });
      })
      .catch((error) => res.status(500).json(error));
  },

  getAgentById: (req, res, next) => {
    AgentsModel.findById(req.params.agentId)
      .then((response) => {
        console.log(response); // todo : change message with name
        res.status(200).json({
          status: "success",
          message: `Successfully get the data of ${req.params.agentId} !`,
          results: response,
        });
      })
      .catch((error) => res.status(500).json(error));
  },

  deleteAgentById: (req, res, next) => {
    AgentsModel.findByIdAndRemove(req.params.agentId)
      .then(() => {
        res.status(200).json({
          status: "success",
          message: `Successfully deleted id of ${req.params.agentName} !`,
        });
      })
      .catch((error) => res.status(500).json(error));
  },
};
