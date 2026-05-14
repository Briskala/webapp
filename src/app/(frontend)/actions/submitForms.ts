'use server';

import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function submitContactRequest(formData: FormData) {
  try {
    const payload = await getPayload({ config: await configPromise });
    
    await payload.create({
      collection: 'contact-requests',
      data: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
        status: 'new',
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to submit contact request:', error);
    return { success: false, error: 'Er is een fout opgetreden. Probeer het later opnieuw.' };
  }
}

export async function submitProblemReport(formData: FormData) {
  try {
    const payload = await getPayload({ config: await configPromise });
    
    await payload.create({
      collection: 'problem-reports',
      data: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        problem: formData.get('problem') as string,
        status: 'new',
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to submit problem report:', error);
    return { success: false, error: 'Er is een fout opgetreden. Probeer het later opnieuw.' };
  }
}
