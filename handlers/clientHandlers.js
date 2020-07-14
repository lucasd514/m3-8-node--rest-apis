const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

function findClient(id) {
  return clients.find((client) => client.id == id);
}
function handleClients(req, res) {
  res.status(200).json({ clients: clients });
}
function handleClient(req, res, next) {
  const clientID = req.params.id;
  const client = findClient(clientID);
  if (client) {
    res.status(200).json({ status: 200, client });
  } else next();
}
function handle404(req, res) {
  res.status(404).json({ status: 404 });
}

function findClientEmail(id) {
  return clients.find((client) => client.email == id);
}

function createNewGuy(req, res) {
  const clientEmail = req.body.email;
  const client = findClientEmail(clientEmail);
  const newclient = req.body;
  if (client) {
    console.log("we have an email");
    res.status(400).send("we already have this email on file");
  } else {
    console.log("can be added");
    clients.push(newclient);
    console.log(clients);
    res.status(200).send("new homey added to the little friends");
  }
}

module.exports = { handleClients, createNewGuy, handleClient, handle404 };
