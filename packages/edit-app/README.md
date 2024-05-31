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

