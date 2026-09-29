import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [genderTab, setGenderTab] = useState<'men' | 'women'>('men');

  if (!isSizeGuideOpen) return null;

  const menSizes = [
    { size: 'XS', chest: '88 - 92', waist: '72 - 76', hip: '88 - 92', length: '68' },
    { size: 'S', chest: '94 - 98', waist: '78 - 82', hip: '94 - 98', length: '70' },
    { size: 'M', chest: '100 - 104', waist: '84 - 88', hip: '100 - 104', length: '72' },
    { size: 'L', chest: '106 - 110', waist: '90 - 94', hip: '106 - 110', length: '74' },
    { size: 'XL', chest: '112 - 116', waist: '96 - 100', hip: '112 - 116', length: '76' },
    { size: 'XXL', chest: '118 - 122', waist: '102 - 106', hip: '118 - 122', length: '78' },
    { size: '3XL', chest: '124 - 128', waist: '108 - 112', hip: '124 - 128', length: '80' },
  ];

  const womenSizes = [
    { size: 'XS', chest: '80 - 84', waist: '62 - 66', hip: '86 - 90', length: '62' },
    { size: 'S', chest: '86 - 90', waist: '68 - 72', hip: '92 - 96', length: '64' },
    { size: 'M', chest: '92 - 96', waist: '74 - 78', hip: '98 - 102', length: '66' },
    { size: 'L', chest: '98 - 102', waist: '80 - 84', hip: '104 - 108', length: '68' },
    { size: 'XL', chest: '104 - 108', waist: '86 - 90', hip: '110 - 114', length: '70' },
    { size: 'XXL', chest: '110 - 114', waist: '92 - 96', hip: '116 - 120', length: '72' },
  ];

  const currentTable = genderTab === 'men' ? menSizes : womenSizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FFFFFF] w-full max-w-2xl border border-[#111111]/15 p-6 sm:p-8 z-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#111111]/10">
          <div className="flex items-center gap-2.5">
            <Ruler size={19} />
            <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight uppercase text-[#111111]">
              SIZE GUIDE
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-neutral-500 hover:text-black cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 my-5">
          <button
            onClick={() => setGenderTab('men')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              genderTab === 'men'
                ? 'bg-[#111111] text-white'
                : 'bg-[#F7F5F1] text-neutral-600 hover:text-black'
            }`}
          >
            Men’s Sizing (cm)
          </button>
          <button
            onClick={() => setGenderTab('women')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              genderTab === 'women'
                ? 'bg-[#111111] text-white'
                : 'bg-[#F7F5F1] text-neutral-600 hover:text-black'
            }`}
          >
            Women’s Sizing (cm)
          </button>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-[#111111]/10 mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F1] border-b border-[#111111]/10 uppercase tracking-widest text-[#111111] font-bold">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest (cm)</th>
                <th className="py-3 px-4">Waist (cm)</th>
                <th className="py-3 px-4">Hip (cm)</th>
                <th className="py-3 px-4">Length (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111]/5 tabular-nums">
              {currentTable.map((row) => (
                <tr key={row.size} className="hover:bg-[#F7F5F1]/50">
                  <td className="py-3 px-4 font-bold text-[#111111]">{row.size}</td>
                  <td className="py-3 px-4 text-[#6B6B6B]">{row.chest}</td>
                  <td className="py-3 px-4 text-[#6B6B6B]">{row.waist}</td>
                  <td className="py-3 px-4 text-[#6B6B6B]">{row.hip}</td>
                  <td className="py-3 px-4 text-[#6B6B6B]">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Advice Notice */}
        <div className="p-4 bg-[#F7F5F1] border-l-2 border-[#111111] text-xs text-[#111111] space-y-1">
          <p className="font-semibold uppercase tracking-wider">FIT RECOMMENDATION:</p>
          <p className="text-[#6B6B6B]">
            All Style Hub garments are cut for contemporary everyday drape. If you’re between sizes or prefer an intentionally relaxed, streetwear-oversized silhouette, we recommend choosing the larger size.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};
