import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
      handle: '@tanvi.styles',
      item: 'Minimal Co-ord Set in Almond'
    },
    {
      url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
      handle: '@rohan_deshmukh',
      item: 'Relaxed Fit Camp Shirt in Ecru'
    },
    {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
      handle: '@zoya.akhtar',
      item: 'Wide Leg Trousers in Castlerock'
    },
    {
      url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
      handle: '@aditya.k',
      item: 'Graphic Heavyweight Drop Tee'
    },
    {
      url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80',
      handle: '@meera.varma',
      item: 'Everyday Dress in Deep Olive'
    },
    {
      url: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=700&q=80',
      handle: '@vikram_s',
      item: 'Urban Cargo Pants in Matte Black'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-2">
              COMMUNITY LOOKBOOK
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase flex items-center gap-3">
              <span>@STYLEHUB</span>
              <Instagram size={22} className="opacity-80" />
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-1 font-normal">
              Styled by you. Tag @stylehub on Instagram with #WearStyleHub to get featured.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#111111] hover:text-[#6B6B6B] transition-colors"
          >
            <span>FOLLOW US</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 6-Photo Clean Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] overflow-hidden bg-[#E8E2D8] cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.item}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 text-white">
                <p className="text-xs font-bold">{img.handle}</p>
                <p className="text-[10px] text-neutral-300 line-clamp-1">{img.item}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
