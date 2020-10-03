import { Customer } from "../entity/Customer";
import { getConnection } from "typeorm";

export async function getAllCustomers(req, res) {
  await getConnection()
    .manager.find(Customer)
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

export async function createCustomer(req, res) {
  const newCustomer = new Customer();
  newCustomer.name = req.body.name;
  newCustomer.surname = req.body.surname;
  newCustomer.photo = req.body.photo;
  await getConnection()
    .manager.save(newCustomer)
    .then(() => {
      res.send(newCustomer);
    })
    .catch((error) => console.log(error));
}

export async function deleteCustomer(req, res) {
  await getConnection()
    .manager.delete(Customer, req.params.id)
    .then(() => {
      res.send(req.params.id);
    })
    .catch((error) => console.log(error));
}
