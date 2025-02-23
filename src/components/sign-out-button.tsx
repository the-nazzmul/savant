"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const SignOutButton = ({ fullWidth }: { fullWidth?: boolean }) => {
  const { signOut } = useClerk();

  return (
    <Button
      variant="outline"
      onClick={() => signOut({ redirectUrl: "/" })}
      className={cn({ "w-full": fullWidth })}
    >
      Sign out
      <LogOutIcon className="size-4 ml-2" />
    </Button>
  );
};
