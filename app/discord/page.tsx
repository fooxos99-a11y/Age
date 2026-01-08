import { PageBackground } from "@/components/page-background"
import { Header } from "@/components/header"

export default function DiscordPage() {
  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ backgroundImage: "url('/textures/bg-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div className="relative z-10 max-w-6xl mx-auto py-8 px-6">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="text-4xl font-bold text-foreground mb-2">انضم إلى مجتمع Age of arabia</div>
            <a 
              href='https://discord.gg/hEUK3rMW6g' 
              className='text-blue-500 hover:text-blue-400 text-2xl font-semibold transition-colors'
            >
              انضم الآن
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}