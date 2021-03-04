import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter';
import UsersFooter from './pages/UsersFooter';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/' , redirect: '/teams'},
      { name: 'teams', path: '/teams', 
      meta: { needsAuth : true },
      components: { default : TeamsList , footer : TeamsFooter },
      children:[{ name: 'team-members', path: ':teamId' , component: TeamMembers, props: true},] }, //alias: '/'// our-domain.com/teams => TeamsList
      { path: '/users', components: {default: UsersList , footer : UsersFooter}, 
      beforeEnter(to, from, next) {
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      } },
      { path: '/:notFound(.*)' , component: NotFound},
     // { path: '/teams' , component: NotFound}
    ],
    linkActiveClass : 'active',
    scrollBehavior( to , from, savedPosition) {
      console.log(to, from, savedPosition);
      if(savedPosition) {
        return savedPosition;
      }
      return {left: 0 , top: 0};
    }
  });
  
  router.beforeEach(function(to, from, next){
    console.log('Global BeforeEach');
    console.log(to, from);
    
    if(to.meta.needsAuth) {
      console.log('Need Auth !');
      next();
    } else {
      next();
    }
  });
  
  router.afterEach(function (to, from) {
    console.log('Global AfterEach');
    console.log(to, from);
  });

  export default router;