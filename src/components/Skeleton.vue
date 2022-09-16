<template>
    <div
      v-if="isLoading"
      class="detail__grids">
      <div
        class="detail__grids-item"
        v-for="product in mockData"
        :key="product.erp_number"
      >
        <div class="detail__grids-content">
        </div>
        <div class="detail__grids-tile">
          <div class="detail__grids-image gradient"></div>
          <div class="detail__grids-title gradient"></div>
          <div class="detail__grids-text gradient"></div>
          <div class="detail__grids-text gradien"></div>
          <div class="detail__grids-price gradient"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    isLoading: true
  },
  data () {
    return {
      mockData: [{}, {}, {}, {}]
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@mindshift/cake-mindshift-core/src/variables.less";
@import "~@mindshift/cake-mindshift-core/src/styling_mixins.less";

.detail__grids {
  width: 100%;
  height: 100%;
  display: inline-flex;
  padding: 0 0 0 @m-distances-16;
  list-style: none;
  gap: @m-distances-16;

  &-item {
    width: calc(25% - @m-distances-16);
  }

  > * {
    padding: 0;
  }

  > a {
    max-width: 100%;
    flex: 0 0 100%;
    padding: 0;
    margin: 0;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &-content {
    position: absolute;
    visibility: hidden;
  }

  &-tile {
    display: flex;
    flex-direction: column;
    float: left;
    width: 100%;
    height: auto;
    background-color: white;
    padding-bottom: @m-distances-8;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    border-radius: 2px;
    box-shadow: rgba(100, 100, 111, 0.15) 0 2px 4px 0;
  }

  &-image {
    width: 100%;
    height: @m-distances-224;
    border-radius: 2px 2px 0 0;
    margin-bottom: @m-distances-16;
  }

  &-title {
    width: @m-distances-256;
    height: @m-distances-24;
    border-radius: 2px;
    margin-left: @m-distances-8;
    margin-bottom: @m-distances-16;
  }

  &-text {
    width: @m-distances-200;
    height: @m-distances-16;
    border-radius: 2px;
    margin-left: @m-distances-8;
    margin-bottom: @m-distances-8;
  }

  &-price {
    width: @m-distances-72;
    height: @m-distances-24;
    border-radius: 2px;
    margin-top: auto;
    margin-right: @m-distances-8;
    margin-left: auto;
    margin-bottom: @m-distances-8;
  }
}

@keyframes skeleton-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: @m-distances-304 0;
  }
}

@-webkit-keyframes skeleton-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: @m-distances-304 0;
  }
}

.gradient {
  background-image: linear-gradient(to right, #F1F2F3, #E3E4E5, #F1F2F3);
  background-position: 0 0;
  animation: skeleton-animation 1.2s cubic-bezier(.86, .01, .7, 1) infinite;
}
</style>
