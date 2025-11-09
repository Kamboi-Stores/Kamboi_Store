// studio/sanity.cli.ts
import {defineCliConfig} from '@sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'qxbunha1',   
    dataset: 'production'
  },
  studioHost: 'kamboistores',
  deployment: {
    appId: 'v3atrawvxhtwt5ete72w4hlx',
  }
})
