import { Customer } from "../entities/Customer";
import { getConnection } from "typeorm";
import * as cloudinary from "cloudinary";

export async function createCustomer(req, res) {
  console.log(req.user);
  const newCustomer = new Customer();
  newCustomer.name = req.body.name;
  newCustomer.surname = req.body.surname;
  newCustomer.photo = req.body.photo;
  newCustomer.createdBy = req.user.id;
  await getConnection()
    .manager.save(newCustomer)
    .then(() => {
      res.send(newCustomer);
    })
    .catch((error) => console.log(error));
}

export async function getAllCustomers(req, res) {
  await getConnection()
    .manager.find(Customer, { where: { isDeleted: false } })
    .then((customers) => {
      res.send(customers);
    })
    .catch((error) => console.log(error));
}

export async function getCustomer(req, res) {
  await getConnection()
    .manager.findOne(Customer, req.params.id)
    .then((customer) => {
      res.send(customer);
    })
    .catch((error) => console.log(error));
}

export async function deleteCustomer(req, res) {
  await getConnection()
    .manager.update(Customer, req.params.id, { isDeleted: true })
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => console.log(error));
}

export async function updateCustomer(req, res) {
  req.body.lastUpdatedBy = req.user.id;
  console.log("To update", req.body);
  await getConnection()
    .manager.update(Customer, req.params.id, req.body)
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => console.log(error));
}
