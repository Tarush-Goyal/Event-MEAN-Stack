const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports.event = (req, res) => {
  const event = new Event();

  event.name = req.body.name;
  event.cost = req.body.cost;
  event.description = req.body.description;
  event.type = req.body.type;
  event.city = req.body.city;
  event.date = req.body.date;
  event.email = req.body.email;

  event.save(() => {
    console.log("saving data");
    res.status(200);
    res.json(event);
  });
};

module.exports.list = (req, res) => {
  let eventEmail=JSON.stringify(req.headers.email);
  eventEmail=eventEmail.slice(3,-3);
  console.log(" email is: ",eventEmail," length is: ",eventEmail.length);
  Event.find({email:{$eq:eventEmail}}).exec(function(err, email) {
    console.log("email recieved from db:",email)
    res.status(200).json(email);
  });
};
