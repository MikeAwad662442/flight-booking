import FlightInfo from "@/components/www/flight/FlightInfo";

/*******************************
 * @author: Mike Awad
 * @description: Flight ID
 * =====================
 *******************************/
type PageProps = {
  params: { id: string };
};

const FlightIdPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <section className="mx-auto mt-16 flex w-[80%] flex-col items-center justify-center">
      <FlightInfo id={id} />
    </section>
  );
};

export default FlightIdPage;
