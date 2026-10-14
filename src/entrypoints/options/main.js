/* global document */

import '@picocss/pico/css/pico.fluid.classless.min.css'
import '~/assets/common.css'
import './options.css'

import { mount } from 'svelte'

import Options from './Options.svelte'

const app = mount(Options, {
    target: document.getElementById('app'),
})

export default app
