/* global document */

import '@picocss/pico/css/pico.fluid.classless.min.css'
import '~/common.css'
import './options.css'

import { mount } from 'svelte'

import Options from '~/component/Options.svelte'

const app = mount(Options, {
    target: document.getElementById('app'),
})

export default app
