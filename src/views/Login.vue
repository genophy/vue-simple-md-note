<template>
    <el-form class="p-t-150" ref="form" :model="accountForm" label-width="80px">

        <div class="border-a-gray p-a-20 w-300 m-auto">
            <div class="font-game-cube m-b-20">
                Simple Blog
            </div>
            <div class="p-h-15">
                <div class="font-size-12 flex-row align-items-center">
                    <el-form-item label="Name">
                        <el-input type="input" v-model="accountForm.name"></el-input>
                    </el-form-item>
                </div>
                <div class="font-size-12 flex-row align-items-center">
                    <el-form-item label="Password">
                        <el-input type="password" v-model="accountForm.password"></el-input>
                    </el-form-item>
                </div>
            </div>

            <div class="flex-row  p-a-10 justify-content-end">
                <el-form-item>
                    <el-button type="primary" class="font-old-stamper font-size-24" @click="btnOnSubmit">login</el-button>
                </el-form-item>

            </div>

            <div class="text-right p-a-10 color-gray">
                <a class="font-size-12 cursor-pointer" @click="btnRegister()">
                    register
                </a>
            </div>
        </div>

    </el-form>

</template>

<script lang="js">
  import AuthService from '../service/auth.service';

  export default {
    name   : 'Login',
    data() {
      return {
        accountForm: {name: '', password: ''},
      };
    },
    methods: {
      btnOnSubmit() {
        AuthService.logIn(this.accountForm.name, this.accountForm.password).then(()=>{
          this.$router.replace({path: '/'});
        }).catch(function(reason) { throw reason;});
      },
      btnRegister() {

      },

    },
  };
</script>

<style scoped>

</style>
