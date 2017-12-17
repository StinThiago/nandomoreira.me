<template>
  <div class="articleList">
    <article class="postItem" v-for="article in articles" :key="article.id">
      <nuxt-link class="postItem__link" :to="`${article.slug}`">
        <figure class="postItem__image-figure" v-if="article._embedded['wp:featuredmedia']">
          <div class="postItem__image" :style="`background-image: url(${article._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url})`"></div>
          <img v-lazy="article._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url" :alt="`imagem de ${article.title}`">
        </figure>
        <div class="postItem__header">
          <h2 class="postItem__title" v-html="article.title.rendered" />
          <div class="postItem__meta">
            <span v-html="shortTimestamp(article.date)" />
          </div>
          <div class="postItem__excerpt">{{ striphtml(article.excerpt.rendered) }}</div>
        </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array
  },
  mixins: {
    shortTimestamp: Function
  },
  methods: {
    striphtml (content) {
      let regex = /(<([^>]+)>)/ig
      let text = content.replace(regex, '')
      return `${text.substring(140, text)}...`
    }
  }
}
</script>

<style lang="stylus" scoped>
.articleList
  display flex
  position relative
  flex-flow row
  flex-wrap wrap
  margin-left -(spacingSmall)
  margin-right -(spacingSmall)
  padding 40px 0 0

.postItem
  display flex
  flex 1 1 300px
  // overflow hidden
  margin 0 spacingSmall spacingBase
  &__link
    color feldgrauColor
    text-decoration none
    // display block
    flex-direction column
    min-height 220px
    background #fff
    border-radius 5px
    box-shadow boxShadowBase
    transition box-shadow .2s timingFunction, transform .2s timingFunction
    flex 1 1 100%
    display flex
    &:hover,
    &:focus
      box-shadow boxShadowHover
      transform translate(0, -10px)
  &__excerpt
    -ms-flex-positive 1
    flex-grow 1
    display -ms-flexbox
    display flex
    -ms-flex-direction column
    flex-direction column
    -ms-flex-pack justify
    justify-content space-between
  &__header
    padding spacingSmall spacingSmall spacingMini
  &__description,
  &__footer
    position relative
    display block
    padding 0 spacingSmall
  &--no-footer .postItem__link
    padding-bottom spacingSmall
  &__footer
    margin 0
    padding-bottom spacingSmall
  &__meta
    display block
    opacity .6
    font-size .65rem
    line-height 1.2em
    text-transform uppercase
    margin 0
    span
      display block
      margin-bottom 5px
    svg
      display inline-block
      vertical-align middle
      margin-right 4px
      line-height 1
      top -2px
      position relative
  &__title
    font-size 1.4rem
    margin-top 0
    margin-bottom .5rem
  &__description
    font-size 1rem
    line-height 1.4em
  &__image-figure
    position relative
    img
      display none
  &__image
    width 100%
    height 250px
    background #c5d2d9 no-repeat 50%
    background-size cover
  +above(lg)
    &--featured
      flex 1 1 100%
      .postItem__link
        flex-direction row
      .postItem__image
        position absolute
        width 100%
        height 100%
        &-figure
          flex 1 1 auto
      .postItem__content
        flex 0 1 357px
</style>
