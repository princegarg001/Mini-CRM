import Lead from '../models/Lead.js';

export async function leadsByStatus(req, res) {
  const pipeline = [
    { $group: { _id: '$status', count: { $sum: 1 }, totalValue: { $sum: '$value' } } },
    { $project: { status: '$_id', count: 1, totalValue: 1, _id: 0 } }
  ];
  const result = await Lead.aggregate(pipeline);
  res.json(result);
}

export default { leadsByStatus };
