import { type NextApiRequest, type NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import prisma from '@/libs/prismadb';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  if (sig == null) {
    res.status(400).send('Mising the stripe signature');
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    res.status(400).send('Webhook error' + err);
    return;
  }

  switch (event.type) {
    case 'charge.succeeded':
      // eslint-disable-next-line no-case-declarations
      const charge: any = event.data.object;

      if (typeof charge.payment_intent === 'string') {
        await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: { status: 'complete', address: charge.shipping?.address },
        });
      }
      break;

    default:
      console.log('Unhandler event type:' + event.type);
      break;
  }
  res.json({ received: true });
}
