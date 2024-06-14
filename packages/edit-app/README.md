# edit-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## 色彩配置方案

首先为了实现新拟态效果，专门设计了一套色彩方案，主要集中在内外阴影的刻画上，背景模拟凸起和凹陷的效果上。

### 阴影
阴影分为四部分，分别是
- 左上白色外阴影：一倍深度，代表光源照射物体外侧面后的反光
- 左上黑色内阴影：一倍深度，代表凹陷物体内阴影，半倍深度：玻璃类物体厚度所产生的阴影。
- 右下白色内阴影：一倍深度，代表光源照射凹陷物体内侧面后的反光，半倍深度：玻璃类物体厚度表面反射的光线。
- 右下黑色外阴影：一倍深度，代表物体的阴影。
相关定义在_neumorphism.scss体现。

为了定义四种阴影的透明度，用了四个变量，在_colors.scss中定义。这里涉及到一个和灰度相关的基准值，背景色越亮则基准值越靠近0.5，否则接近0。目的是在明亮环境下白色阴影透明度更低，也就是更白，深色环境下白色阴影都明度越高，也就是越暗。
- 右下白色内阴影：基准值，基准值区间[0,0.5]
- 左上黑色内阴影：0.5 - 基准值
- 右下黑色外阴影：基准值 / 2
- 左上白色外阴影：基准值 * 2

基准值的计算：灰度被计算为一个[0,1]的值，通过指数映射到[0,0.5]，之所以用指数映射是为了整体亮度降低，因为新拟态效果不是阴影就是反光，这样不会显得特别突兀。

背景突起和凹陷效果颜色计算，分别是底色转换为hsl后亮度增加10%和减少10%，之所以用hsl因为只调整亮度不会影响色相和饱和度。

相关计算在darkmode.ts中执行

## 文件组织架构

- utils 文件夹：
存放纯粹的 TypeScript 方法和工具函数，这些方法不依赖于 Vue 的特性，可以在任何地方使用。例如，字符串处理函数、数学计算函数、数据格式化函数等。

- composables 文件夹：
存放涉及 Vue 特性的逻辑，如生命周期钩子、ref、computed 属性和监听器等。这些方法通常是可复用的 Vue 逻辑，适用于多个组件。例如，自定义的 hooks、处理复杂表单逻辑的函数等。

- Pinia 的 store 文件夹：
存放需要管理全局状态的逻辑，包括涉及到全局变量的修改和访问的函数。这些函数通常负责处理应用程序的全局状态，并提供访问和修改这些状态的方法。例如，用户认证状态管理、应用配置管理等。

### store的用法
所有的API调用都会在store里面封装一层，第一是习惯，第二是为了输入输出有一层负责转换的地方，更多充当一个trans层，而不是真的当全局状态管理在用。