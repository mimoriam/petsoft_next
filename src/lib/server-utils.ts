import prisma from "@/lib/db";
import { Pet } from "@prisma/client";

export async function getPetById(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });
  return pet;
}
