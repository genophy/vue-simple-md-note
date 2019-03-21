<template>
    <div class=" p-a-20 flex-row">
        <div class="flex-shrink  w-100 text-center">
            <div class="i-user-img">
                <img :src="itemInfo['user_image_id'] | imageUrlById" v-if="itemInfo['user_image_id']">
            </div>
            <div class="i-user-name">
                {{itemInfo['user_name']}}
            </div>

            <div class="font-offline-rough font-size-12 color-gray-dark p-t-20">
                [{{itemInfo['category_name']}}]
            </div>
        </div>
        <div class="flex-grow flex-column">

            <div class="flex-shrink flex-row justify-content-space-between align-items-center p-b-10">
                <div class="flex-row align-items-center">
                    <span class="font-offline-rough font-size-24">{{itemInfo['title']}}</span>
                    <span class="font-offline-rough font-size-12 p-l-20 color-gray">{{itemInfo['create_date']}}</span>
                </div>
                <div class="flex-row align-items-center">
                    <span class="font-offline-rough font-size-12 p-l-20">{{itemInfo['update_date']}}</span>
                    <i class="el-icon-update"></i>
                </div>
            </div>

            <div class="border-b-gray"></div>
            <div class="flex-shrink p-v-10 no-overflow word-break h-max-50 i-content text-left">

                <vue-markdown>{{mdContent}}</vue-markdown>
            </div>
            <div class="flex-shrink m-v-10 flex-row align-items-center justify-content-space-between no-select">
                <div class="flex-shrink flex-row align-items-center">
                    <div class="flex-row align-items-center m-r-10">
                        <i class="el-icon-view"></i>
                        <span class="p-h-5 font-old-stamper font-size-18">{{itemInfo['watched']}}</span>
                    </div>
                </div>
                <div class="flex-shrink align-items-center">
                    <button type="button" class="font-old-stamper font-size-16 bg-color-gray-light-soft tappable m-r-20" mat-flat-button @click="btnDeleteBlogByBlogId(itemInfo['id'])"
                            v-if="true === isForCurrentUser"> DELETE&nbsp;&gt;&gt;
                    </button>

                    <button type="button" class="font-old-stamper font-size-16 bg-color-gray-light-soft tappable m-r-20" mat-flat-button @click="gotoBlogDetailForEdit()" v-if="true === isForCurrentUser">
                        EDIT&nbsp;&gt;&gt;
                    </button>

                    <button type="button" class="font-old-stamper font-size-16 bg-color-gray-light-soft tappable" mat-flat-button @click="gotoBlogDetailForView()"> VIEW
                        IT&nbsp;&gt;&gt;
                    </button>
                </div>

            </div>
            <div class="border-b-gray"></div>
        </div>
    </div>
</template>

<script>

  import VueMarkdown from 'vue-markdown';
  import Constants   from '../util/Constants';
  import CookieUtil  from '../util/CookieUtil';

  export default {
    name : 'BlogListItem',
    props: ['item'],

    components: {
      VueMarkdown,
    },
    data() {
      return {
        itemInfo        : this.item,
        mdContent       : '',
        isForCurrentUser: false,
      };
    },
    created() {

      const userInfo = JSON.parse(CookieUtil.cookie(Constants.COOKIE_USER_INFO) || '{}');

      this.isForCurrentUser = userInfo['id'] === this.itemInfo['create_user_id'];
      // this.mdContent = marked(this.itemInfo['content'].slice(0, 128));
      this.mdContent = this.itemInfo['content'].slice(0, 128);
    },

    methods: {

      gotoBlogDetailForEdit() {
        this.$router.push(`/main/blog-md-editor/${this.itemInfo['id']}`);
      },

      gotoBlogDetailForView() {
        this.$router.push(`/main/blog-md-viewer/${this.itemInfo['id']}`);
      },
      btnDeleteBlogByBlogId(blogId) {


        this.$confirm('delete this blog?', 'Confirm', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // confirm , if delete
          this._delBlogById(blogId).then(()=>{
            this.$message({
              type: 'success',
              message: 'delete success!'
            });
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'user cancel!'
          });
        });




      },
      _delBlogById(blogId) {
        return new Promise(resolve => {
          this.blogService.del(blogId).then(returnData => {
            if (1 === returnData['affectedRows']) {
              console.log('Del Success!!!');
              this.elementRef.nativeElement.remove();
              this.blogListChangeHelper.dispatch(true);
            } else {
              console.error('Del Fail!!!');
            }
            resolve(true);
          }).catch(errorData => {
            console.error(errorData);
            resolve(true);
          });
        });
      },
    },

  };
</script>

<style scoped lang="scss">
    .i-content {
        position : relative;

        &:after {
            content    : '';
            position   : absolute;
            bottom     : 0;
            left       : 0;
            right      : 0;
            height     : 20px;
            background : linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(243, 243, 243, 1));
        }

    }

    .i-user-img {
        width           : 60px;
        height          : 60px;
        margin          : auto;
        border          : 1px solid #E2E2E2;
        display         : flex;
        flex-flow       : row nowrap;
        justify-content : center;
        align-items     : center;

        img {
            max-width  : 100%;
            max-height : 100%;
        }
    }

    .i-user-name {
        padding   : 5px 0;
        font-size : 12px;
    }

</style>
