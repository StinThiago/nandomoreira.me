<template>
  <aside class="comments">
    <div class="comments__inner container--small">
      <h3>Comentários para: <span>"{{ disqusTitle }}"</span></h3>
      <div class="comments__loading" v-if="!disqusReady">
        <Spinner></Spinner>
        <span>Carregando comentários...</span>
      </div>
      <div class="comments__disqus" :class="{ ready: disqusReady }">
        <no-ssr>
          <lazy-component>
            <VueDisqus :shortname="disqusShortname" :title="disqusTitle" :identifier="disqusIdentifier" :url="disqusUrl" @ready="disqusReady = true"></VueDisqus>
          </lazy-component>
        </no-ssr>
      </div>
    </div>
  </aside>
</template>

<script>
import Spinner from '~/components/Spinner'
import VueDisqus from 'vue-disqus/VueDisqus.vue'

export default {
  name: 'Disqus',

  data () {
    return {
      disqusReady: false
    }
  },

  props: {
    'disqusShortname': {
      type: String,
      default: 'fernandomoreira'
    },
    'disqusTitle': {
      type: String
    },
    'disqusIdentifier': {
      type: String
    },
    'disqusUrl': {
      type: String
    }
  },

  components: {
    Spinner,
    VueDisqus
  }
}
</script>

<style lang="stylus" scoped>
.comments
  padding spacingBase 0
  border-top borderBase
  margin-top spacingBase
  position relative
  background-color #fff
  @extend $clearfix
  h3
    font-size 1.2rem
    margin-top 0
    span
      opacity .6
      font-weight fontWeightRegular

  &__loading
    // align-items: center
    // display: flex
    // flex-direction: column
    // justify-content: center
    // position: absolute
    width: 100%
    text-align center
    .spinner
      margin-bottom: spacingSmall
  &__disqus
    // min-height: 440px
    opacity: 0
    transform: translateY(16px)
    transition: 1s
    &.ready
      opacity: 1
      transform: translateY(0)
</style>
