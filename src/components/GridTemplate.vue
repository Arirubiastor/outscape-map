<template>
<div class="grid"></div>
    
</template>

<script>
export default {
  name: "tile-component",
  props: {
    coords: {
      type: Object,
      required: true
          }
        },
        
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>
.grid {
  outline: 1px solid #38c9d386;
  height: 40rem;
  width: 40rem;
}

</style>

