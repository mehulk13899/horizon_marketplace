import TeamArea from '../components/Common/TeamArea';
import Testimonial from '../components/Common/Testimonial';
import InvolvedArea from '../components/Common/InvolvedArea';

const Team = () => {
  return (
    <>
      {/* <PageBanner
        bannerHeading='Our Team'
        parentTitle='Pages'
        pageTitle='Team'
        bg='inner-bg2'
      /> */}
      <TeamArea/>
      <Testimonial/>
      <InvolvedArea />
    </>
  );
};

export default Team;
