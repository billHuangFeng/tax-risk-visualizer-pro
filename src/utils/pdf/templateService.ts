
/**
 * 创建与参考图片完全一致的PDF模板
 */
export const createPdfTemplate = (data: any): string => {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const companyName = data.companyName || '测试科技有限公司';
  
  return `
    <div style="font-family: SimSun, serif; color: #000; width: 100%; max-width: 210mm;">
      <!-- 页眉 -->
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 18px; font-weight: normal; margin: 0;">${companyName}</h1>
        <p style="font-size: 14px; margin: 5px 0;">税务计算报告 - ${dateStr}</p>
      </div>
      
      <!-- 分隔线 -->
      <div style="height: 1px; background-color: #000; margin-bottom: 30px;"></div>
      
      <!-- 使用说明框 -->
      <div style="border: 1px solid #000; border-radius: 5px; padding: 20px; margin-bottom: 30px; text-align: center;">
        <div style="display: inline-block; border: 1px solid #000; border-radius: 50%; width: 20px; height: 20px; line-height: 20px; margin-bottom: 10px;">i</div>
        <div style="margin-bottom: 5px; font-weight: bold;">使用说明</div>
        <div style="font-size: 14px; text-align: center;">
          本计算器用于评估企业所得税的潜在风险，数据仅供参考，请根据实际情况谨慎使用
        </div>
      </div>
      
      <!-- 基本信息部分 -->
      <div style="margin-bottom: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 3px; height: 16px; background-color: #000; margin-right: 5px;"></div>
          <div style="font-size: 16px; font-weight: bold;">基本信息</div>
        </div>
        <div style="height: 1px; background-color: #000; margin-bottom: 20px;"></div>
        
        <!-- 企业名称 -->
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">企业名称：</div>
          <div style="border: 1px solid #000; padding: 8px; margin-bottom: 5px;">${companyName}</div>
        </div>
        
        <!-- 是否享受研发费加计扣除 -->
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div style="min-width: 20px; height: 20px; border: 1px solid #000; margin-right: 8px; ${data.exemptBusiness === true ? 'position: relative;' : ''}">
            ${data.exemptBusiness === true ? '<span style="position: absolute; top: -3px; left: 3px;">✓</span>' : ''}
          </div>
          <div style="flex: 1;">
            是否享受研发费加计扣除优惠政策的企业？
            <div style="text-align: right; padding-right: 20px;">
              以下企业不能享受受研发费加计扣除政策：1. 烟草制造业、2. 住宿和餐饮业、3. 批发和零售业、4. 房地产业、5. 租赁和商务服务业、6. 娱乐业
            </div>
          </div>
        </div>
        
        <!-- 是否享受15%企业所得税优惠 -->
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div style="min-width: 20px; height: 20px; border: 1px solid #000; margin-right: 8px; ${data.isHighTechEnterprise === true ? 'position: relative;' : ''}">
            ${data.isHighTechEnterprise === true ? '<span style="position: absolute; top: -3px; left: 3px;">✓</span>' : ''}
          </div>
          <div style="flex: 1;">
            是否享受15%企业所得税优惠的高新技术企业或其他企业？
          </div>
        </div>
        
        <!-- 资产总额 -->
        <div style="display: flex; margin-bottom: 15px;">
          <div style="flex: 1;">资产总额：</div>
          <div style="flex: 1; text-align: right;">
            <div style="border: 1px solid #000; padding: 8px; display: inline-block; min-width: 150px; text-align: right;">
              ${formatNumber(data.totalAssets) || '2000'}
            </div>
            <span style="margin-left: 5px;">万元</span>
          </div>
        </div>
        
        <!-- 员工人数 -->
        <div style="display: flex; margin-bottom: 15px;">
          <div style="flex: 1;">发薪资、劳务费的员工人数：</div>
          <div style="flex: 1; text-align: right;">
            <div style="border: 1px solid #000; padding: 8px; display: inline-block; min-width: 150px; text-align: right;">
              ${formatNumber(data.employeeCount) || '25'}
            </div>
            <span style="margin-left: 5px;">人</span>
          </div>
        </div>
      </div>
      
      <!-- 销售收入部分 -->
      <div style="margin-bottom: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <div style="width: 3px; height: 16px; background-color: #000; margin-right: 5px;"></div>
          <div style="font-size: 16px; font-weight: bold;">销售收入</div>
        </div>
        <div style="height: 1px; background-color: #000; margin-bottom: 20px;"></div>
        
        <!-- 销售收入（不含增值税） -->
        <div style="display: flex; margin-bottom: 15px;">
          <div style="flex: 1;">
            销售收入<br>
            <span style="font-size: 12px;">(不含增值税)</span>
          </div>
          <div style="flex: 1; text-align: right;">
            <table style="border-collapse: collapse; width: 200px; float: right;">
              <tr>
                <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #000; padding: 8px; text-align: right; width: 100px;">
                  ${formatNumber(data.totalRevenue) || '1000'}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
};

// 格式化数字为千分位显示
const formatNumber = (value: any): string => {
  if (!value) return '';
  
  try {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) return '';
    
    // 固定两位小数并格式化为千分位
    return num.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (e) {
    console.error('Number formatting error:', e);
    return value?.toString() || '';
  }
};
