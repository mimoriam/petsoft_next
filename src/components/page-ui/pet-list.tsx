import Image from "next/image";
import { Pet } from "@/lib/types";

type PetListProps = {
  pets: Pet[];
};

export default function PetList({ pets }: PetListProps) {
  return (
    <ul className="border-light border-b bg-white">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            className={
              "flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-[#EFF1F2] focus:bg-[#EFF1F2]"
            }
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="size-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
