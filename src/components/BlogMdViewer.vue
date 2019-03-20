<template>
    <div class="w-1000 m-auto h-per-100 h-max-per-100 flex-row">
        <div class="flex-shrink w-150">

            <div class="i-label">AUTHOR</div>
            <div class="font-size-12 word-break text-right p-r-20">
                <div class="p-t-10" v-if="blogInfo['user_image_id']">
                    <img :src="blogInfo['user_image_id'] | imageUrlById" class="w-max-per-100 h-max-per-100">
                </div>
                <div class="font-bolder font-size-14">{{blogInfo['user_name']}}</div>
                <div class="m-t-10 color-gray">{{blogInfo['user_gender']}}</div>
                <div class="m-t-10 color-gray">{{blogInfo['user_blog_count']}}articles</div>
                <div class="m-t-10 color-gray">{{blogInfo['user_create_date']}}</div>
            </div>
            <div class="i-label">CATEGORY</div>
            <div class="i-category-list">
                <div class="i-category-list-item">{{blogInfo['category_name']}}</div>
            </div>

            <div class="i-label">PART</div>
            <div>
                <div class="flex-row align-items-center m-r-10">
                    <i class="el-icon-visibility"></i>
                    <span class="p-h-5 font-old-stamper font-size-18">{{blogInfo['watched']}}</span>
                </div>
            </div>

        </div>


        <div class="flex-grow flex-column overflow-y p-h-50 p-b-50  border-h-gray">
            <div class="flex-shrink flex-row justify-content-end">
                <!-- <div>
                     <button type="button" class="font-old-stamper font-size-16 bg-color-gray-light-soft tappable" mat-flat-button @click="btnGotoEditBlog()" v-if="isForCurrentUser">
                         &lt;&lt;&nbsp;Edit&nbsp;&gt;&gt;
                     </button>
                 </div>
 -->
                <div>
                    <button type="button" class="font-old-stamper font-size-16 bg-color-gray-light-soft tappable" mat-flat-button @click="btnGotoPrevPage()">
                        X&nbsp;CLOSE
                    </button>
                </div>

            </div>
            <div class="flex-shrink font-offline-rough font-size-24 text-center p-t-5 p-b-20">
                {{blogInfo['title']}}
            </div>
            <div class="flex-grow overflow-y flex-column">
                <div class="flex-grow flex-shrink flex-column text-left">
                    <vue-markdown v-if="mdContent">{{mdContent}}</vue-markdown>
                </div>
                <!-- no login -->
                <div class="flex-shrink i-blog-end">

                    <span>{{blogInfo['create_date']}}</span>

                    <!--<button mat-icon-button class=" tappable" matTooltip="changelog ">
                        <i class="el-icon-history"></i>
                    </button>-->

                </div>
            </div>

        </div>


    </div>
</template>

<script>


  import VueMarkdown    from 'vue-markdown';
  import BlogService    from '../service/blog.service';
  import * as Constants from '../util/Constants';
  import CookieUtil     from '../util/CookieUtil';

  export default {
    name      : 'BlogMdViewer',
    components: {
      VueMarkdown,
    },
    data() {
      return {
        blogInfo        : {},
        isForCurrentUser: undefined,
        mdContent       : '',
        // id      : this.$route,
      };
    },
    mounted() {
      this.initPage();
    },
    methods   : {
      async initPage() {

        const id = this.$route.params.id;
        const userInfo = JSON.parse(CookieUtil.cookie(Constants.COOKIE_USER_INFO) || '{}');

        BlogService.queryAll({id: id}).then(returnData => {
          this.blogInfo = returnData[0];

          this.mdContent = this.blogInfo['content'].slice();

          this.isForCurrentUser = userInfo['id'] === this.blogInfo['create_user_id'];
          if (!this.isForCurrentUser) {
            // this.watched(this.blogInfo['id'], this.blogInfo['watched'] + 1);
          }
        }).catch(errorData => {
          throw errorData;
        });
      },
      btnGotoPrevPage() {
        window.history.back();
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
