import { Customer } from "../entities/Customer";
import { getConnection } from "typeorm";
import * as cloudinary from "cloudinary";
import * as dotenv from "dotenv";
import { config } from "../config";
dotenv.config();

function filterCustomersData(customer) {
  const filteredCustomer = {
    id: customer.id,
    name: customer.name,
    surname: customer.surname,
    photo: customer.photo,
    createdBy: customer.createdBy,
    lastUpdatedBy: customer.lastUpdatedBy,
  };
  return filteredCustomer;
}

function filterDeletedCustomerData(customer) {
  const filteredCustomer = {
    id: customer.id,
    name: customer.name,
    surname: customer.surname,
    photo: customer.photo,
    createdBy: customer.createdBy,
    lastUpdatedBy: customer.lastUpdatedBy,
    isDeleted: customer.isDeleted,
  };
  return filteredCustomer;
}

cloudinary.v2.config(config.cloudinaryConfig);

export async function createCustomer(req, res) {
  const newCustomer = new Customer();
  newCustomer.name = req.body.name;
  newCustomer.surname = req.body.surname;
  await cloudinary.v2.uploader
    .upload(req.files.photo.tempFilePath)
    .then((response) => {
      newCustomer.photo = response.secure_url;
    })
    .catch((error) => console.log(error));
  newCustomer.createdBy = req.user.id;
  await getConnection()
    .manager.save(newCustomer)
    .then(() => {
      res.send(filterCustomersData(newCustomer));
    })
    .catch((error) => console.log(error));
}

export async function getAllCustomers(req, res) {
  await getConnection()
    .manager.find(Customer, { where: { isDeleted: false } })
    .then((customers) => {
      res.send(customers.map(filterCustomersData));
    })
    .catch((error) => console.log(error));
}

export async function getCustomer(req, res) {
  await getConnection()
    .manager.findOne(Customer, req.params.id)
    .then((customer) => {
      if (customer.isDeleted) {
        res.send(filterDeletedCustomerData(customer));
      } else {
        res.send(filterCustomersData(customer));
      }
    })
    .catch((error) => console.log(error));
}

export async function deleteCustomer(req, res) {
  await getConnection()
    .manager.update(Customer, req.params.id, { isDeleted: true })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => console.log(error));
}

export async function updateCustomer(req, res) {
  req.body.lastUpdatedBy = req.user.id;
  await getConnection()
    .manager.update(Customer, req.params.id, req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => console.log(error));
}
