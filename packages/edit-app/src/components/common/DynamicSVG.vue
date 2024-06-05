<template>
  <div v-if="svgContent" v-html="svgContent" class="dynamic-svg"></div>
</template>

<script setup>
import DOMPurify from 'dompurify'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const svgContent = ref('')

const updateSvgContent = async () => {
  try {
    const response = await fetch(props.src)
    const svgData = await response.text()
    const cleanedSvgData = DOMPurify.sanitize(svgData, {
      ALLOWED_TAGS: [
        'svg',
        'g',
        'path',
        'circle',
        'rect',
        'line',
        'polygon',
        'polyline',
        'ellipse',
        'text',
        'tspan',
        'defs',
        'use'
      ],
      ALLOWED_ATTR: [
        'xmlns',
        'viewBox',
        'fill',
        'stroke',
        'stroke-width',
        'd',
        'cx',
        'cy',
        'r',
        'x',
        'y',
        'width',
        'height',
        'points',
        'x1',
        'x2',
        'y1',
        'y2',
        'rx',
        'ry',
        'style',
        'class',
        'transform',
        'xlink:href'
      ]
    })

    svgContent.value = cleanedSvgData
  } catch (error) {
    console.error('Error loading SVG:', error)
  }
}

onMounted(updateSvgContent)
</script>

<style scoped>
.dynamic-svg {
  color: inherit; /* This ensures the currentColor is inherited from the parent */
}

.dynamic-svg svg {
  width: 100%;
  height: 100%;
}

.dynamic-svg svg [stroke='currentColor'] {
  stroke: currentColor;
}

.dynamic-svg svg [fill='currentColor'] {
  fill: currentColor;
}
</style>
