# Talk Wallet

This **forkable** project provides a web-based crypto (burner) wallet, aiming to enhance the experience of attendees at your talk, by providing a gamification element. This allows interaction with other attendees, as well as the organizers.

### 0. Checking prerequisites

This project is powered by [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2). Before you begin, make sure you meet its requirements:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

### 1. Clone/Fork this repo & install dependencies

```shell
git clone https://github.com/BuidlGuidl/event-wallet.git talk-wallet
cd talk-wallet
git checkout talk-wallet
yarn install
```

### 2. Testing locally

1. Create your KV (redis key value storage) in Vercel

In your NextJS app, copy `.env.example` to `.env.local` and set the required KV env vars (from Vercel)

_ToDo: Create a docker-compose file to spin a local redis instance_

2. Start your NextJS app:

 ```shell
 yarn start
 ```

Visit your app on: `http://localhost:3000`.

3. Talk Config

- Set your address as an admin on `packages/nextjs/admins.json`
- Configure your questions / answers on `packages/nextjs/questions.json`
- Configure you scaffold-eth app on `packages/nextjs/scaffold.config.ts` (polling time, etc)

4. Questions / Answers

- Go to `/admin/questions` to see all the configured questions. Click on a question, open it and show the QR to the participants. You'll be getting the answers in real time.
- Go to `/questions/leaderboard` to see the leaderboard of the participants with the most correct answers.


### 3 Deploy your NextJS App

We recommend connecting the project GitHub repo to Vercel so you the gets automatically deployed when pushing to `main`.

You can also run `yarn vercel` and follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL. If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

**You'll need to connect the KV storage to you project in the Vercel**

