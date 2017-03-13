module.exports =  {
  na: {
    dev: {
      gcdm: "https://login-i.bmwusa.com",
      tokenInfoUrl: "/oauth/tokeninfo", 
      appinsightsKey: "e8aac185-275b-4f4f-ab92-4b189bfaf86e"
    },
    int: {
      gcdm: "https://login.bmwusa.com",
      tokenInfoUrl: "/oauth/tokeninfo",
      appinsightsKey: "ddb62067-2c2e-45bb-85ff-58403ae82a22"
    },
    prod: {
      gcdm: "https://login.bmwusa.com",
      tokenInfoUrl: "/oauth/tokeninfo",
      appinsightsKey: "985423ad-8bc2-40e8-ba86-70af9ea6fa0b"
    }
  },
  row: {
    dev: {
      gcdm: "https://customer-i.bmwgroup.com",
      tokenInfoUrl: "/oauth/tokeninfo",
      appinsightsKey: "1d13c543-e5be-40d6-bc51-16c4fdf88989"
    },
    int: {
      gcdm: "https://customer.bmwgroup.com",
      tokenInfoUrl: "/oauth/tokeninfo",
      appinsightsKey: "3112720c-3c8e-4043-afa5-359ca0034f52"
    },
    prod: {
      gcdm: "https://customer.bmwgroup.com",
      tokenInfoUrl: "/oauth/tokeninfo",
      appinsightsKey: "2001a564-cf83-4abb-9db5-3ef59979eb85"
    }     
  },
  level: process.env.LEVEL || "dev",
  region: process.env.region || "na",  
  defaultLocale: "en-US",
  storageApiKey: "bf767d17-c653-42cc-aec4-89c68f39f8b6"
}