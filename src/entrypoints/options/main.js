/* global document */

import './options.css'

import { mount } from 'svelte'

import OptionsPage from './OptionsPage.svelte'

const app = mount(OptionsPage, {
    target: document.getElementById('app'),
})

export default app
