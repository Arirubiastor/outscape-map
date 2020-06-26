<template>
  <div>
    <b>#{{star.id}}</b>
    <span>{{ star.name }}</span>
    <abbr>{{ star.lng }}, {{ star.lat }}</abbr>
  </div>
</template>

<script>
export default {
  props: {
    star: { required: true },
    searchStar: { required: true }
  }
}
</script>

<style scoped>

</style>