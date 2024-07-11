// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// import { mount } from 'cypress/vue'

// Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(MyComponent)

import './commands'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:uno.css'
import '@/styles/main.scss'

import { mount } from 'cypress/vue'
import router from '@/router'
import store from '@/stores'
import i18n from '@/locales'

Cypress.Commands.add('mount', (component, ...args) => {
  args.global = args.global || {}
  args.global.plugins = args.global.plugins || []
  args.global.plugins.push(router)
  args.global.plugins.push(store)
  args.global.plugins.push(i18n)

  mount(component, ...args)
})
