import { Router } from 'express';
import { createLead, deleteLead, listLeads, updateLead } from '../controllers/leadController.js';
import { authRequired } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createLeadSchema, updateLeadSchema } from '../validators/leadSchemas.js';

const router = Router({ mergeParams: true });
router.use(authRequired);

router.post('/', validate(createLeadSchema), createLead);
router.get('/', listLeads); // optional ?status=New|Contacted|Converted|Lost
router.put('/:leadId', validate(updateLeadSchema), updateLead);
router.delete('/:leadId', deleteLead);

export default router;
