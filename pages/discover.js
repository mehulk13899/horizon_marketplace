import TrendingArea from '../components/Common/TrendingArea';
// import NavbarTwo from '../components/Layout/NavbarTwo';
// import TopSeller from '../components/Common/TopSeller';
// import AuctionAreaNew from '../components/Auction/AuctionAreaNew';
// import FeaturedArea from '../components/Common/FeaturedArea';
// import Testimonial from '../components/Common/Testimonial';
// import AuthorArea from '../components/HomeTwo/AuthorArea'
// import BlogArea from '../components/Common/BlogArea';
// import CollectionsArea from '../components/Common/CollectionsArea';
// import baseUrl from "../utils/baseUrl";
// import BannerArea from '../components/HomeTwo/BannerArea';

import AuctionArea from '../components/Auction/AuctionArea';
import Layout from "../components/Layout/Layout";
import { useCollectionsTrending } from '../hooks/Web2/useCollections';
import { useNftTreandingArtwork } from '../hooks/Web2/useNftOfCollection';

const Index = ({ }) => {
    // const { data: collections, loading: collection_loading } = useCollectionsTrending();
    const { data: nfts, loading: nfts_loading } = useNftTreandingArtwork()
    return (
        <Layout>
            <TrendingArea trendingData={nfts} />
            <AuctionArea />
            {/* <TopSeller /> */}
            {/* <Testimonial /> */}
            {/* <BlogArea /> */}
            {/* <CollectionsArea /> */}

        </Layout>
    );
};

export async function getServerSideProps(context) {
    // const collection = await fetch(`${baseUrl}/collection`);
    // const collection_data = await collection.json();

    // const nfts = await fetch(`${baseUrl}/nfts?limit=10`);
    // const nfts_data = await nfts.json();
    // console.log(nfts)
    // return {
    //     props: { collection_data, nfts_data }, // will be passed to the page component as props
    // };
}

export default Index;
