"use client";

import React, {
  createContext,
  useContext,
  useState,
  useOptimistic,
} from "react";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { toast } from "sonner";
import { Pet } from "@prisma/client";
import { PetEssentials } from "@/lib/types";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;

  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => Promise<void>;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  // State:
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];

        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            }
            return pet;
          });

        case "delete":
          return state.filter((pet) => pet.id !== payload);

        default:
          return state;
      }
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // Derived state:
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // Event handlers:
  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet });

    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
    }
  };

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } });

    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
    }
  };

  const handleChangeSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: Pet["id"]) => {
    setOptimisticPets({ action: "delete", payload: petId });

    await deletePet(petId);
    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,

        handleAddPet,
        handleEditPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("usePetContext must be used within a PetContextProvider");
  }

  return context;
}
