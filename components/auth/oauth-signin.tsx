"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

const oauthProviders = [
  { name: "Google", icon: "google" },
  { name: "Facebook", icon: "facebook" },
  { name: "Apple", icon: "apple" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
}[];

export function OAuthSignIn() {
  // const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null);
  // const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { toast } = useToast();

  // async function oauthSignIn(provider: OAuthStrategy) {
  //   if (!signInLoaded) return null;
  //   try {
  //     setIsLoading(provider);
  //     await signIn.authenticateWithRedirect({
  //       strategy: provider,
  //       redirectUrl: "/sso-callback",
  //       redirectUrlComplete: "/",
  //     });
  //   } catch (error) {
  //     setIsLoading(null);

  //     const unknownError = "Something went wrong, please try again.";

  //     const description = isClerkAPIResponseError(error)
  //       ? error.errors[0]?.longMessage ?? unknownError
  //       : unknownError;

  //     toast({
  //       title: "Error",
  //       description,
  //     });
  //   }
  // }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.name}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            // onClick={() => void oauthSignIn(provider.strategy)}
          >
            {/* {isLoading === provider.strategy ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )} */}
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
}
