export const state = () => ({
  pages: [],
  funding: [],
  news: []
})

export const mutations = {
  SET_PAGES(state, pages) {
    state.pages = pages
  },
  SET_FUNDING(state, funding) {
    state.funding = funding
  },
  SET_NEWS(state, news) {
    state.news = news
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const pages = await require('@/api/pages.json')
    commit('SET_PAGES', pages)
    const funding = await require('@/api/funding.json')
    commit('SET_FUNDING', funding)
    const news = await require('@/api/news.json')
    commit('SET_NEWS', news)
    console.log('json data loaded')
  }
}

export const getters = {
  funding: (state, getters) => {
    return state.funding
  },
  pages: (state, getters) => {
    return state.pages
  },
  news: (state, getters) => {
    return state.news
  },
  current: state => {
    var today = new Date()
    var yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    let current = []
    state.funding.forEach(x => {
      if (new Date(x.expires) > yesterday) current.push(x)
    })
    return current
  },
  expired: state => {
    var today = new Date()
    var yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    let expired = []
    state.funding.forEach(x => {
      if (new Date(x.expires) < yesterday) expired.push(x)
    })
    return expired
  }
}
