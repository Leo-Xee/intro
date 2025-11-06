#!/usr/bin/env node

import { init } from './cli'

init().catch((e) => {
    console.error(e)
})
