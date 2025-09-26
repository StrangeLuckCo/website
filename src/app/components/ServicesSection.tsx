const ServicesSection = () => {
  return (
    <section
      id="services"
      className="section-snap sm:min-h-screen flex flex-col py-24 gap-y-20 gap-x-10 text-center sm:text-left container-x"
    >
      <h1 className="sl-h1 sl-h1-mobile sl-h1-tablet blur-sm">
        Services
      </h1>
      <div className="flex flex-col justify-between sm:flex-row gap-10 sm:gap-12 md:gap-20">
        <div>
          <h2 className="sl-h2 sl-h2-mobile sl-h2-tablet blur-sm sm:blur-xs sm:leading-none mb-5">
            Consulting
          </h2>
          <ul className="sl-h5-mobile sl-h5-tablet sl-list-item blur-xs sm:blur-xxs">
            <li>Brand Strategy</li>
            <li>Creative Development and Direction</li>
            <li>Research and Insight</li>
          </ul>
        </div>
        <div>
          <h2 className="sl-h2 sl-h2-mobile sl-h2-tablet blur-sm sm:blur-xs sm:leading-none mb-5">
            Production
          </h2>
          <ul className="sl-h5-mobile sl-h5-tablet sl-list-item blur-xs sm:blur-xxs">
            <li>Audio Podcast Production</li>
            <li>Brand Identity and Graphic Design</li>
            <li>Commercial</li>
            <li>Content Creation</li>
            <li>Documentary</li>
            <li>Music Videos</li>
            <li>Photography</li>
            <li>Post-Production</li>
          </ul>
        </div>
        <div>
          <h2 className="sl-h2 sl-h2-mobile sl-h2-tablet blur-sm sm:blur-xs sm:leading-none mb-5">
            Experiences
          </h2>
          <ul className="sl-h5-mobile sl-h5-tablet sl-list-item blur-xs sm:blur-xxs">
            <li>Curation and Exhibition</li>
            <li>Immersive Media</li>
            <li>Social and Cultural Campaigns</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
