# 🕹 Game Wallet 💎

🧪 this is forked from our event wallet and you can find initial details [here](https://github.com/BuidlGuidl/event-wallet)

```bash

git clone https://github.com/BuidlGuidl/event-wallet game-wallet

cd game-wallet

git checkout -b game-wallet

yarn install

✏️ next, check out the `packages/nextjs/.env.example` file for ENV vars 

> 📡 you'll need to spin up a KV (key value storage) in vercel and copy/paste in the env.local fields:


```
NEXT_PUBLIC_DEPLOY_BLOCK=0
# No trailing slash
NEXT_PUBLIC_LIVE_URL=https://event-wallet.vercel.app
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```



📝  then, check out the `packages/hardhat/.env.example` file for ENV vars 


```
ALCHEMY_API_KEY=
DEPLOYER_PRIVATE_KEY=
ETHERSCAN_API_KEY=
PINATA_JWT_KEY=
```


```bash

yarn chain

yarn deploy

yarn start

```
