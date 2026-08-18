import VerifyHero from "../sections/verify/VerifyHero";
import VerifyActions from "../sections/verify/VerifyActions";

export default function VerifyEmail() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0d071a]">
      <VerifyHero />
      <VerifyActions />
    </main>
  );
}