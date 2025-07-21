import MusicPlayer from "@/components/features/card/musicPlayerCard";
import { Gallery } from "../features/gallery/gallery";
import { mediaItems } from "@/data/gallery";

export const Moment = () => {
  return (
    <div className="mt-10 mb-74 scroll-mt-10 md:block hidden" id="moments">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-2xl mb-4 font-semibold">Moment</h1>
        <div className="w-md text-center">
          <p>Our Moments 🌸</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
        <div>
          <MusicPlayer />
        </div>
        <div>
          <Gallery items={mediaItems} />
        </div>
      </div>
    </div>
  );
};
