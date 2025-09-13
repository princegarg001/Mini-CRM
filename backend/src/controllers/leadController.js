import Lead from '../models/Lead.js';
import Customer from '../models/Customer.js';

const canAccess = async (req, customerId) => {
  const customer = await Customer.findById(customerId);
  if (!customer) return { ok: false, status: 404, message: 'Customer not found' };
  if (req.user.role !== 'admin' && String(customer.ownerId) !== req.user.id) return { ok: false, status: 403, message: 'Forbidden' };
  return { ok: true, customer };
};

export async function createLead(req, res) {
  const { customerId } = req.params;
  const access = await canAccess(req, customerId);
  if (!access.ok) return res.status(access.status).json({ message: access.message });
  const lead = await Lead.create({ customerId, ...req.body });
  res.status(201).json(lead);
}

export async function listLeads(req, res) {
  const { customerId } = req.params;
  const access = await canAccess(req, customerId);
  if (!access.ok) return res.status(access.status).json({ message: access.message });
  const { status } = req.query;
  const filter = { customerId };
  if (status) filter.status = status;
  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  res.json(leads);
}

export async function updateLead(req, res) {
  const { customerId, leadId } = req.params;
  const access = await canAccess(req, customerId);
  if (!access.ok) return res.status(access.status).json({ message: access.message });
  const lead = await Lead.findOne({ _id: leadId, customerId });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  Object.assign(lead, req.body);
  await lead.save();
  res.json(lead);
}

export async function deleteLead(req, res) {
  const { customerId, leadId } = req.params;
  const access = await canAccess(req, customerId);
  if (!access.ok) return res.status(access.status).json({ message: access.message });
  await Lead.deleteOne({ _id: leadId, customerId });
  res.json({ success: true });
}
