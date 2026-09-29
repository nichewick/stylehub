import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { CampaignSection } from '../components/CampaignSection';
import { BrandStatement } from '../components/BrandStatement';
import { BrandStory } from '../components/BrandStory';
import { ReviewsSection } from '../components/ReviewsSection';
import { InstagramFeed } from '../components/InstagramFeed';
import { Newsletter } from '../components/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <CampaignSection />
      <BrandStatement />
      <BrandStory />
      <ReviewsSection />
      <InstagramFeed />
      <Newsletter />
    </main>
  );
};
