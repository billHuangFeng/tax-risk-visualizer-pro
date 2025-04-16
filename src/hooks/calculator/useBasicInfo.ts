
import { useState } from 'react';

// 测试数据 - 上线前请删除
const TEST_MODE = true; // 上线前设置为 false
const TEST_DATA = {
  companyName: '测试科技有限公司',
  totalAssets: '2000',
  employeeCount: '25',
  isExcludedIndustry: false,
  isHighTechEnterprise: true
};

export const useBasicInfo = () => {
  const [companyName, setCompanyName] = useState(TEST_MODE ? TEST_DATA.companyName : '');
  const [isExcludedIndustry, setIsExcludedIndustry] = useState(TEST_MODE ? TEST_DATA.isExcludedIndustry : false);
  const [isHighTechEnterprise, setIsHighTechEnterprise] = useState(TEST_MODE ? TEST_DATA.isHighTechEnterprise : false);
  const [totalAssets, setTotalAssets] = useState(TEST_MODE ? TEST_DATA.totalAssets : '');
  const [employeeCount, setEmployeeCount] = useState(TEST_MODE ? TEST_DATA.employeeCount : '');

  return {
    companyName,
    setCompanyName,
    isExcludedIndustry,
    setIsExcludedIndustry,
    isHighTechEnterprise,
    setIsHighTechEnterprise,
    totalAssets,
    setTotalAssets,
    employeeCount,
    setEmployeeCount,
  };
};
