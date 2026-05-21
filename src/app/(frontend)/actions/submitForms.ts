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

export async function submitLeaseRequest(data: {
  name: string;
  email: string;
  phone: string;
  vehicleName: string;
  downPayment: number;
  termMonths: number;
  residualValue: number;
  monthlyPayment: number;
  totalPayment: number;
  interestRate: number;
  notes?: string;
}) {
  try {
    const payload = await getPayload({ config: await configPromise });
    
    await payload.create({
      collection: 'lease-requests',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        vehicleName: data.vehicleName,
        downPayment: data.downPayment,
        termMonths: data.termMonths,
        residualValue: data.residualValue,
        interestRate: data.interestRate,
        monthlyPayment: data.monthlyPayment,
        totalPayment: data.totalPayment,
        status: 'nieuw',
        notes: data.notes,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to submit lease request:', error);
    return { success: false, error: 'Er is een fout opgetreden bij het opslaan van uw aanvraag. Probeer het later opnieuw.' };
  }
}

