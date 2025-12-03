import Header from "../app/components/ui/Header";
import FineTuningUsageCard from "../app/components/ui/FineTuningUsageCard";
import GetStartedCard from "../app/components/ui/GetStartedCard";


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FineTuningUsageCard />
          <GetStartedCard />
        </div>
      </section>
    </main>
  );
}