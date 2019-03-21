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

                <div class="flex-row ">
                    <button type="button" class="font-old-stamper bg-color-dark color-gray-light-soft tappable" @click="btnGotoLogin()" v-if="false ===isLogin"> login</button>

                    <div class="m-r-50">
                        <el-button type="primary" v-if="true === isLogin">
                            <i class="el-icon-arrow-down el-icon-circle-plus-outline"></i> New
                        </el-button>
                    </div>

                    <el-dropdown trigger="click" @command="handleCommand" v-if="true === isLogin">
                        <el-button type="primary" class="p-a-10">
                            <i class="el-icon-arrow-down el-icon-circle-plus-outline"></i>USER
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="setting">Setting</el-dropdown-item>
                            <el-dropdown-item command="exit">Exit</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <!--<el-menu :default-active="activeIndex" class="el-menu-dark" mode="horizontal" @select="handleSelect">

                        <el-submenu index="2">
                            <template slot="title">USER</template>
                            <el-menu-item index="2-1">Setting</el-menu-item>
                            <el-menu-item index="2-2">Exit</el-menu-item>
                        </el-submenu>
                    </el-menu>-->
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
  import AuthService from '../service/auth.service';
  import Constants   from '../util/Constants';
  import CookieUtil  from '../util/CookieUtil';

  export default {
    name   : 'Main',
    data   : () => ({
      isLogin: !!CookieUtil.cookie(Constants.COOKIE_USER_TOKEN),
    }),
    created() {
      // this.isLogin = !!CookieUtil.cookie(Constants.COOKIE_USER_TOKEN);
    },
    methods: {
      btnGotoHomePage() {
        this.$router.push({path: '/'});
      },
      btnGotoMyBlogList() {

      },
      btnGotoAbout() {
        this.$router.push({path: '/main/about'});
      },
      btnGotoLogin() {
        this.$router.push({path: '/login'});
      },

      handleCommand(command) {
        switch (command) {
          case 'setting':
            this.btnGotoSetting();
            break;
          case 'exit':
            this.btnExit();
            break;
        }
      },
      btnGotoSetting() {
        this.$router.push({path:'/main/settings'})
      },

      btnExit() {
        AuthService.logOut().then(() => {

          this.$router.push({path: '/login'});
        });
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

    .el-menu-dark {
        background : #222;
        color      : #000 !important;
    }
</style>
