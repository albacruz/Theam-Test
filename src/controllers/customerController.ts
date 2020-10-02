import { Customer } from "../entity/Customer";
import { getConnection } from "typeorm";

export async function getAllCustomers(req, res) {
  const customers = await getConnection().manager.find(Customer);
  res.json(customers);
}

export async function createCustomer(req, res) {
  const newCustomer = new Customer();
  newCustomer.name = req.body.name;
  newCustomer.surname = req.body.surname;
  newCustomer.photo = req.body.photo;
  await getConnection().manager.save(newCustomer);
  res.send(newCustomer);
}

export async function deleteCustomer(req, res) {
  const customerToRemove = await getConnection().manager.findOne(req.params.id);
  await getConnection().manager.remove(customerToRemove);
  res.send(req.params.id);
}
