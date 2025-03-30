const ServicesSection = () => {
  return (
    <section
      id="services"
      className="sm:min-h-screen flex flex-col p-12 py-6 pb-20 sm:pb-auto sm:p-20 gap-10 text-white"
    >
      <h1 className="text-3xl sm:text-6xl font-bold">Services</h1>
      <div className="flex flex-col justify-between sm:flex-row gap-10 sm:gap-40 text-xl">
        <div>
          <h3 className="text-5xl mb-5">Consulting</h3>
          <ul className="text-sm sm:text-xl">
            <li>Brand Strategy</li>
            <li>Creative Development and Direction</li>
            <li>Research and Insight</li>
          </ul>
        </div>
        <div>
          <h3 className="text-5xl mb-5">Production</h3>
          <ul className="text-sm sm:text-xl">
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
          <h3 className="text-5xl mb-5">Experiences</h3>
          <ul className="text-sm sm:text-xl">
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
