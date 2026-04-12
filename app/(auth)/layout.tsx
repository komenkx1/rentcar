import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background decoration elements for Mobile */}
      <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-primary/5 blur-3xl pointer-events-none lg:hidden" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-secondary/5 blur-3xl pointer-events-none lg:hidden" />

      {/* Left Column (Image Hero Desktop Only) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-surface-container overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbl-IFVuzfL75kxtcXsTxhZB_2IaZRXmR8_xb4SdFO8SahW83AeugJJwtXYUCc_cXlM8xe1tjZ6le_prvMQCc03MsC_sykfUlmds69pXczh6C5mhqcBN4xEOXOMwbznZW6JErcnf99jE9rorjH8L2p5gcNgVleE1Fek7j7UJRdG2wHZhllphsGsR28-mKbnAMQsqtFOLI06ES7-1VrTOxEvDPE-YPssYhOjLJCk_aYe7ZBqf76xhFT268XnbXO9S0s3Drl8uMwfAw"
          alt="Premium Car"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 0vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <h2 className="text-white font-headline font-black text-4xl mb-4 leading-tight">Perjalanan Mewah<br/>Dimulai Dari Sini.</h2>
          <p className="text-white/80 font-medium max-w-md leading-relaxed">Bergabunglah dengan ribuan pengguna lainnya yang telah mempercayakan perjalanan mereka bersama layanan premium kami.</p>
        </div>
      </div>

      {/* Right Column (Form Container) */}
      <main className="w-full lg:w-1/2 max-w-md lg:max-w-xl mx-auto px-6 py-12 lg:px-24 relative z-10 flex flex-col justify-center min-h-[100dvh]">
        {/* Brand logo */}
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 mb-12 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold shadow-md">
            r
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-on-surface">rentCars</span>
        </Link>
        
        {children}
      </main>
    </div>
  );
}
