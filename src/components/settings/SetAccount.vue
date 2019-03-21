<template>
    <div class="p-t-50">

        <el-form :model="formPage" label-width="80px" class="border-a-gray p-v-20 p-h-50 w-300 m-auto">
            <div class="flex-row  align-items-center p-v-10">
                <div class="flex-shrink font-old-stamper w-80">name</div>
                <div>{{userName}}</div>
            </div>
            <div class="flex-row align-items-center p-v-10">

                <el-form-item label="gender">
                    <el-radio-group v-model="formPage.gender">
                        <el-radio label="male"></el-radio>
                        <el-radio label="female"></el-radio>
                    </el-radio-group>
                </el-form-item>

            </div>

            <!-- <div class="flex-row i-file-upload-wrap">
                 <input type="file" class="flex-grow w-50 cursor-pointer" ng2FileSelect [uploader]="uploader"/>
                 <div class="i-file-upload-btn flex-row">
                     <button type="button" class="flex-grow bg-color-gray-dark color-gray-light-soft">上传图片</button>
                 </div>
             </div>
 -->
            <el-upload
                class="avatar-uploader"
                action="/api/img/upload"
                :show-file-list="false"
                :with-credentials="true"
                :multiple="false"
                :headers="uploadHeaders"
                :on-success="handleAvatarSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="flex-row justify-content-end p-t-20">
                <el-button type="primary" @click="btnOnUpdate" class="font-offline-rough font-size-12 tappable"> &lt;&lt;&nbsp;SAVE&nbsp;&gt;&gt;</el-button>

            </div>
        </el-form>

    </div>

</template>

<script>
  import AccountService from '../../service/account.service';
  import Constants      from '../../util/Constants';
  import CookieUtil     from '../../util/CookieUtil';
  import Utils          from '../../util/Utils';

  export default {
    name   : 'SetAccount',
    data() {
      return {
        formPage      : {
          gender  : '',
          image_id: '',
        },
        userName      : '',
        imageUrl      : '',
        cookieUserInfo: {},
        uploadHeaders : {'token': CookieUtil.cookie('token')},
      };

    },
    created() {
      this.cookieUserInfo = JSON.parse(CookieUtil.cookie(Constants.COOKIE_USER_INFO) || '{}');
      this.formPage['image_id'] = this.cookieUserInfo['image_id'];
      this.imageUrl = Utils.getImageUrl(this.formPage['image_id']);
      this.userName = this.cookieUserInfo['name'];
      this.formPage['gender'] = this.cookieUserInfo['gender'];

    },
    methods: {
      btnOnUpdate() {

        AccountService.update(CookieUtil.cookie(Constants.COOKIE_USER_TOKEN),
          Utils.objCut({gender: this.formPage['gender'], 'image_id': this.formPage['image_id']}))
        .then(returnData => {
          if (1 === returnData.affectedRows) {
            this.cookieUserInfo['gender'] = this.formPage['gender'];
            this.cookieUserInfo['image_id'] = this.formPage['image_id'];
            CookieUtil.cookie(Constants.COOKIE_USER_INFO, JSON.stringify(this.cookieUserInfo));
            this.$message({
              type: 'success',
              message: 'update success!'
            });
          } else {
            this.$message({
              type: 'error',
              message: 'update error!'
            });
          }

        })
        .catch(errorData => {
          this.$message({
            type: 'error',
            message: 'update error!'
          });
          throw errorData;
        });

      },

      handleAvatarSuccess(res) {
        const id = res['data'].id;
        this.formPage['image_id'] = id;
        this.imageUrl = Utils.getImageUrl(id);

        // this.imageUrl = URL.createObjectURL(file.raw);
      },

    },
  };
</script>

<style scoped lang="scss">
    .avatar-uploader .el-upload {
        border        : 1px dashed #D9D9D9;
        border-radius : 6px;
        cursor        : pointer;
        position      : relative;
        overflow      : hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color : #409EFF;
    }

    .avatar-uploader-icon {
        font-size   : 28px;
        color       : #8C939D;
        width       : 178px;
        height      : 178px;
        line-height : 178px;
        text-align  : center;
    }

    .avatar {
        width   : 100%;
        display : block;
    }
</style>
