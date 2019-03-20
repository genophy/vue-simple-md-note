<template>
    <div class="flex-column h-max-per-100 i-container">
        <div class="flex-shrink bg-color-dark no-select">
            <div class="w-1000  m-auto flex-row justify-content-space-between align-items-center h-50 line-h-50 color-gray-light-soft">
                <div class="flex-row">
                    <span class="font-dameronoutital font-size-40 cursor-pointer m-r-50" @click="btnGotoHomePage()">Simple BLOG</span>

                    <div class="p-t-5 p-l-30" v-if="true === isLogin">
                        <span class="p-h-10 font-size-14 font-offline-rough tappable" @click="btnGotoMyBlogList()">MyBlog</span>
                    </div>

                    <div class="p-t-5 p-l-30">
                        <span class="p-h-10 font-size-14 font-offline-rough tappable" @click="btnGotoAbout()">About</span>
                    </div>
                </div>

                <div class="flex-row">

                </div>

            </div>
        </div>

        <div class="flex-grow flex-column overflow-y m-v-10 position-relative">
            <div class="m-auto w-1000 flex-grow position-relative">
                <div>
                    <router-view/>
                </div>
            </div>


        </div>
    </div>

</template>

<script>
  import * as  Constants from '../util/Constants';
  import CookieUtil      from '../util/CookieUtil';

  export default {
    name   : 'Main',
    data   : () => ({
      isLogin: !!CookieUtil.cookie(Constants.COOKIE_USER_TOKEN),
    }),
    created: () => {
      // this.isLogin =
    },
    methods: {
      btnGotoHomePage  : function() {
        this.$router.push({path: '/'});
      },
      btnGotoMyBlogList: function() {

      },
      btnGotoAbout     : function() {
        this.$router.push({path: '/main/about'});
      },

    },
  };
</script>

<style scoped lang="scss">

    .i-container {
        position : absolute;
        top      : 0;
        bottom   : 0;
        left     : 0;
        right    : 0;
        z-index  : 1;
    }

</style>
