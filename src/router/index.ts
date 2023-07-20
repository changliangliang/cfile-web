import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/Login.vue'
import HomeVue from "@/views/Home.vue"
import FileDetailVue from '@/views/FileDetail.vue'
import LayoutVue from '@/views/Layout.vue'
import UserVue from '@/views/User.vue'
import RegisterVue from '@/views/Register.vue'
import { useSystemInfo } from '@/store/systemInfo'
import { storeToRefs } from 'pinia'
import { getCurrentUser } from '@/request/userApi'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterVue
    },
    {
      path: '/',
      name: 'layout',
      component: LayoutVue,
      children: [
        {
          path: "/home",
          component: HomeVue
        },
        {
          path: "/filedetail/:id",
          name: "filedetail",
          component: FileDetailVue,
        },
        {
          path: "/user",
          component: UserVue
        },
      ]
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach(async (to, from) => {

  // 不拦截登陆请求
  if (to.name === "login") {
    return true
  }

  // 判断当前用户是否存在
  const systemInfo = useSystemInfo()
  if (systemInfo.currentUser === null) {

    // 尝试获取当前用户
    const resp = await getCurrentUser()
    if (resp === null) {
      return { name: "login" }

    }
    // 保存用户数据
    systemInfo.$patch({ currentUser: resp.data })
  }
  return true
})

export default router
