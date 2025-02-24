import { db } from "@/lib/db";
import { userSubscriptions } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const returnUrl = process.env.NEXT_PUBLIC_APP_URL + "/account";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const _userSubscription = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));

    if (_userSubscription[0] && _userSubscription[0].stripeCustomerId) {
      // trying to cancel the subscription
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscription[0].stripeCustomerId,
        return_url: returnUrl,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // user trying to subscribe for the first time
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: returnUrl,
      cancel_url: returnUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Savant Pro",
              description: "Unlimited PDF sessions",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("STRIPE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
