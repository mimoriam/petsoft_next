import React from "react";
import BackgroundPattern from "@/components/page-ui/background-pattern";
import AppFooter from "@/components/page-ui/app-footer";
import AppHeader from "@/components/page-ui/app-header";
import { Toaster } from "@/components/page-ui/sonner";
import PetContextProvider from "@/contexts/pet-context-provider";
import { Pet } from "@/lib/types";
import SearchContextProvider from "@/contexts/search-context-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
  );

  if (!res.ok) {
    throw new Error("Could not fetch pets!");
  }

  const data: Pet[] = await res.json();

  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />

        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
