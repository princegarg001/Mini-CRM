import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createLeadSchema, updateLeadSchema } from '../validators/leadSchemas.js';
import { createLead, listLeads, updateLead, deleteLead } from '../controllers/leadController.js';

const router = Router();
router.use(authRequired);

router.post('/:customerId/leads', validate(createLeadSchema), createLead);
router.get('/:customerId/leads', listLeads); // optional ?status=New|Contacted|Converted|Lost
router.put('/:customerId/leads/:leadId', validate(updateLeadSchema), updateLead);
router.delete('/:customerId/leads/:leadId', deleteLead);

export default router;
