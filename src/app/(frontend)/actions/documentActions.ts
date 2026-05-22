'use server';

import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function uploadCustomerDocument(formData: FormData) {
  try {
    const payload = await getPayload({ config: await configPromise });

    const firebaseUid = formData.get('firebaseUid') as string;
    const title = formData.get('title') as string;
    const documentId = formData.get('documentId') as string; // Optional (to fulfill requested document placeholders)
    const file = formData.get('file') as File;

    if (!firebaseUid) {
      return { success: false, error: 'Gebruiker is niet geautoriseerd.' };
    }

    if (!file || file.size === 0) {
      return { success: false, error: 'Geen bestand geselecteerd of bestand is leeg.' };
    }

    // 1. Fetch user to verify they exist and get customer details
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: firebaseUid } },
      limit: 1,
    });

    if (userResult.docs.length === 0) {
      return { success: false, error: 'Gekoppelde gebruiker niet gevonden.' };
    }

    const userDoc = userResult.docs[0];

    // 2. Upload file to standard Payload Media collection
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: title || file.name,
      },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type,
        size: file.size,
      },
    });

    // 3. Fulfill/update an existing requested document or create a new one
    if (documentId) {
      await payload.update({
        collection: 'documents',
        id: documentId,
        data: {
          file: mediaDoc.id,
          status: 'in_behandeling', // Move to Pending Review status
          uploadedAt: new Date().toISOString(),
        },
      });
    } else {
      await payload.create({
        collection: 'documents',
        data: {
          title: title || 'Mijn Document',
          customerNumber: userDoc.customerNumber || '',
          user: userDoc.id,
          file: mediaDoc.id,
          status: 'in_behandeling', // In behandeling
          uploadedAt: new Date().toISOString(),
        },
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to upload customer document:', error);
    return { success: false, error: error?.message || 'Er is een fout opgetreden bij het uploaden.' };
  }
}
