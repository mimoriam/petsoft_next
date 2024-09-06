"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PetForm from "@/components/page-ui/pet-form";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function PetButton({
  actionType,
  onClick,
  disabled,
  children,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Conditionally render UI for delete action:
  if (actionType === "checkout") {
    return (
      <Button variant="destructive" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    );
  }

  // if (actionType === "edit") {
  //   return <Button variant="secondary">{children}</Button>;
  // }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusIcon className="size-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          // Close form after submission:
          actionType={actionType}
          onFormSubmission={() => {
            setIsFormOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
