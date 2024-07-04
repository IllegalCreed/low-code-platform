import TypedText from '@/components/common/TypedText.vue'

describe('TypedText', () => {
  it('playground', () => {
    cy.mount(TypedText,{
      props: {
        strings: ['Hello', 'World'],  
      },
    })
  })
})
