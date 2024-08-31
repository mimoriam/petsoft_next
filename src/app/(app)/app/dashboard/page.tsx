import Branding from "@/components/page-ui/branding";
import Stats from "@/components/page-ui/stats";
import ContentBlock from "@/components/page-ui/content-block";
import SearchForm from "@/components/page-ui/search-form";
import PetList from "@/components/page-ui/pet-list";

export default async function Page() {
  const res = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
  );

  if (!res.ok) {
    throw new Error("Could not fetch pets!");
  }

  const data = await res.json();

  console.log(data);
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />

        <Stats />
      </div>

      <div className="grid grid-rows-[45px_300px_500px] gap-4 md:h-[600px] md:grid-cols-3 md:grid-rows-[45px_1fr]">
        <div className="md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1">
          <SearchForm />
        </div>

        <div className="relative md:col-span-1 md:col-start-1 md:row-span-full md:row-start-2">
          <ContentBlock>
            <PetList pets={data} />

            <div className="absolute bottom-4 right-4">
              {/* <PetButton actionType="add" /> */}
            </div>
          </ContentBlock>
        </div>

        <div className="md:col-span-full md:col-start-2 md:row-span-full md:row-start-1">
          <ContentBlock>{/*  <PetDetails /> */}p</ContentBlock>
        </div>
      </div>
    </main>
  );
}
