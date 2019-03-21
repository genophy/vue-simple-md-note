<template>
    <div class="flex-row h-per-100">

        <div class="flex-shrink w-200 border-r-dashed-gray">
            <div class="flex-column m-b-10">
                <button mat-flat-button class="font-old-stamper font-size-20 tappable" @click="btnGotoSetAccount">
                    Account
                </button>
            </div>
            <div class="flex-column m-b-10" v-if="isSetCategoryVisible">
                <button mat-flat-button class="font-old-stamper font-size-20 tappable" @click="btnGotoSetCategory">
                    Category
                </button>
            </div>
            <div class="flex-column m-b-10">
                <button mat-flat-button class="font-old-stamper font-size-20 tappable" @click="btnGotoSetPwd">
                    Password
                </button>
            </div>

        </div>
        <div class="flex-grow overflow-y">
            <router-view/>
        </div>


    </div>

</template>

<script>
  export default {
    name   : 'Settings',
    data() {
      return {
        isSetCategoryVisible: true,
      };
    },
    methods: {
      btnGotoSetAccount() {
        this.$router.push({path: '/main/settings/set-account'});
      },
      btnGotoSetCategory() {
        this.$router.push({path: '/main/settings/set-category'});
      },
      btnGotoSetPwd() {
        this.$router.push({path: '/main/settings/set-pwd'});
      },
    },
  };
</script>

<style scoped>

</style>
