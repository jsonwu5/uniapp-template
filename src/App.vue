<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show', process.env)
    console.log(process.env.VUE_APP_BASE_API)
  },
  onHide: function() {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
</style>
