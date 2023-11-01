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

⚖️ at this point, player should be able to trade credits for resources on the dexes:

![image](https://github.com/BuidlGuidl/event-wallet/assets/2653167/09a019de-8112-4912-9889-d1fa47cb0d4d)


---

## Charts and Leaderboard

If you want to keep the charts and leaderboard updated you have to run a cron job requesting /api/admin/track-prices:

```
* * * * * /usr/bin/curl https://domain/api/admin/track-prices >> prices.log
```

Or you can set the cron job at Vercel using the /packages/nextjs/vercel.json config file.

(On localhost you can just use the browser to hit `http://localhost:3000/api/admin/track-prices` manually) 


---

## Trading Bots 

If you want prices to randomly fluctuate you need to run bots that have a bunch of liquidity and trade randomly:

```bash
git clone https://github.com/McCoady/bg-game-scripts

cd bg-game-scripts

yarn install
```

> 💾 you will need to copy your `packages/nextjs/generated/deployedContracts.ts` into this `bg-game-scripts/deployedContracts.js`

⚠️ notice it changes from `.ts` to `.js` - you will also have to remove the `as const` from the end

(this tells your bots about the new contracts you've deployed)

> 🧑‍🎤 next, create a `punkwallet.io` and point it at `localhost` and grab a bunch of funds from the faucet:

 ![image](https://github.com/BuidlGuidl/event-wallet/assets/2653167/64bb4db8-4032-4e8c-9e5f-0e3efde9c937)


⚠️ you will want to add this burner address into your `packages/hardhat/deploy/00_deploy_your_contract.ts` file as `YOUR_LOCAL_BURNER_ADDRESS`

(this will setup an account with credits so we can fund our trading bots)

☢️ Notice: now you probably need to `yarn deploy --reset` and recopy over your `deployedContracts.js` 

> ✏️ create a `.env` file in the `bg-game-scripts` dir with the following info filled in:

```
DEPLOYER_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_FROM_YOUR_LOCAL_PUNK_WALLET
GNOSIS_RPC=http://127.0.0.1:8545
GNOSIS_NETWORK_ID=31337
```

⛽️ if your "deployer" punkwallet is loaded up with local funds, you should be good to run:

```bash
node batchPrep.js
```

⚙️ this is going to generate a bunch of trader accounts and load the private keys up in your `.env` file:

![image](https://github.com/BuidlGuidl/event-wallet/assets/2653167/d59b9c72-0a6d-4029-8257-0f4d0b8212dd)

(if anything fails here it probably means your burner is not correctly funded with credits and assets and you can debug balances using http://localhost:3000/debug)




