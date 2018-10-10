import Vue from 'vue'
import index from '@/components/index'

describe('index.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(index);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.bInfo-name span').textContent)
      .to.equal('BTC')
  })
})
