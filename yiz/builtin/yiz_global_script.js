// 全局扩展脚本
/* eslint-disable unused-imports/no-unused-vars */
// Define main function (script entry)

// ref: https://www.clashverge.dev/guide/script.html

// // 国内DNS服务器
// const domesticNameservers = [
//   "https://dns.alidns.com/dns-query", // 阿里云公共DNS
//   "https://doh.pub/dns-query", // 腾讯DNSPod
//   "https://doh.360.cn/dns-query" // 360安全DNS
// ];
// // 国外DNS服务器
// const foreignNameservers = [
//   "https://1.1.1.1/dns-query", // Cloudflare(主)
//   "https://1.0.0.1/dns-query", // Cloudflare(备)
//   "https://208.67.222.222/dns-query", // OpenDNS(主)
//   "https://208.67.220.220/dns-query", // OpenDNS(备)
//   "https://194.242.2.2/dns-query", // Mullvad(主)
//   "https://194.242.2.3/dns-query" // Mullvad(备)
// ];
// // DNS配置
// const dnsConfig = {
//   "enable": true,
//   "listen": "0.0.0.0:1053",
//   "ipv6": true,
//   "use-system-hosts": false,
//   "cache-algorithm": "arc",
//   "enhanced-mode": "fake-ip",
//   "fake-ip-range": "198.18.0.1/16",
//   "fake-ip-filter": [
//     // 本地主机/设备
//     "+.lan",
//     "+.local",
//     // Windows网络出现小地球图标
//     "+.msftconnecttest.com",
//     "+.msftncsi.com",
//     // QQ快速登录检测失败
//     "localhost.ptlogin2.qq.com",
//     "localhost.sec.qq.com",
//     // 微信快速登录检测失败
//     "localhost.work.weixin.qq.com"
//   ],
//   "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
//   "nameserver": [...domesticNameservers, ...foreignNameservers],
//   "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
//   "nameserver-policy": {
//     "geosite:private,cn,geolocation-cn": domesticNameservers,
//     "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
//   }
// };

// 代理组通用配置
// const groupBaseOption = {
//   "interval": 300, // 检查间隔(s)
//   "timeout": 6000, // 超时时间(ms)
//   "url": "https://www.google.com/generate_204",
//   "lazy": true,
//   "max-failed-times": 5,
//   "hidden": false
// };

function main(config, profileName) {
  // 信息统计
  // for (const key in config) {
  //   console.log(`${key}`)
  // }
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // // 覆盖原配置中DNS配置
  // config["dns"] = dnsConfig;

  // 手动应用代理
  const oldProxies = config.proxies;
  config.proxies = config["custom-prepend-proxies"].concat(oldProxies);
  delete config["custom-prepend-proxies"];

  // 手动应用代理组
  if (
    config["enable-custom-proxy-groups"] === true &&
    config["custom-proxy-groups"].length !== 0
  ) {
    config["proxy-groups"].length = 0;
    config["custom-proxy-groups"].map((item) => {
      config["proxy-groups"].push({
        ...item,
      });
    });
    console.log("已替换原有代理组");
  }
  config["proxy-groups"] = [
    ...config["custom-prepend-proxy-groups"],
    ...config["proxy-groups"],
    ...config["custom-append-proxy-groups"],
  ];
  delete config["custom-proxy-groups"];
  delete config["custom-prepend-proxy-groups"];
  delete config["custom-append-proxy-groups"];

  // 手动应用代理提供商
  // let oldProxyProviders = config["proxy-providers"] ?? []
  // config["proxy-providers"] = config["custom-proxy-providers"].concat(oldProxyProviders)
  // config["proxy-providers"] = config["custom-proxy-providers"]
  delete config["custom-proxy-providers"];

  // 手动应用规则提供商
  config["rule-providers"] = config["custom-rule-providers"];
  delete config["custom-rule-providers"];

  // 手动应用规则
  if (
    config["enable-custom-rules"] === true &&
    config["custom-rules"].length !== 0
  ) {
    config["rules"] = config["custom-rules"];
    console.log("已替换原有规则");
  }
  config["rules"] = [
    ...config["custom-prepend-rules"],
    ...config["rules"],
    ...config["custom-append-rules"],
  ];
  delete config["custom-rules"];
  delete config["custom-prepend-rules"];
  delete config["custom-append-rules"];

  return config;
}
