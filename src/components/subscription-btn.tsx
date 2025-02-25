"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

const SubscriptionButton = ({ isPro }: { isPro: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleSubscription} variant="outline">
      {isPro ? "Manage Subscription" : "Get Pro"}
    </Button>
  );
};

export default SubscriptionButton;
