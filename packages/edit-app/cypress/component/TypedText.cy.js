import TypedText from '@/components/common/TypedText.vue'

describe('TypedText', () => {
  // 是否正常显示
  it('playground', () => {
    cy.mount(TypedText,{
      props: {
        strings: ['Hello', 'World'],  
      },
    })
  })

  // 更换数据源后，是否正常
  // 更换打字时长后，是否正常
  // 更换删除时长后，是否正常
  // 更换间隔时间后，是否正常
  // 更新是否循环后，是否正常，双向
  // 更改打字缓动函数后，是否正常
  // 更改删除缓动函数后，是否正常
})
