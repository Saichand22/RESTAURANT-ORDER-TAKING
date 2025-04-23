import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, Gusto began as a small family-owned restaurant with a passion for creating 
              authentic, memorable dining experiences. Our founder, Chef Maria Rossi, brought recipes from 
              her grandmother's kitchen and reimagined them with modern techniques.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we've grown in size but remained true to our roots - using locally sourced, 
              seasonal ingredients to create dishes that delight the senses and bring people together.
            </p>
            <p className="text-gray-600">
              Today, Gusto is an award-winning establishment known for its exceptional cuisine, 
              warm atmosphere, and outstanding service. Whether dining in our restaurant or 
              enjoying our food at home, we aim to make every meal special.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">13</div>
                <div className="text-gray-600 text-sm">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
                <div className="text-gray-600 text-sm">Menu Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">10k+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Restaurant interior" 
                className="rounded-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Chef preparing food" 
                className="rounded-lg h-64 w-full object-cover"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img 
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Restaurant dish" 
                className="rounded-lg h-64 w-full object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/5379707/pexels-photo-5379707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Fresh ingredients" 
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;