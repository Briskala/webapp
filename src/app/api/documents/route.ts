import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const documentId = formData.get('documentId') as string;
    const uid = formData.get('uid') as string;

    if (!file || !uid) {
      return NextResponse.json({ error: 'Missing file or user' }, { status: 400 });
    }

    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    // Verify user
    const userResult = await payload.find({
      collection: 'users',
      where: { firebaseUid: { equals: uid } },
    });
    
    if (userResult.docs.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.docs[0].id;
    const customerNumber = userResult.docs[0].customerNumber;

    // Upload to Media collection
    // We need to convert File to a Buffer for Payload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: file.name,
      },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type,
        size: file.size,
      },
    });

    if (documentId) {
      // Update existing requested document
      const doc = await payload.update({
        collection: 'documents',
        id: documentId,
        data: {
          file: mediaDoc.id,
          status: 'in_behandeling', // Change status from requested to in_behandeling
          uploadedAt: new Date().toISOString(),
        },
      });
      return NextResponse.json({ success: true, doc }, { status: 200 });
    } else {
      // Create new document (if customers are allowed to upload unsolicited, but typically they just respond to requests)
      const doc = await payload.create({
        collection: 'documents',
        data: {
          title: file.name,
          user: userId,
          customerNumber: customerNumber,
          file: mediaDoc.id,
          status: 'in_behandeling',
        },
      });
      return NextResponse.json({ success: true, doc }, { status: 201 });
    }
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
