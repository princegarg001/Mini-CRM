import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { allowRoles } from '../middleware/roles.js';
import { createCustomerSchema, updateCustomerSchema } from '../validators/customerSchemas.js';
import { createCustomer, listCustomers, getCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController.js';

const router = Router();
router.use(authRequired);

router.post('/', validate(createCustomerSchema), createCustomer);
router.get('/', listCustomers); // ?page=&limit=&q=
router.get('/:id', getCustomer);
router.put('/:id', validate(updateCustomerSchema), updateCustomer);
router.delete('/:id', allowRoles('admin','user'), deleteCustomer);

export default router;
