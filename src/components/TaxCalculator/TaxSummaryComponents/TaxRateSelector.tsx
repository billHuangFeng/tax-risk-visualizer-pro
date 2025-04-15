
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface TaxRateSelectorProps {
  taxRate: string;
  setTaxRate: (value: string) => void;
}

const TaxRateSelector: React.FC<TaxRateSelectorProps> = ({ taxRate, setTaxRate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
      <div className="md:col-span-1 font-medium">× 适用税率</div>
      <div className="md:col-span-1">
        <Select value={taxRate} onValueChange={setTaxRate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择税率" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25%</SelectItem>
            <SelectItem value="15">15%</SelectItem>
            <SelectItem value="5">5%</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-3"></div>
      <div className="md:col-span-1 flex items-center">
        <div className="w-[16rem]">
          <Input
            type="text"
            value={`${taxRate}%`}
            readOnly
            className="text-right font-bold w-full"
          />
        </div>
        <span className="ml-2 whitespace-nowrap"></span>
      </div>
    </div>
  );
};

export default TaxRateSelector;
