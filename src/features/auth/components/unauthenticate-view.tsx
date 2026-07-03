import { ShieldAlertIcon } from "lucide-react";

import {
  Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export const UnauthenticatedView = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Item className="w-full max-w-md bg-muted">
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>You are not authenticated</ItemTitle>
          <ItemDescription>
            Please sign in to continue.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <SignInButton>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
        </ItemActions>
      </Item>
    </div>
  );
};
