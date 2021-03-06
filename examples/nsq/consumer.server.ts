import dotenv from 'dotenv'

import { Provider } from '../../src/enums/providers.enums'
import { Consumer } from '../../src/consumer/consumer'
import { formatHostConfigs } from '../../src/helpers/host_config.helpers'
import { ConsumerConfig } from '../../src/consumer/consumer.types'

;(() => {
  dotenv.config()
  if (!process.env.NSQ_LOOKUP_HOSTS) throw new Error('no nsq lookup hosts')

  const hosts = formatHostConfigs(process.env.NSQ_LOOKUP_HOSTS)

  const consumerConfig: ConsumerConfig = {
    provider: Provider.NSQ,
    hosts: hosts,
    topic: 'test-topic',
    channel: 'consumer-group'
  }

  const consumer = new Consumer(consumerConfig)
  consumer.connect()
  consumer.startConsuming((msg: any) => {
    console.log(msg.body.toString())
  })
})()
