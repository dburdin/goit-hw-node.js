const { nanoid } = require("nanoid");
const { writeFile, readFile } = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const contacts = JSON.parse(await readFile(contactsPath, "utf-8"));
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  const id = String(contactId);
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === id);
    return contact || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const id = String(contactId);
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const result = contacts.splice(index, 1);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(data) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...data };

    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact || null;
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = { listContacts, getContactById, addContact, removeContact };
