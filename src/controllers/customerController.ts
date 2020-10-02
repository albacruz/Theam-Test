/* async function getAllCustomers(req, res) {
  const customers = await Customer.find();
  console.log(customers);
  res.json();
} */

export async function createCustomer(req, res) {
  /* const newCustomer = //new Customer(req.body);
  newCustomer.save(); */
  res.json(req.body);
}
