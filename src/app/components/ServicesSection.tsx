const ServicesSection = () => {
  return (
    <section
      id="services"
      className="sm:min-h-screen flex flex-col p-12 py-20 sm:pb-auto sm:p-20 gap-10 text-center sm:text-left"
    >
      <h1 className="text-3xl desktop-title sl-h1-mobile blur-md sm:mt-20">
        Services
      </h1>
      <div className="flex flex-col justify-between sm:flex-row sm:font-normal gap-10 sm:gap-12 md:gap-20 text-xl">
        <div>
          <h2 className="text-4xl sm:leading-none mb-5 sl-h2 sl-h2-mobile sl-h2-tablet blur-sm">
            Consulting
          </h2>
          <ul className="text-sm sl-list-item sl-h5-mobile sl-h5-tablet blur-xxs">
            <li>Brand Strategy</li>
            <li>Creative Development and Direction</li>
            <li>Research and Insight</li>
          </ul>
        </div>
        <div>
          <h2 className="text-4xl sm:leading-none mb-5 sl-h2 sl-h2-mobile sl-h2-tablet blur-sm">
            Production
          </h2>
          <ul className="text-sm sl-list-item sl-h5-mobile sl-h5-tablet blur-xxs">
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
          <h2 className="text-4xl sm:leading-none mb-5 sl-h2 sl-h2-mobile sl-h2-tablet blur-sm">
            Experiences
          </h2>
          <ul className="text-sm sl-list-item sl-h5-mobile sl-h5-tablet blur-xxs">
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
