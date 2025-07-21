import BirthdayMusicPlayer from "@/components/features/card/musicPlayerCard";
import { Layout } from "@/components/layouts/base";
import { Hero } from "@/components/sections/hero";
import { Letter } from "@/components/sections/letter";
import { Message } from "@/components/sections/message";
import { Moment } from "@/components/sections/moment";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Message />
      <Letter />
      <Moment />
      <div className="md:hidden">
        <BirthdayMusicPlayer />
      </div>
    </Layout>
  );
}
