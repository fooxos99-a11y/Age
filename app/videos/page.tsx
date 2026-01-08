import { PageBackground } from "@/components/page-background"
import { Header } from "@/components/header"

export default function VideosPage() {
  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ backgroundImage: "url('/textures/bg-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div className="relative z-10 max-w-6xl mx-auto py-8 px-6">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <h1 className="text-5xl font-bold text-foreground mb-4">الفيديوهات</h1>
          <p className="text-xl text-muted-foreground">قريباً...</p>
        </div>
      </div>
    </div>
  );
}