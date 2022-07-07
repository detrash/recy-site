import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          <div className="text-sm text-gray-600 mr-4">
            ©2021 DETRASH |{' '}
            <a className="text-primary" href="mailto:phil@detrashtoken.com">
              phil@detrashtoken.com
            </a>{' '}
            | Bahia, Brazil | +5571982640517
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
