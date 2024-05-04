# 去中心化店铺

## 介绍

技术栈：Solidity+Hardhat+ethers.js+react.js+antd

用户可以点击商品购买，合约部署者在购买页面有个管理后台按钮，可以点击进入。后台包括对商品销售情况分析、商品管理，用户管理等。可以添加商品，可以点击提现，从智能合约提取货币。

## 运行

### 克隆仓库

### 安装依赖

`$ npm install`

###  配置环境变量

`

#前往alchemy获取相关api

ALCHEMY_API_KEY = ''  

PRIVATE_KEY = ''

#配置合约地址，这个要等下一步合约成功部署后获得。

REACT_APP_CONTRACTS_ADDRESS = '0x383EA6F278709B33AbF4be3bb5Ce9514C779512D'

`

### 部署合约

localhost替换成对应的网络

`$ npx hardhat run ./scripts/deploy.js --network localhost`

### 启动项目

`$ npm run start`

## 相关截图

![image-20240504150053697](.\static\image-20240504150053697.png)
![image-20240504150129502](.\static\image-20240504150129502.png)
![image-20240504150138997](.\static\image-20240504150138997.png)
![image-20240504150143962](.\static\image-20240504150143962.png)
![image-20240504150148470](.\static\image-20240504150148470.png)