import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import HomeStudent from '../views/HomeStudent.vue'
import HomeTeacher from '../views/HomeTeacher.vue'
import HomeAdmin from '../views/HomeAdmin.vue'

// 登录鉴权 + 身份越权拦截
const authGuard = (to, from, next) => {
  const isLogin = localStorage.getItem('isLogin')
  const role = localStorage.getItem('userRole')
  if (!isLogin) {
    next('/login')
    return
  }
  // 身份校验，访问页面与角色不匹配自动跳转正确首页
  if (to.path === '/student' && role !== '1') {
    next(role === '2' ? '/teacher' : '/admin')
  } else if (to.path === '/teacher' && role !== '2') {
    next(role === '1' ? '/student' : '/admin')
  } else if (to.path === '/admin' && role !== '3') {
    next(role === '1' ? '/student' : '/teacher')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    redirect: to => {
      const isLogin = localStorage.getItem('isLogin')
      if (!isLogin) return '/login'
      const role = localStorage.getItem('userRole')
      if (role === '1') return '/student'
      else if (role === '2') return '/teacher'
      return '/admin'
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/student',
    component: HomeStudent,
    beforeEnter: authGuard
  },
  {
    path: '/teacher',
    component: HomeTeacher,
    beforeEnter: authGuard
  },
  {
    path: '/admin',
    component: HomeAdmin,
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router