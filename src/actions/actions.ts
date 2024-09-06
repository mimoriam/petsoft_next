"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";

export async function addPet(pet: PetEssentials) {
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (err) {
    return {
      message: "Error adding pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet["id"], newPetData: PetEssentials) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (err) {
    return {
      message: "Error editing pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: Pet["id"]) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (err) {
    return {
      message: "Error deleting a pet",
    };
  }

  revalidatePath("/app", "layout");
}
