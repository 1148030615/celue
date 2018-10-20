<template>
  <div id="app">
    <index/>
  </div>
</template>

<script>
  import index from './components/index'
  export default {
    name: 'App',
    components: {
      index
    },
    created() {
      this.setViewport(750);
    },
    methods: {
      //设置Viewport
      setViewport: function (rootW) {
        var width = rootW, pw = parseInt(window.screen.width), scale = pw / width, ua = navigator.userAgent;
        //document.write('<meta name="viewport" content="width=' + width + ',minimum-scale=' + scale + ',maximum-scale=' + scale + '">');
        var oMeta = document.createElement('meta');
        oMeta.name = 'viewport';
        oMeta.content = 'width='+width+ ',user-scalable=no,minimum-scale=' + scale + ',maximum-scale=' + scale;
        document.getElementsByTagName('head')[0].appendChild(oMeta);
        if (navigator.appVersion.indexOf('Android') != -1) {
          document.addEventListener('DOMContentLoaded', function (e) {
            document.getElementById('main').style.zoom = e.target.activeElement.clientWidth / rootW;
          });
        }
      }
    }
  }
</script>
<style>
  body{background-color: #070a17}
  *{ padding: 0; margin: 0}
  img{ border: none}
</style>


