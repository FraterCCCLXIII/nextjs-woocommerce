"use client";

import { useState } from 'react';
import { cleanHtmlFromText } from '@/utils/functions/productUtils';

interface ProductDetailTabsProps {
  product: {
    description?: string;
    metadata?: {
      description?: string;
      coa?: string;
      research?: string;
    } | string;
  };
}

const ProductDetailTabs = ({ product }: ProductDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'coa' | 'research'>(
    'description'
  );

  // Get content from product metadata
  let metadata: Record<string, any> = {};
  try {
    if (product?.metadata) {
      if (typeof product.metadata === 'string') {
        try {
          metadata = JSON.parse(product.metadata);
        } catch {
          metadata = {};
        }
      } else if (
        typeof product.metadata === 'object' &&
        product.metadata !== null
      ) {
        metadata = product.metadata as Record<string, any>;
      }
    }
  } catch (error) {
    console.error('Error parsing product metadata:', error);
    metadata = {};
  }

  const description = cleanHtmlFromText(metadata?.description || product.description || '');
  const coa = cleanHtmlFromText(metadata?.coa || '');
  const research = cleanHtmlFromText(metadata?.research || '');

  const tabs = [
    { id: 'description' as const, label: 'Description' },
    { id: 'coa' as const, label: 'COA' },
    { id: 'research' as const, label: 'Research' },
  ];

  const getActiveContent = () => {
    switch (activeTab) {
      case 'description':
        return description;
      case 'coa':
        return coa;
      case 'research':
        return research;
      default:
        return '';
    }
  };

  const activeContent = getActiveContent();

  return (
    <div className="w-full mt-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Product detail tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors rounded-none
                ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="prose prose-sm max-w-none">
        {activeContent ? (
          <div className="product-detail-content whitespace-pre-line">
            {activeContent}
          </div>
        ) : (
          <p className="text-gray-500">No content available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailTabs;

