
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RevenueExpensesProps {
  totalRevenue: string;
  setTotalRevenue: (value: string) => void;
  invoicedRevenue: string;
  setInvoicedRevenue: (value: string) => void;
  nonInvoicedRevenue: string;
  setNonInvoicedRevenue: (value: string) => void;
  newInvoicedRevenue: string;
  setNewInvoicedRevenue: (value: string) => void;
  totalExpenses: string;
  setTotalExpenses: (value: string) => void;
  invoicedExpenses: string;
  setInvoicedExpenses: (value: string) => void;
  nonInvoicedExpenses: string;
  setNonInvoicedExpenses: (value: string) => void;
  personalTax: string;
  setPersonalTax: (value: string) => void;
  socialSecurity: string;
  setSocialSecurity: (value: string) => void;
  depreciation: string;
  setDepreciation: (value: string) => void;
  otherExpenses: string;
  setOtherExpenses: (value: string) => void;
}

const RevenueExpenses: React.FC<RevenueExpensesProps> = ({
  totalRevenue,
  setTotalRevenue,
  invoicedRevenue,
  setInvoicedRevenue,
  nonInvoicedRevenue,
  setNonInvoicedRevenue,
  newInvoicedRevenue,
  setNewInvoicedRevenue,
  totalExpenses,
  setTotalExpenses,
  invoicedExpenses,
  setInvoicedExpenses,
  nonInvoicedExpenses,
  setNonInvoicedExpenses,
  personalTax,
  setPersonalTax,
  socialSecurity,
  setSocialSecurity,
  depreciation,
  setDepreciation,
  otherExpenses,
  setOtherExpenses,
}) => {
  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">销售收入（不含销项税）</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div className="md:col-span-2"></div>
          <div className="md:col-span-3"></div>
          <div className="md:col-span-1 flex items-center">
            <div className="w-36">
              <Input
                type="number"
                value={totalRevenue}
                onChange={(e) => setTotalRevenue(e.target.value)}
                className="text-right w-full"
              />
            </div>
            <span className="ml-2">万元</span>
          </div>
        </div>
        
        <div className="pl-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1 text-right font-medium">其中：</div>
            <div className="md:col-span-1">已开票</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={invoicedRevenue}
                  onChange={(e) => setInvoicedRevenue(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-1">不需要的开票</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={nonInvoicedRevenue}
                  onChange={(e) => setNonInvoicedRevenue(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-1">暂未开票的销售额</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={newInvoicedRevenue}
                  onChange={(e) => setNewInvoicedRevenue(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">成本费用（不含可抵扣进项税）</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div className="md:col-span-2"></div>
          <div className="md:col-span-3"></div>
          <div className="md:col-span-1 flex items-center">
            <div className="w-36">
              <Input
                type="number"
                value={totalExpenses}
                onChange={(e) => setTotalExpenses(e.target.value)}
                className="text-right w-full"
              />
            </div>
            <span className="ml-2">万元</span>
          </div>
        </div>
        
        <div className="pl-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1 text-right font-medium">其中：</div>
            <div className="md:col-span-1">有发票的</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={invoicedExpenses}
                  onChange={(e) => setInvoicedExpenses(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-1">没有发票的</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={nonInvoicedExpenses}
                  onChange={(e) => setNonInvoicedExpenses(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-1">已申报个税的薪资</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={personalTax}
                  onChange={(e) => setPersonalTax(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-1">社保</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={socialSecurity}
                  onChange={(e) => setSocialSecurity(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-1">资产的折旧/摊销</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={depreciation}
                  onChange={(e) => setDepreciation(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-1">其他</div>
            <div className="md:col-span-3"></div>
            <div className="md:col-span-1 flex items-center">
              <div className="w-36">
                <Input
                  type="number"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(e.target.value)}
                  className="text-right w-full"
                />
              </div>
              <span className="ml-2">万元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueExpenses;
