import keys from "../constants/apikeys";
const Parse = require("parse");

export function parseInit() {
  console.log("parseInit() APP_ID: " + keys.APP_ID);
  Parse.serverURL = "https://notifyme.back4app.io"; // This is your Server URL
  Parse.initialize(keys.APP_ID, keys.JS_KEY);
}

// parse response
// {"username":"test","email":"example@google.com","name":"web_user",
// "confirmPassword":"qwerty","RunCount":1,"createdAt":"2020-04-30T11:06:44.869Z",
// "sessionToken":"r:b8447633f8bf4348d611eadd442b7a6e",
// "updatedAt":"2020-04-30T11:06:44.869Z","objectId":"dNvDWX46ws"}
export function userSignUp({ username, email, password }, callback) {
  const user = new Parse.User();
  user.set("email", email);
  user.set("name", "web_user");
  user.set("confirmPassword", password);
  user.set("RunCount", 1);
  user.set("password", password);

  if (username === null) {
    console.log("parse userSignUp() signIn tread");
    user
      .signIn()
      .then((user) => {
        callback(user.toJSON());
        console.log("User logged in: ", user.get("sessionToken"));
      })
      .catch((error) => {
        callback(error.message);
      });
  } else {
    console.log("parse userSignUp() signUp tread");
    user.set("username", username);
    user
      .signUp()
      .then((user) => {
        callback(user.toJSON());
        console.log("User Signed up: ", user.get("sessionToken"));
      })
      .catch((error) => {
        callback(error.message);
      });
  }
}

export async function userSignUpAsync({ username, email, password }) {
  const toCamelCase = (str) =>
    str
      .split(/\s*[\s,]\s*/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  var currentUser = Parse.User.current();
  if (currentUser) {
    // do stuff with the user
    Parse.User.logOut();
  }
  const user = new Parse.User();
  user.set("name", "web_user");
  user.set("password", password);
  let result;
  console.log("userSignUpAsync");
  console.log({ username, email, password });
  if (username === undefined) {
    user.set("username", email);
    console.log("parse userSignUp() signIn tread");
    result = await user.logIn();
  } else {
    console.log("parse userSignUp() signUp tread");
    user.set("username", toCamelCase(username));
    user.set("email", email);
    console.log("before signUp seesion Token: ");
    result = await user.signUp();
    result = result.toJSON();
    await createSelfUser(toCamelCase(username), result.objectId);
  }
  console.log(result.get("sessionToken"));
  result = result.toJSON();
  return result;
}
/// reads all inbox messages from Messsages for given user
export async function readMessages(username) {
  const Messages = Parse.Object.extend("Messages");
  const query = new Parse.Query(Messages);
  query.equalTo("to", username);
  const results = await query.find();
  console.log(results.length + " messages");
  console.log(results[0]);
  // convert returned Parse.Object values to array of Messages
  return results.map((msg) => ({
    objectId: msg.id,
    from: msg.get("from"),
    timestamp: msg.get("timestamp"),
    body: msg.get("body"),
    title: msg.get("title"),
  }));
}
/// reads all outbox messages from Messsages for given user
export async function readOutbox(username) {
  const Messages = Parse.Object.extend("Messages");
  const query = new Parse.Query(Messages);
  query.equalTo("from", username);
  const results = await query.find();
  console.log(results.length + " messages");
  console.log(results[0]);
  // convert returned Parse.Object values to array of Messages
  return results
    .map((msg) => ({
      objectId: msg.id,
      to: msg.get("to"),
      timestamp: msg.get("timestamp"),
      body: msg.get("body"),
      title: msg.get("title"),
    }))
    .filter((msg) => !msg.title?.includes("DEL"));
}
/// updates message title im Meessages collection
export async function setMessageTitle(objectId, title) {
  const Messages = Parse.Object.extend("Messages");
  const message = new Parse.Query(Messages);
  message.get(objectId).then((object) => {
    object.set("title", title.trim());
    object.save().then(
      (response) => {
        return null;
      },
      (error) => {
        return "Error while updating " + error;
      }
    );
  });
}
/// add new key to message title im Meessages collection
export async function addMessageTitle(objectId, title) {
  const Messages = Parse.Object.extend("Messages");
  const message = new Parse.Query(Messages);
  message.get(objectId).then((object) => {
    object.set("title", `${object.get("title") || ""} ${title.trim()}`);
    object.save().then(
      (response) => {
        return null;
      },
      (error) => {
        return "Error while updating " + error;
      }
    );
  });
}
/// creates new message in Messages on server
/// timestamp added in this function
/// return objectId of created meddage
export async function createMessage(from, to, body) {
  const Messages = Parse.Object.extend("Messages");
  const message = new Messages();
  const d = new Date();
  const datestring =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    " " +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2);
  message.set("from", from);
  message.set("body", body);
  message.set("to", to);
  message.set("timestamp", datestring);
  const result = await message.save();
  console.log("yyyyyyyyyyyyyyyyyyyy");
  console.dir(result);
  return {
    objectId: result.id,
    body: result.get("body"),
    from: result.get("from"),
    to: result.get("to"),
    timestamp: result.get("timestamp"),
  };
}
/// queries collection for searchItem in column
/// returns null if nothing found or array
export async function queryCollection({ collection, column, searchItem }) {
  const Collection = Parse.Object.extend(collection);
  const query = new Parse.Query(Collection);
  !searchItem ? query.find() : query.equalTo(column, searchItem);
  const results = await query.find();
  if (results.length === 0) return null;
  return results;
}
/// queries Users collection for all usernames
/// returns array of object {username: 'Jhon Doe' objectId: 'aasdsdd', ...}
///
export async function getAddressees() {
  const result = await queryCollection({ collection: "Users" });
  return result.map((data) => ({
    username: data.get("username"),
    objectId: data.id,
  }));
}
export async function deleteMessage(objectId) {
  const Messages = Parse.Object.extend("Messages");
  const query = new Parse.Query(Messages);
  const object = await query.get(objectId);
  const response = await object.destroy();
  return response;
}
/// creates user record in Users collection
async function createSelfUser(username, objectId) {
  // first, check if user is already in Users collection
  const result = await queryCollection({
    collection: "Users",
    column: "username",
    searchItem: username,
  });
  if (result === null) {
    // there is no user record in Users, so create one
    console.log("Creating new Users record");
    const Users = Parse.Object.extend("Users");
    const user = new Users();
    user.set("username", username);
    user.set("userObjId", objectId);
    user.set("deviceId", "web");
    user.save().then(
      (user) => {
        // Execute any logic that should take place after the object is saved.
        console.log("New object created with objectId: " + user.id);
      },
      (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log(
          "Failed to create new object, with error code: " + error.message
        );
      }
    );
  } else if (result > 1)
    console.log("!!! the mess detected in Users collection !!!");
}
