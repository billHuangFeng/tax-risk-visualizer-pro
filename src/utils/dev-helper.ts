
/**
 * 项目启动指南
 * Project Setup Guide
 * 
 * 按照以下步骤操作:
 * Follow these steps:
 * 
 * 1. 安装依赖 (Install dependencies):
 *    npm install
 *    
 * 2. 如果遇到依赖冲突 (If you encounter dependency conflicts):
 *    npm install --legacy-peer-deps
 *    
 * 3. 启动开发服务器 (Start development server):
 *    - 使用 npm: npm run dev
 *    - 或者直接使用 npx: npx vite
 *    - 或者使用本地安装: ./node_modules/.bin/vite
 */

export const DEV_INSTRUCTIONS = {
  install: "npm install",
  installWithLegacy: "npm install --legacy-peer-deps",
  runDev: "npm run dev",
  runDevDirect: "npx vite",
  runDevLocal: "./node_modules/.bin/vite"
};

/**
 * 常见问题解决方案:
 * Common Troubleshooting:
 * 
 * 1. 确保Node.js版本 >= 18
 *    Ensure Node.js version >= 18
 * 
 * 2. 检查package.json中的scripts是否包含dev
 *    Check if package.json contains dev script
 * 
 * 3. 清除缓存:
 *    Clear cache:
 *    - npm cache clean --force
 *    - 删除node_modules目录
 *    - 重新安装依赖
 */

