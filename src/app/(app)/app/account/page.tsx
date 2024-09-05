import ContentBlock from "@/components/page-ui/content-block";

export default async function Page() {
  return (
    <main>
      <h1 className="my-8 text-white">Your Account</h1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-3">
        <p>Logged in as Mimo</p>
      </ContentBlock>
    </main>
  );
}
