import Vue          from 'vue';
import Router       from 'vue-router';
import BlogList     from './components/BlogList';
import BlogMdEditor from './components/BlogMdEditor';
import BlogMdViewer from './components/BlogMdViewer';
import SetAccount   from './components/settings/SetAccount';
import SetCategory  from './components/settings/SetCategory';
import SetPwd       from './components/settings/SetPwd';
import Settings     from './components/settings/Settings';
import Blank        from './views/Blank';
import Login        from './views/Login';
import Main         from './views/Main';

Vue.use(Router);

export default new Router({
  mode  : 'history',
  base  : process.env.BASE_URL,
  routes: [
    {
      path    : '/',
      redirect: '/main',
    },
    {
      path     : '/main',
      component: Main,
      children : [
        {
          path    : '',
          redirect: 'blog-list',
        },
        {
          path     : 'blog-list',
          component: BlogList,
        },
        {
          path     : 'blog-md-editor/:id',
          component: BlogMdEditor,
        },
        {
          path     : 'blog-md-viewer/:id',
          component: BlogMdViewer,
        },
        {
          path     : 'settings',
          component: Settings,
          children : [
            {path:'',redirect:'set-account'},
            {path: 'set-account', component: SetAccount},
            {path: 'set-category', component: SetCategory},
            {path: 'set-pwd', component: SetPwd},
          ],
        },

        {
          path     : 'about',
          component: () => import(/* webpackChunkName: "about" */ './components/About.vue'),
        },
      ],

    },
    {path: '/login', component: Login},
    {path: '/blank', component: Blank},
    {path: '**', redirect: '/'},
  ],
});
