import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F5F1] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-2">
            COMMUNITY VOICES
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase">
            LOVED BY THE STYLE COMMUNITY
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#111111]">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-[#111111] text-[#111111]" />
              ))}
            </div>
            <span className="font-bold text-sm">4.8 / 5.0</span>
            <span className="text-[#6B6B6B]">· Over 2,400 verified reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFFFF] p-6 sm:p-7 border border-[#111111]/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#111111] text-[#111111]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#6B6B6B] uppercase tracking-wider">{review.date}</span>
                </div>

                <p className="text-sm text-[#111111] font-normal leading-relaxed italic">
                  “{review.comment}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#111111]/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    {review.author}
                  </h4>
                  <span className="text-[11px] text-[#6B6B6B]">{review.city}, India</span>
                </div>
                {review.verifiedBuyer && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#111111] uppercase font-semibold">
                    <CheckCircle size={12} className="text-emerald-600" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
