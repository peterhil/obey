/* global document */

import './options.css'

import { mount } from 'svelte'

import Options from '~/component/Options.svelte'

const app = mount(Options, {
    target: document.getElementById('app'),
})

export default app
