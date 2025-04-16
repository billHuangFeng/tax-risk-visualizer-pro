
/**
 * 基于上传图片精确创建PDF模板
 */
export const createPdfTemplate = (data: any): string => {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const companyName = data.companyName || '测试科技有限公司';
  
  return `
    <div class="pdf-container" style="font-family: SimSun, serif; color: #000; width: 100%; padding: 40px; box-sizing: border-box; background-color: #ffffff;">
      <!-- 页眉部分 -->
      <div class="company-header" style="text-align: center; margin-bottom: 10px;">
        <h1 style="font-size: 18px; font-weight: normal; margin: 0 0 5px 0;">${companyName}</h1>
        <div style="font-size: 14px; margin: 0;">税务计算报告 - ${dateStr}</div>
      </div>
      
      <!-- 分隔线 -->
      <div class="header-separator" style="height: 1px; background-color: #000; margin-bottom: 20px;"></div>
      
      <!-- 使用说明框 -->
      <div class="instruction-box" style="border: 1px solid #000; padding: 20px; margin-bottom: 30px; text-align: center;">
        <div style="display: inline-block; margin-bottom: 10px;">
          <svg width="24" height="24" viewBox="0 0 24 24" style="display: inline-block;">
            <circle cx="12" cy="12" r="10" stroke="black" stroke-width="1" fill="none" />
            <text x="12" y="16" text-anchor="middle" style="font-size: 14px;">i</text>
          </svg>
        </div>
        <div style="margin-bottom: 5px;">使用说明</div>
        <div style="font-size: 14px;">
          本计算器用于评估企业所得税的潜在风险。数据仅供参考，请根据实际情况谨慎使用
        </div>
      </div>
      
      <!-- 基本信息部分 -->
      <div class="section">
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="width: 4px; height: 16px; background-color: #000; margin-right: 5px;"></div>
          <div style="font-size: 16px; font-weight: bold;">基本信息</div>
        </div>
        <div style="height: 1px; background-color: #000; margin-bottom: 15px;"></div>
        
        <!-- 企业名称 -->
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 5px;">企业名称：</div>
          <div style="border: 1px solid #000; padding: 8px;">${companyName}</div>
        </div>
        
        <!-- 是否享受研发费加计扣除 -->
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div style="min-width: 20px; height: 20px; border: 1px solid #000; margin-right: 8px; position: relative;">
            ${data.exemptBusiness === true ? '<span style="position: absolute; top: -3px; left: 3px;">✓</span>' : ''}
          </div>
          <div style="flex: 1;">
            是否享受研发费加计扣除优惠政策的企业？
            <div style="font-size: 12px; color: #333; padding-right: 20px;">
              以下企业不能享受研发费加计扣除政策：1. 烟草制造业、2. 住宿和餐饮业、3. 批发和零售业、4. 房地产业、5. 租赁和商务服务业、6. 娱乐业
            </div>
          </div>
        </div>
        
        <!-- 是否享受15%企业所得税优惠 -->
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div style="min-width: 20px; height: 20px; border: 1px solid #000; margin-right: 8px; position: relative;">
            ${data.isHighTechEnterprise === true ? '<span style="position: absolute; top: -3px; left: 3px;">✓</span>' : ''}
          </div>
          <div style="flex: 1;">
            是否享受15%企业所得税优惠的高新技术企业或其他企业？
          </div>
        </div>
        
        <!-- 资产总额 -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <div>资产总额：</div>
          <div style="text-align: right;">
            <div style="border: 1px solid #000; padding: 8px; display: inline-block; min-width: 150px; text-align: right;">
              ${formatNumber(data.totalAssets) || '2,000.00'}
            </div>
            <span style="margin-left: 5px;">万元</span>
          </div>
        </div>
        
        <!-- 员工人数 -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <div>发薪资、劳务费的员工人数：</div>
          <div style="text-align: right;">
            <div style="border: 1px solid #000; padding: 8px; display: inline-block; min-width: 150px; text-align: right;">
              ${formatNumber(data.employeeCount) || '25.00'}
            </div>
            <span style="margin-left: 5px;">人</span>
          </div>
        </div>
      </div>
      
      <!-- 销售收入部分 -->
      <div class="section" style="margin-top: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="width: 4px; height: 16px; background-color: #000; margin-right: 5px;"></div>
          <div style="font-size: 16px; font-weight: bold;">销售收入</div>
        </div>
        <div style="height: 1px; background-color: #000; margin-bottom: 15px;"></div>
        
        <!-- 销售收入表格 -->
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between;">
            <div>
              销售收入<br>
              <span style="font-size: 12px;">(不含增值税)</span>
            </div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.totalRevenue) || '1,000'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
        </div>
        
        <!-- 其中项目 -->
        <div style="margin-left: 30px; margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>其中：&nbsp;&nbsp;&nbsp;&nbsp;已开票</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.invoicedRevenue) || '800'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不需要的开票</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.nonInvoicedRevenue) || '100'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;需未开票的销售额</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.newInvoicedRevenue) || '100'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
        </div>
        
        <!-- 成本费用 -->
        <div style="margin-top: 30px;">
          <div style="display: flex; justify-content: space-between;">
            <div>
              成本费用<br>
              <span style="font-size: 12px;">(不含可抵扣进项税)</span>
            </div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.totalExpenses) || '800'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
        </div>
        
        <!-- 成本费用明细 -->
        <div style="margin-left: 30px; margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>其中：&nbsp;&nbsp;&nbsp;&nbsp;有发票的</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.invoicedExpenses) || '600'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;没有发票的</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.nonInvoicedExpenses) || '100'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已申报个人的薪资</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.personalTax) || '50'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;社保</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.socialSecurity) || '20'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资产的折旧/摊销</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.depreciation) || '20'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.otherExpenses) || '10'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
        </div>
      </div>
      
      <!-- 企业所得税前调增/调减 -->
      <div class="section" style="margin-top: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="width: 4px; height: 16px; background-color: #000; margin-right: 5px;"></div>
          <div style="font-size: 16px; font-weight: bold;">企业所得税前调增/调减</div>
        </div>
        <div style="height: 1px; background-color: #000; margin-bottom: 15px;"></div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div></div>
          <div style="text-align: center; margin-right: 220px;">-</div>
          <div style="margin-left: 5px; margin-right: 5px;">万元</div>
        </div>
        
        <!-- 调整表格 -->
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; border: 1px solid #000;">
          <tr style="background-color: #f8f8f8;">
            <th style="border: 1px solid #000; padding: 8px; text-align: center;">项目</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center;">实际发生</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center;">可抵扣</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center;">调增/调减</th>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: left;">可加计扣除的研发费用</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;">${formatNumber(data.rdExpenses) || ''}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: left;">超标准的业务招待费</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;">${formatNumber(data.entertainmentExpenses) || ''}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: left;">广告费和业务宣传费</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;">${formatNumber(data.advertisingExpenses) || ''}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: left;">职工教育经费</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;">${formatNumber(data.educationExpenses) || ''}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: left;">职工福利费</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;">${formatNumber(data.welfareExpenses) || ''}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: left;">补充养老保险和补充医疗保险支出</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;">${formatNumber(data.insuranceExpenses) || ''}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 8px; text-align: left;">没有发票不能税前扣除的费用</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;">${formatNumber(data.nonDeductibleExpenses) || ''}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
          </tr>
          <tr style="font-weight: bold;">
            <td style="border: 1px solid #000; padding: 8px; text-align: left;">小计</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: right;">${formatNumber(data.totalAdjustment) || ''}</td>
          </tr>
        </table>
      </div>
      
      <!-- 企业所得税 -->
      <div class="section" style="margin-top: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="width: 4px; height: 16px; background-color: #000; margin-right: 5px;"></div>
          <div style="font-size: 16px; font-weight: bold;">企业所得税</div>
        </div>
        <div style="height: 1px; background-color: #000; margin-bottom: 15px;"></div>
        
        <div style="margin-left: 30px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>应纳税所得额</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.taxableIncome) || '200'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>* 适用税率</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${data.taxRate || '25'}%
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;"></div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>理论应缴企业所得税</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.theoreticalTax) || '50'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>实际申报企业所得税</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.actualTax) || '30'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <div>风险差值 = | 理论应纳税额 - 实际申报税额 |</div>
            <div style="border: 1px solid #000; width: 300px; text-align: right;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; border-width: 0 1px 0 0;"></td>
                  <td style="border: 0; padding: 8px; text-align: right; width: 100px;">
                    ${formatNumber(data.riskValue) || '20'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="margin-left: 5px;">万元</div>
          </div>
        </div>
      </div>
      
      <!-- 税务风险评估 -->
      <div class="section" style="margin-top: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="width: 4px; height: 16px; background-color: #000; margin-right: 5px;"></div>
          <div style="font-size: 16px; font-weight: bold;">税务风险评估：</div>
        </div>
        <div style="height: 1px; background-color: #000; margin-bottom: 15px;"></div>
        
        <!-- 风险提示框 -->
        <div style="border: 1px solid #000; padding: 20px; margin-top: 10px;">
          <div style="font-weight: bold;">风险提示：</div>
          <div style="margin-top: 10px; min-height: 60px;">
            ${data.riskPercentage < 30 ? '您的企业所得税风险较低。' : 
              data.riskPercentage < 70 ? '您的企业所得税风险中等，请关注可能存在的问题。' : 
              '您的企业所得税风险较高，建议尽快咨询专业税务顾问。'}
          </div>
        </div>
      </div>
    </div>
  `;
};

// 按照图片中的样式格式化数字
const formatNumber = (value: any): string => {
  if (!value) return '';
  
  try {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) return '';
    
    // 使用中文区域设置格式化数字，保留两位小数
    return num.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (e) {
    console.error('Number formatting error:', e);
    return value?.toString() || '';
  }
};
