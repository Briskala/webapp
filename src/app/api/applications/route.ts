import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, type, name, email, phone, uid } = data;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    // Try to find the user in Payload if uid is provided
    let userId = null;
    let customerNumber = undefined;
    
    if (uid) {
      const userResult = await payload.find({
        collection: 'users',
        where: { firebaseUid: { equals: uid } },
      });
      if (userResult.docs.length > 0) {
        userId = userResult.docs[0].id;
        customerNumber = userResult.docs[0].customerNumber;
      }
    }

    // Format the full description with the submitted form details
    const fullDescription = `
Aanvraag Type: ${type || 'Algemeen'}
Naam: ${name || 'Niet opgegeven'}
Email: ${email || 'Niet opgegeven'}
Telefoon: ${phone || 'Niet opgegeven'}

Bericht / Details:
${description}
    `.trim();

    // Create the application in Payload CMS
    // Note: If the user is not logged in (no userId), we might need to link it to a generic system user
    // or make the user field not strictly required in Payload. For now, if user is required, we must have it.
    // Assuming Aanvragen collection allows creating without a user if it's a guest, or we handle it gracefully.
    // Let's check if 'user' is required. In Aanvragen.ts, user is required: true.
    // We should either find a guest user, or require the user to be logged in to apply.
    // For this SDK API, we will try to save it. If user is required and missing, we might fail.
    
    // To be safe, if we don't have a user, let's see if we can just create a contact request instead,
    // OR we just create the Aanvraag. We'll pass the userId if we have it.
    const createData: any = {
      title,
      description: fullDescription,
      status: 'in_behandeling',
    };
    
    if (userId) {
      createData.user = userId;
      if (customerNumber) {
        createData.customerNumber = customerNumber;
      }
    } else {
      // Find an admin user or generic user to attach to if it's strictly required
      const firstUser = await payload.find({ collection: 'users', limit: 1 });
      if (firstUser.docs.length > 0) {
        createData.user = firstUser.docs[0].id;
      }
    }

    const result = await payload.create({
      collection: 'aanvragen',
      data: createData,
    });

    return NextResponse.json({ success: true, doc: result }, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
