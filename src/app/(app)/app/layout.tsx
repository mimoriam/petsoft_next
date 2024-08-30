import React from "react";
import BackgroundPattern from "@/components/page-ui/background-pattern";
import AppFooter from "@/components/page-ui/app-footer";
import AppHeader from "@/components/page-ui/app-header";
import { Toaster } from "@/components/page-ui/sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />
        {children}
        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
