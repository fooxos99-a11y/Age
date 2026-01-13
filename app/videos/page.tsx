import { PageBackground } from "@/components/page-background"
import { Header } from "@/components/header"

export default function VideosPage() {
  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ backgroundImage: "url('/textures/bg-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div className="relative z-10 max-w-2xl md:max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 text-center">الفيديوهات</h1>
          <p className="text-base sm:text-xl text-muted-foreground text-center">قريباً...</p>
        </div>
      </div>
    </div>
  );
}
