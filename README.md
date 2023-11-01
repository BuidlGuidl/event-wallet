# 🕹 Game Wallet 💎

🧪 this is forked from our event wallet and you can find initial details [here](https://github.com/BuidlGuidl/event-wallet)

```bash

git clone https://github.com/BuidlGuidl/event-wallet game-wallet

cd game-wallet

git checkout -b game-wallet

yarn install

```

✏️ first, check out the `packages/nextjs/.env.example` file for ENV vars 

> 💿 you'll need to spin up a KV (key value storage) in vercel and copy/paste in the env.local fields:


```
NEXT_PUBLIC_DEPLOY_BLOCK=0
NEXT_PUBLIC_LIVE_URL=https://event-wallet.vercel.app
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```


> ⚙️ bring up the chain and deploy your contracts 

```bash

yarn chain

yarn deploy

yarn start

```


> 📝  next, inspect the `targetNetwork` var in `packages/nextjs/scaffold.config.ts` 

(if you are deploying locally it needs to be `chains.hardhat` or `chains.gnosis` out in prod)

> 📱 hit the frontend at `http://localhost:3000` 


> 💁‍♂️ login as with your nickname:

![image](https://github.com/BuidlGuidl/event-wallet/assets/2653167/bfbbe1a3-8fee-4b73-8ff9-12954827a962)

> 🏷 now you can use the browser to navigate to the `/checkedIn` route to drop tokens and gas to players:

![image](https://github.com/BuidlGuidl/event-wallet/assets/2653167/1d1e19e1-35fb-4302-9bd6-780fed7af7cf)

⚠️ your frontend address will need to be an admin to drop tokens to players

> 📝 edit `packages/hardhat/deploy/00_deploy_your_contract.ts` and add your address to `dexPausers`

> ⚙️ redeploy the whole stack with `yarn deploy --reset`



