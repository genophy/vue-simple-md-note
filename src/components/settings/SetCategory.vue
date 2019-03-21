<template>
    <div class="p-t-50">
        <div class="border-a-gray p-v-20 p-h-50 w-500 m-auto flex-row flex-wrap">
            <el-tag
                :key="category.id"
                v-for="category in categoryList"
                closable
                :disable-transitions="false"
                @close="btnRemove(category)">
                {{category.name}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

        </div>

    </div>

</template>

<script>

  import CategoryService from '../../service/category.service';

  export default {
    name   : 'SetCategory',
    data() {
      return {
        categoryList: [],
        inputVisible: false,
        inputValue  : '',
      };
    },
    created() {
      this.queryAllCategory();
    },
    methods: {
      btnRemove(category) {
        CategoryService.del(category.id).then(returnData => {
          if (1 === returnData.affectedRows) {
            const index = this.categoryList.indexOf(category);
            if (index >= 0) {
              this.categoryList.splice(index, 1);
            }

            this.$message({
              type   : 'success',
              message: 'Del Category Success!',
            });
          } else {

            this.$message({
              type   : 'error',
              message: 'Del Category Fail!',
            });

          }

        }).catch(() => {

          this.$message({
            type   : 'error',
            message: 'Del Category Error!',
          });
        });

      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let categoryName = this.inputValue;
        if (categoryName) {

          CategoryService.insert(categoryName).then(returnData => {
            if (1 === returnData.affectedRows) {
              this.$message({
                type   : 'success',
                message: 'Add Category Success!',
              });
              this.queryAllCategory();

            } else {
              this.$message({
                type   : 'error',
                message: 'Add Category Fail!',
              });
            }

          }).catch(() => {
            this.$message({
              type   : 'error',
              message: 'Add Category Error!',
            });
          });

        }
      },
      queryAllCategory() {
        CategoryService.queryAll().then(returnData => {
          this.categoryList = returnData;
          this.inputVisible = false;
          this.inputValue = '';
        }).catch(() => {
          this.$message({
            type   : 'error',
            message: 'get Category Error!',
          });
        });
      },
    },
  };
</script>

<style scoped lang="scss">
    .el-tag {
        margin: 5px 10px 5px 0 ;
    }

    .button-new-tag {
        height         : 32px;
        line-height    : 30px;
        padding-top    : 0;
        padding-bottom : 0;
    }

    .input-new-tag {
        width          : 90px;
        vertical-align : bottom;
    }
</style>
