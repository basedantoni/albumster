import dynamic from 'next/dynamic';

import Albums from "@/components/albums";

const Scene = dynamic(() => import("@/components/scene"), { ssr: false });


const Home = async () => {
  return (
    <div>
      <Scene>
        <Albums />
      </Scene>
    </div>
  );
};

export default Home;
