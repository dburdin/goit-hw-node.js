const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    case "get":
      const contact = await getContactById(id);
      return console.log("contact", contact);

    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.log("newContact", newContact);

    case "remove":
      const deletedContact = await removeContact(id);
      return console.log("deletedContact", deletedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
