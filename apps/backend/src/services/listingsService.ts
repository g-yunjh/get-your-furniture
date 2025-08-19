import { getPrisma } from '../prisma';
import { Listing, Prisma } from '@prisma/client';

export async function listListings(): Promise<Listing[]> {
  const prisma = getPrisma();
  return prisma.listing.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getListingById(id: number): Promise<Listing | null> {
  const prisma = getPrisma();
  return prisma.listing.findUnique({ where: { id } });
}

export type CreateListingInput = Pick<Prisma.ListingUncheckedCreateInput,
  'title' | 'description' | 'priceCents' | 'condition' | 'location' | 'imageUrl'>;

export async function createListing(input: CreateListingInput): Promise<Listing> {
  const prisma = getPrisma();
  return prisma.listing.create({ data: input });
}

export async function updateListingById(
  id: number,
  input: Partial<CreateListingInput>
): Promise<Listing | null> {
  const prisma = getPrisma();
  try {
    return await prisma.listing.update({ where: { id }, data: input });
  } catch (err) {
    return null;
  }
}

export async function deleteListingById(id: number): Promise<boolean> {
  const prisma = getPrisma();
  try {
    await prisma.listing.delete({ where: { id } });
    return true;
  } catch (err) {
    return false;
  }
}
