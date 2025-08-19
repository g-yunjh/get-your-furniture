import { Router } from 'express';
import {
  listListings,
  getListingById,
  createListing,
  updateListingById,
  deleteListingById,
} from '../services/listingsService';
import { z } from 'zod';

const router = Router();

const listingSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(''),
  priceCents: z.number().int().nonnegative(),
  condition: z.enum(['NEW', 'GOOD', 'FAIR', 'POOR']).default('GOOD'),
  location: z.string().optional().default(''),
  imageUrl: z.string().url().optional().default('')
});

router.get('/', async (_req, res) => {
  const listings = await listListings();
  res.json(listings);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const listing = await getListingById(id);
  if (!listing) return res.status(404).json({ error: 'Not found' });
  res.json(listing);
});

router.post('/', async (req, res) => {
  const parse = listingSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const created = await createListing(parse.data);
  res.status(201).json(created);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const parse = listingSchema.partial().safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const updated = await updateListingById(id, parse.data);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const deleted = await deleteListingById(id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

export default router;
