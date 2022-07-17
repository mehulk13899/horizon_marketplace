import TrendingArea from '../components/Common/TrendingArea';
import BannerArea from '../components/HomeTwo/BannerArea';
import TopSeller from '../components/Common/TopSeller';
import AuctionArea from '../components/Auction/AuctionArea';
import Layout from "../components/Layout/Layout";
import TrendingCollection from '../components/Common/TrendingCollection';

const Index = ({ }) => {
    return (
        <Layout>

            <BannerArea></BannerArea>

            <TrendingArea />

            <TopSeller />

            <TrendingCollection />

            <AuctionArea />


        </Layout>
    );
};

export default Index;
