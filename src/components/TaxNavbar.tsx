
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, TrendingUp } from 'lucide-react';

const TaxNavbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 mb-4">
      <div className="container flex items-center space-x-4 py-3">
        <Link 
          to="/" 
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isActive('/') 
              ? 'bg-tax-blue text-white' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <Calculator className="h-5 w-5" />
          <span className="font-medium">企业所得税</span>
        </Link>
        <Link 
          to="/vat" 
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isActive('/vat') 
              ? 'bg-tax-blue text-white' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">增值税</span>
        </Link>
      </div>
    </nav>
  );
};

export default TaxNavbar;
