import Customer from '../models/Customer.js';
import Lead from '../models/Lead.js';

const isAdmin = (req) => req.user?.role === 'admin';

export async function createCustomer(req, res) {
  const body = { ...req.body, ownerId: req.user.id };
  const customer = await Customer.create(body);
  res.status(201).json(customer);
}

export async function listCustomers(req, res) {
  const { page = 1, limit = 10, q = '' } = req.query;
  const match = q ? { $text: { $search: q } } : {};
  const ownerFilter = isAdmin(req) ? {} : { ownerId: req.user.id };
  const filter = { ...match, ...ownerFilter };

  const [items, total] = await Promise.all([
    Customer.find(filter)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit),
    Customer.countDocuments(filter)
  ]);

  res.json({ items, total, page: +page, pages: Math.ceil(total / +limit) });
}

export async function getCustomer(req, res) {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) return res.status(404).json({ message: 'Not found' });
  if (!isAdmin(req) && String(customer.ownerId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  const leads = await Lead.find({ customerId: id }).sort({ createdAt: -1 });
  res.json({ ...customer.toObject(), leads });
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) return res.status(404).json({ message: 'Not found' });
  if (!isAdmin(req) && String(customer.ownerId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  Object.assign(customer, req.body);
  await customer.save();
  res.json(customer);
}

export async function deleteCustomer(req, res) {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) return res.status(404).json({ message: 'Not found' });
  if (!isAdmin(req) && String(customer.ownerId) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await customer.deleteOne();
  await Lead.deleteMany({ customerId: id });
  res.json({ success: true });
}
