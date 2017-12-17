<template>
  <article class="postItem" :class="`${(count%6) === 0 ? 'postItem--featured' : ''}${!meta ? ' postItem--no-footer' : ''}`">
    <nuxt-link class="postItem__link" :to="post.permalink" :title="post.title">
      <div :to="post.permalink" class="postItem__image-figure" v-if="post.image">
        <div class="postItem__image" :style="`background-image: url(${post.image})`"></div>
        <img :src="post.image" :alt="`imagem de ${post.title}`">
      </div>
      <div class="postItem__content">
        <header class="postItem__header">
          <h2 class="postItem__title">{{ post.title }}</h2>
        </header>
        <p v-if="post.description" itemprop="description" class="postItem__description">{{ post.description }}</p>
        <footer v-if="meta" class="postItem__footer">
          <small class="postItem__meta">
            <span v-if="post.date" itemprop="datePublished" :content="post.date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Publicado em {{ post.date | moment("MMMM") }} de {{ post.date | moment("YYYY") }}
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              por <strong itemprop="author">Fernando Moreira</strong>
            </span>
            <!-- <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <strong><a :href="`${post.permalink}/#disqus_thread`" :data-disqus-identifier="`${post.permalink}/`">0</a></strong> comentários
            </span> -->
          </small>
        </footer>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    'post': {
      required: true
    },
    'count': {
      type: Number
    },
    'meta': {
      default: true
    }
  }
}
</script>

<style lang="stylus">
</style>
