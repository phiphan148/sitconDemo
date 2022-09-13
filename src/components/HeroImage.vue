<template>
  <div id="HeroImage_Section" class="HeroImage">
    <img
      alt="HeroImage"
      src="https://www.lidl.de/static/assets/2237_Mo_Werkstatt_Theme_Hero-38131.jpg"
      srcset="../assets/2237_Mo_Werkstatt_Theme_Hero-38131.jpg 632w, ../assets/2237_Mo_Werkstatt_Theme_Hero-38131.jpg 948w, ../assets/2237_Mo_Werkstatt_Theme_Hero-38131.jpg 1264w, ../assets/2237_Mo_Werkstatt_Theme_Hero-38131.jpg 2528w"
      sizes="(min-width: 0) 100vw, (min-width: 1280px) 1264px"
      loading="lazy"
    >
    </div>
</template>

<script>
export default {
  name: 'HeroImage',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.HeroImage {
  height: 100%;
  background-color: #204e47;
  img {
    width: 100%;
  }
}
</style>
