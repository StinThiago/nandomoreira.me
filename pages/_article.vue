<template>
  <article class="Article" itemscope itemtype="http://schema.org/NewsArticle">
    <page-header :postTitle="article.title.rendered" :date="longTimestamp(article.date)" :image="featuredImage" :shareImage="postImage" :breadcrumbs="breadcrumbs" :author="author"></page-header>
    <main itemprop="articleBody" role="main">
      <div class="Article__body">
        <div v-html="article.content.rendered"></div>
      </div>
      <disqus :disqusTitle="article.title.rendered" :disqusIdentifier="splitIdentifier(article.slug)" :disqusUrl="disqusUrl(article.slug)"></disqus>
    </main>
    <meta-tags :title="postTitle" :url="postUrl" ogType="article" :description="postDesc"></meta-tags>
  </article>
</template>

<script>
import('highlight.js/styles/tomorrow-night.css')
const { siteUrl } = require('~/utilities/Helpers')

export default {
  name: 'Article',

  async asyncData ({ app, store, params }) {
    let article = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?slug=${params.article}&_embed`)
    store.commit('setArticle', article.data[0])
  },

  computed: {
    article () {
      const { article } = this.$store.state
      return article
    },

    postTitle () {
      const { title } = this.$store.state.article
      return `${title.rendered} - Fernando Moreira | Desenvolvedor front-end e WordPress em Curitiba/PR`
    },

    postDesc () {
      const { excerpt } = this.$store.state.article
      return `${this.striphtml(excerpt.rendered)}`
    },

    postImage () {
      const { _embedded } = this.$store.state.article
      return (_embedded['wp:featuredmedia']) ? `${_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}` : `${siteUrl}/images/social.jpg`
    },

    postUrl () {
      const { slug } = this.$store.state.article
      return `${siteUrl}${slug}`
    },

    author () {
      const { article } = this.$store.state
      return article._embedded.author[0]
    },

    featuredImage () {
      const { _embedded } = this.$store.state.article
      const featuredImage = _embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes.full.source_url || false
      } else {
        return false
      }
    },
    breadcrumbs () {
      const { article } = this.$store.state
      return [
        {
          active: false,
          url: '/',
          title: 'Home'
        },
        {
          active: false,
          url: '/blog',
          title: 'Blog'
        },
        {
          active: true,
          url: `${article.slug}`,
          postTitle: `${article.title.rendered}`
        }
      ]
    }
  },

  // head () {
  //   return {
  //     title: `${this.postTitle}`
  //   }
  // },

  mixins: {
    longTimestamp: Function
  },

  components: {
    MetaTags: () => import('~/components/MetaTags'),
    PageHeader: () => import('~/components/PageHeader'),
    Disqus: () => import('~/components/Disqus')
  },

  methods: {
    splitIdentifier: identifier => {
      return identifier.slice(-1) !== '/' ? `${identifier}/` : `${identifier}`
    },
    disqusUrl: slug => {
      return `${siteUrl}/${slug}`
    },
    striphtml: content => {
      let regex = /(<([^>]+)>)/ig
      let text = content.replace(regex, '')
      return `${text.substring(140, text)}...`
    }
  }
}
</script>

<style lang="stylus" scoped>
.Article
  display block
  margin 0
  padding 0
  main .container
    @extend $article
    border none
    border-bottom borderBase
    +below(md)
      padding 0 spacingSmall spacingBase
      background transparent none
      box-shadow none
      &:last-child
        padding-top spacingBase
        border-bottom none
</style>

<style lang="stylus">
.Article
  &__body
    p, h2, h3, h4, h5,
    blockquote, pre code, ul, ol
      max-width containerWidthSmall
      margin-left auto
      margin-right auto
    p, h2, h3, h4, h5, pre code
      padding-left spacingBase
      padding-right spacingBase
    ul, ol
      padding-left spacingLarge
  img
    width 100%
    height auto
    display block
  pre
    background feldgrauColor
    color honeydewColor
    overflow-x auto
    margin-bottom spacingBase
    code
      background feldgrauColor
      padding-top spacingSmall
      padding-bottom spacingSmall
  .video
    position relative
    padding-bottom 56.25%
    padding-top 25px
    height 0
    margin-bottom spacingBase
    iframe,
    object,
    embed
      position absolute
      top 0
      left 0
      width 100%
      height 100%
</style>
