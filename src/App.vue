<template>
    <div id="app" class="h-max-per-100">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "styles";

    #app {
        font-family             : 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing  : antialiased;
        -moz-osx-font-smoothing : grayscale;
        text-align              : center;
        color                   : #2C3E50;
    }

    #nav {
        padding : 30px;

        a {
            font-weight : bold;
            color       : #2C3E50;

            &.router-link-exact-active {
                color : #42B983;
            }
        }
    }
</style>
