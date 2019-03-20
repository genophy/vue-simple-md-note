<template>
    <div class="flex-row h-per-100">
        <div class="flex-shrink flex-column w-200 no-select">
            <div class="flex-shrink i-label">CATEGORY</div>
            <div class="flex-grow flex-column i-category-list">
                <div class="flex-shrink i-category-list-item border-b-gray" :class="{'selected':'' === currentCategoryIdSelected}" @click="btnSearchByCategoryId()">-- ALL --
                    <span class="p-h-5">[ {{blogTotalByCategory}} ]</span>
                </div>
                <div class="flex-grow overflow-y p-b-50">
                    <div class="i-category-list-item" :class="{'selected':category.id === currentCategoryIdSelected}" v-for="category in categoryList" :key="category.id"
                         @click="btnSearchByCategoryId(category.id)">{{category.name}}
                        <span class="p-h-5" :class="{'color-gray-dark':!category.blog_count}">[ {{category.blog_count}} ]</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="flex-grow flex-column">
            <el-form ref="form" :model="formSearch" label-width="80px" class="flex-shrink flex-row align-items-center justify-content-end">
                <el-form-item label="Author">
                    <el-input v-model="formSearch.user_name"></el-input>
                </el-form-item>
                <el-form-item label="content">
                    <el-input v-model="formSearch.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="font-old-stamper font-size-24" @click="queryAll">Search&nbsp;&gt;&gt;</el-button>
                </el-form-item>

            </el-form>
            <div class="flex-grow overflow-y">
                <div v-for="blogItem in blogList" :key="blogItem.id">
                    <blog-list-item :item="blogItem"></blog-list-item>
                </div>
                <div class="p-t-100 text-center" v-if="dataLoaded && !blogList[0]"> -- 暂无数据 --</div>
            </div>

        </div>

    </div>

</template>

<script>

  import BlogService     from '../service/blog.service';
  import CategoryService from '../service/category.service';
  import Utils           from '../util/Utils';
  import BlogListItem    from './BlogListItem';

  export default {
    name      : 'BlogList',
    components: {BlogListItem},
    comments  : [
      BlogListItem,
    ],

    data() {
      return {
        formSearch               : {
          user_name  : '',
          category_id: '',
          content    : '',
        },
        blogList                 : [],
        categoryList             : [],
        currentCategoryIdSelected: '',
        blogTotalByCategory      : 0,
        dataLoaded               : false,
      };
    },

    created() {
      this.queryAllCategoryWithBlogCount();
      this.queryAll();

    },
    methods: {
      queryAllCategoryWithBlogCount() {
        this.blogTotalByCategory = 0;
        CategoryService.queryAllWithBlogCount().then(returnData => {
          this.categoryList = returnData;
          (returnData || []).forEach(item => {
            this.blogTotalByCategory += item['blog_count'];
          });
        }).catch(errorData => {
          console.error('-----------> queryAllCategoryWithBlogCount', errorData);
        });
      },
      btnSearchByCategoryId(categoryId = '') {
        this.currentCategoryIdSelected = categoryId;
        this.queryAll();
      },

      queryAll() {
        this.dataLoaded = false;
        BlogService.queryAll(
          Utils.objCut(Utils.objConcat({category_id: this.currentCategoryIdSelected}, this.formSearch, {pageNum: 1, pageSize: 10})))
        .then(returnData => {
          this.blogList = returnData;
          this.dataLoaded = true;
        })
        .catch(errorData => {
          this.dataLoaded = true;
          throw errorData;
        });
      },
    },

  };


</script>

<style scoped lang="scss">
    .i-label {
        font-family : BlogOldStamper, BlogZHBenMoJinHei, serif;
        margin-top  : 50px;

    }


    .i-category-list {
        padding     : 5px 0;
        font-family : BlogOfflineRough, BlogZHBenMoJinHei, serif;
        font-size   : 12px;
        text-align  : right;

        .i-category-list-item {
            padding            : 10px;
            cursor             : pointer;
            max-width          : 190px;
            overflow           : hidden;
            text-overflow      : ellipsis;
            -webkit-box-orient : vertical;
            -webkit-line-clamp : 1;

            &:hover {
                text-decoration : underline;
            }

            &.selected {
                color      : #F3F3F3;
                background : #222;
            }
        }
    }

    .i-key-list {
        padding     : 5px 0;
        display     : flex;
        flex-flow   : row wrap;
        font-size   : 12px;
        font-family : BlogOfflineRough, BlogZHBenMoJinHei, serif;

        > .i-key-list-item {

            margin-right       : 5px;
            padding            : 5px;
            cursor             : pointer;
            max-width          : 80px;
            overflow           : hidden;
            text-overflow      : ellipsis;
            -webkit-box-orient : vertical;
            -webkit-line-clamp : 1;

            &:hover {
                text-decoration : underline;
            }
        }
    }

</style>
