import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook, CollectionAfterChangeHook } from 'payload'

export function generateCustomerNumber(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `BPAG-${digits}`;
}

export const ensureCustomerNumber: CollectionBeforeValidateHook = async ({
  data,
  req,
  operation,
}) => {
  if (data && !data.customerNumber) {
    data.customerNumber = generateCustomerNumber();
  }
  return data;
}

export const resolveCustomerUser: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  if (!data) return data;

  const payload = req.payload;

  // 1. If customerNumber is entered but user is missing
  if (data.customerNumber && !data.user) {
    try {
      const usersResult = await payload.find({
        collection: 'users',
        where: {
          customerNumber: { equals: data.customerNumber },
        },
        limit: 1,
      });
      if (usersResult.docs.length > 0) {
        data.user = usersResult.docs[0].id;
      }
    } catch (err: any) {
      req.payload.logger.error({ err }, `Error resolving user for customerNumber: ${data.customerNumber}`);
    }
  }

  // 2. If user is entered but customerNumber is missing or needs syncing
  if (data.user && !data.customerNumber) {
    try {
      const userId = typeof data.user === 'object' ? data.user.id : data.user;
      const user = await payload.findByID({
        collection: 'users',
        id: userId,
      });
      if (user && user.customerNumber) {
        data.customerNumber = user.customerNumber;
      }
    } catch (err: any) {
      req.payload.logger.error({ err }, `Error resolving customerNumber for user ID: ${data.user}`);
    }
  }

  return data;
}

export const autoCreateServiceOnApproval: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  // Only trigger when status changes to 'goedgekeurd'
  if (doc.status === 'goedgekeurd' && previousDoc?.status !== 'goedgekeurd') {
    const payload = req.payload;
    try {
      const userId = typeof doc.user === 'object' ? doc.user.id : doc.user;
      if (!userId) return;

      // 1. Try to find an existing service with matching title
      let serviceId;
      const existingServices = await payload.find({
        collection: 'services',
        where: {
          title: { equals: doc.title },
        },
        limit: 1,
      });

      if (existingServices.docs.length > 0) {
        serviceId = existingServices.docs[0].id;
      } else {
        // Create a new service automatically
        // Determine a nice icon based on keywords
        let icon = '💼';
        const titleLower = doc.title.toLowerCase();
        if (titleLower.includes('auto') || titleLower.includes('car')) icon = '🚗';
        else if (titleLower.includes('lening') || titleLower.includes('loan') || titleLower.includes('hypotheek') || titleLower.includes('finance')) icon = '💰';
        else if (titleLower.includes('huur') || titleLower.includes('rental') || titleLower.includes('woning')) icon = '🏠';
        else if (titleLower.includes('verzekering') || titleLower.includes('insurance')) icon = '🛡️';

        const newService = await payload.create({
          collection: 'services',
          data: {
            title: doc.title,
            icon,
            shortDescription: doc.description || `Goedgekeurde dienst: ${doc.title}`,
          },
        });
        serviceId = newService.id;
      }

      // 2. Check if a UserServices entry already exists for this user and service to avoid duplication
      const existingUserServices = await payload.find({
        collection: 'user-services',
        where: {
          user: { equals: userId },
          service: { equals: serviceId },
        },
        limit: 1,
      });

      if (existingUserServices.docs.length === 0) {
        await payload.create({
          collection: 'user-services',
          data: {
            user: userId,
            customerNumber: doc.customerNumber,
            service: serviceId,
            status: 'actief',
            startDate: new Date().toISOString(),
          },
        });
      }
    } catch (err: any) {
      req.payload.logger.error({ err }, `Error auto-creating service on approval for Aanvraag ID ${doc.id}`);
    }
  }
}
