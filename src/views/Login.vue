<template>
  <!-- 页面最外层：全屏淡蓝背景、垂直水平居中 -->
  <div class="min-h-screen bg-[#f0f7ff] flex items-center justify-center p-4">
    <!-- 整体大卡片：响应式左右分栏、圆角阴影、溢出裁剪 -->
    <div class="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
      <!-- 左侧品牌图文区（大屏显示，移动端隐藏） -->
      <div class="w-full md:w-1/2 p-10 flex flex-col justify-between text-white relative hidden md:flex bg-gradient-to-br from-[#3D9B6E] to-[#4A90D9]">
        <!-- 装饰圆形背景 -->
        <div class="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10"></div>
        <div class="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/5"></div>

        <div class="relative z-10">
          <!-- Logo + 平台名称 -->
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 10 8 12 12C14 8 12 2 12 2Z" fill="#3D9B6E"></path>
                <path d="M8 6C8 6 6 10 8 14C10 10 8 6 8 6Z" fill="#3D9B6E" opacity="0.7"></path>
                <path d="M16 6C16 6 14 10 16 14C18 10 16 6 16 6Z" fill="#3D9B6E" opacity="0.7"></path>
                <path d="M12 12V18" stroke="#3D9B6E" stroke-linecap="round" stroke-width="1.5"></path>
                <path d="M5 22C5 22 7 18 10 19" fill="none" stroke="#3D9B6E" stroke-linecap="round" stroke-width="1.5"></path>
                <path d="M19 22C19 22 17 18 14 19" fill="none" stroke="#3D9B6E" stroke-linecap="round" stroke-width="1.5"></path>
                <ellipse cx="9.5" cy="15" fill="#3D9B6E" opacity="0.6" rx="2" ry="1" transform="rotate(-30 9.5 15)"></ellipse>
                <ellipse cx="14.5" cy="14.5" fill="#3D9B6E" opacity="0.6" rx="2" ry="1" transform="rotate(30 14.5 14.5)"></ellipse>
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight">青耘课堂-智慧教学平台</span>
          </div>

          <h1 class="text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-tight mb-4">
            开启您的<br>数字化学习之旅
          </h1>
          <p class="text-blue-100 text-lg">
            汇聚名师资源，打造智能化教学闭环，让学习更高效、更纯粹。
          </p>
        </div>

        <div class="relative z-10 mt-8">
          <img
            class="w-full rounded-xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-500"
            src="https://modao.cc/agent-py/media/generated_images/2026-06-24/81cc90ef7d134a98916cceeb6a3e1052.jpg"
            alt="课堂学习配图"
          />
          <div class="mt-6 flex items-center gap-3">
            <div class="flex -space-x-2">
              <div class="w-8 h-8 rounded-full border-2 border-white bg-blue-200 flex items-center justify-center overflow-hidden">
                <iconify-icon class="text-blue-600 text-base" icon="mdi:account"></iconify-icon>
              </div>
              <div class="w-8 h-8 rounded-full border-2 border-white bg-green-200 flex items-center justify-center overflow-hidden">
                <iconify-icon class="text-green-600 text-base" icon="mdi:account"></iconify-icon>
              </div>
              <div class="w-8 h-8 rounded-full border-2 border-white bg-yellow-200 flex items-center justify-center overflow-hidden">
                <iconify-icon class="text-yellow-600 text-base" icon="mdi:account"></iconify-icon>
              </div>
            </div>
            <span class="text-sm text-white">已有 50,000+ 学员加入我们</span>
          </div>
        </div>
      </div>

      <!-- 右侧表单区域：登录/注册切换容器 -->
      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
        <!-- 顶部 Tab：登录 / 注册 双向切换 -->
        <div class="flex gap-8 mb-10 border-b border-gray-100">
          <button
            class="pb-4 text-lg font-semibold transition-all border-b-2"
            :class="isLoginPage ? 'border-[#3D9B6E] text-[#3D9B6E]' : 'border-transparent text-gray-400 hover:text-gray-600'"
            @click="isLoginPage = true"
          >
            登录
          </button>
          <button
            class="pb-4 text-lg font-semibold transition-all border-b-2"
            :class="!isLoginPage ? 'border-[#3D9B6E] text-[#3D9B6E]' : 'border-transparent text-gray-400 hover:text-gray-600'"
            @click="isLoginPage = false"
          >
            注册
          </button>
        </div>

        <!-- ===================== 登录面板 ===================== -->
        <div class="flex-1" v-show="isLoginPage">
          <!-- 登录子Tab：账号登录 / 验证码登录 -->
          <div class="flex p-1 bg-gray-50 rounded-xl mb-8">
            <button
              class="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
              :class="loginType === 'pwd' ? 'bg-white shadow-sm text-[#3D9B6E]' : 'text-gray-500 hover:text-gray-700'"
              @click="loginType = 'pwd'"
            >
              账号登录
            </button>
            <button
              class="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
              :class="loginType === 'code' ? 'bg-white shadow-sm text-[#3D9B6E]' : 'text-gray-500 hover:text-gray-700'"
              @click="loginType = 'code'"
            >
              验证码登录
            </button>
          </div>

          <!-- 账号密码登录表单 -->
          <form class="space-y-5" v-show="loginType === 'pwd'" @submit.prevent="submitLoginPwd">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700 ml-1">账号</label>
              <div class="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#3D9B6E] focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] bg-gray-50 transition-all">
                <iconify-icon class="text-gray-400 mr-3 text-xl" icon="mdi:account-outline"></iconify-icon>
                <input
                  v-model="loginPwdForm.account"
                  class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-400"
                  placeholder="用户名/邮箱/手机号"
                  required
                />
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700 ml-1">密码</label>
              <div class="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#3D9B6E] focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] bg-gray-50 transition-all">
                <iconify-icon class="text-gray-400 mr-3 text-xl" icon="mdi:lock-outline"></iconify-icon>
                <input
                  v-model="loginPwdForm.password"
                  :type="pwdVisible ? 'text' : 'password'"
                  class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-400"
                  placeholder="请输入您的密码"
                  required
                />
                <button type="button" class="text-gray-400 hover:text-gray-600" @click="pwdVisible = !pwdVisible">
                  <iconify-icon class="text-xl" :icon="pwdVisible ? 'mdi:eye-outline' : 'mdi:eye-off-outline'" :class="pwdVisible ? 'text-[#3D9B6E]' : ''"></iconify-icon>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input v-model="rememberPwd" class="w-4 h-4 rounded border-gray-300 accent-[#3D9B6E]" type="checkbox">
                <span class="text-gray-500 group-hover:text-gray-700">记住密码</span>
              </label>
              <a href="#" class="text-[#3D9B6E] hover:underline font-medium">忘记密码？</a>
            </div>
            <button
              type="submit"
              class="w-full bg-[#3D9B6E] hover:bg-[#2E8A5E] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
              :disabled="loading"
            >
              <span>{{ loading ? '登录中...' : '立即登录' }}</span>
            </button>
          </form>

          <!-- 验证码登录表单 -->
          <form class="space-y-5" v-show="loginType === 'code'" @submit.prevent="submitLoginCode">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700 ml-1">手机号</label>
              <div class="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#3D9B6E] focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] bg-gray-50 transition-all">
                <iconify-icon class="text-gray-400 mr-3 text-xl" icon="mdi:cellphone"></iconify-icon>
                <input
                  v-model="loginCodeForm.phone"
                  class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-400"
                  placeholder="请输入手机号"
                  pattern="^1[3-9]\d{9}$"
                  required
                />
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700 ml-1">验证码</label>
              <div class="flex gap-3">
                <div class="flex-1 flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#3D9B6E] focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] bg-gray-50 transition-all">
                  <iconify-icon class="text-gray-400 mr-3 text-xl" icon="mdi:shield-check-outline"></iconify-icon>
                  <input
                    v-model="loginCodeForm.code"
                    class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-400"
                    maxlength="6"
                    placeholder="6位验证码"
                    required
                  />
                </div>
                <button
                  class="px-4 py-3 bg-green-50 text-[#3D9B6E] font-medium rounded-xl hover:bg-green-100 whitespace-nowrap text-sm min-w-[110px]"
                  :disabled="loginCodeCount > 0"
                  @click="getLoginCode"
                  type="button"
                >
                  {{ loginCodeCount > 0 ? `${loginCodeCount}s 重发` : '获取验证码' }}
                </button>
              </div>
            </div>
            <button
              type="submit"
              class="w-full bg-[#3D9B6E] hover:bg-[#2E8A5E] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
              :disabled="loading"
            >
              <span>{{ loading ? '登录中...' : '验证并登录' }}</span>
            </button>
          </form>

          <!-- 第三方登录 -->
          <div class="mt-10">
            <div class="relative flex items-center mb-6">
              <div class="flex-grow border-t border-gray-100"></div>
              <span class="px-4 text-xs text-gray-400 uppercase tracking-widest">其他方式登录</span>
              <div class="flex-grow border-t border-gray-100"></div>
            </div>
            <div class="flex justify-center gap-6">
              <button class="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all text-green-500">
                <iconify-icon class="text-2xl" icon="ri:wechat-fill"></iconify-icon>
              </button>
              <button class="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all text-blue-500">
                <iconify-icon class="text-2xl" icon="ri:qq-fill"></iconify-icon>
              </button>
              <button class="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all text-gray-700">
                <iconify-icon class="text-2xl" icon="ri:github-fill"></iconify-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- ===================== 注册面板 ===================== -->
        <div class="flex-1" v-show="!isLoginPage">
          <form class="space-y-4" @submit.prevent="submitRegister">
            <!-- 身份选择：学生 / 老师 -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 ml-1">选择身份</label>
              <div class="flex gap-3">
                <label
                  class="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-4 cursor-pointer transition-all"
                  :class="userRole === '1' ? 'border-2 border-[#3D9B6E] bg-green-50' : 'border-2 border-gray-200'"
                  @click="userRole = '1'"
                >
                  <iconify-icon class="text-xl" :class="userRole === '1' ? 'text-[#3D9B6E]' : 'text-gray-400'" icon="mdi:account-school-outline"></iconify-icon>
                  <span class="font-medium" :class="userRole === '1' ? 'text-[#3D9B6E]' : 'text-gray-500'">注册为学生</span>
                  <input v-model="userRole" value="1" name="role" type="radio" class="hidden">
                </label>
                <label
                  class="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-4 cursor-pointer transition-all"
                  :class="userRole === '2' ? 'border-2 border-[#3D9B6E] bg-green-50' : 'border-2 border-gray-200'"
                  @click="userRole = '2'"
                >
                  <iconify-icon class="text-xl" :class="userRole === '2' ? 'text-[#3D9B6E]' : 'text-gray-400'" icon="mdi:chalkboard-teacher"></iconify-icon>
                  <span class="font-medium" :class="userRole === '2' ? 'text-[#3D9B6E]' : 'text-gray-500'">注册为老师</span>
                  <input v-model="userRole" value="2" name="role" type="radio" class="hidden">
                </label>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700 ml-1">手机号</label>
              <div class="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#3D9B6E] focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] bg-gray-50 transition-all">
                <iconify-icon class="text-gray-400 mr-3 text-xl" icon="mdi:cellphone"></iconify-icon>
                <input
                  v-model="regForm.phone"
                  class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-400"
                  placeholder="请输入手机号"
                  pattern="^1[3-9]\d{9}$"
                  required
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700 ml-1">验证码</label>
              <div class="flex gap-3">
                <div class="flex-1 flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#3D9B6E] focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] bg-gray-50 transition-all">
                  <iconify-icon class="text-gray-400 mr-3 text-xl" icon="mdi:shield-check-outline"></iconify-icon>
                  <input
                    v-model="regForm.code"
                    class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-400"
                    maxlength="6"
                    placeholder="输入验证码"
                    required
                  />
                </div>
                <button
                  class="px-4 py-3 bg-green-50 text-[#3D9B6E] font-medium rounded-xl hover:bg-green-100 whitespace-nowrap text-sm min-w-[110px]"
                  :disabled="regCodeCount > 0"
                  @click="getRegCode"
                  type="button"
                >
                  {{ regCodeCount > 0 ? `${regCodeCount}s 重发` : '获取验证码' }}
                </button>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700 ml-1">设置密码</label>
              <div class="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#3D9B6E] focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] bg-gray-50 transition-all">
                <iconify-icon class="text-gray-400 mr-3 text-xl" icon="mdi:lock-outline"></iconify-icon>
                <input
                  v-model="regForm.pwd"
                  :type="regPwdVisible ? 'text' : 'password'"
                  class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-400"
                  minlength="8"
                  placeholder="8-20位字母、数字组合"
                  required
                />
                <button type="button" class="text-gray-400 hover:text-gray-600" @click="regPwdVisible = !regPwdVisible">
                  <iconify-icon class="text-xl" :icon="regPwdVisible ? 'mdi:eye-outline' : 'mdi:eye-off-outline'" :class="regPwdVisible ? 'text-[#3D9B6E]' : ''"></iconify-icon>
                </button>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700 ml-1">确认密码</label>
              <div class="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#3D9B6E] focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] bg-gray-50 transition-all">
                <iconify-icon class="text-gray-400 mr-3 text-xl" icon="mdi:lock-check-outline"></iconify-icon>
                <input
                  v-model="regForm.pwdConfirm"
                  class="bg-transparent flex-1 outline-none text-gray-800 placeholder-gray-400"
                  placeholder="请再次输入密码"
                  required
                />
              </div>
            </div>

            <div class="pt-2">
              <label class="flex items-start gap-2 cursor-pointer group">
                <input v-model="agreeProtocol" class="mt-1 w-4 h-4 rounded border-gray-300 accent-[#3D9B6E]" type="checkbox" required>
                <span class="text-xs text-gray-500 leading-relaxed">
                  我已阅读并同意 <a class="text-[#3D9B6E] hover:underline" href="#">《用户协议》</a>、<a class="text-[#3D9B6E] hover:underline" href="#">《隐私政策》</a> 及 <a class="text-[#3D9B6E] hover:underline" href="#">《课程服务条款》</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              class="w-full bg-[#3D9B6E] hover:bg-[#2E8A5E] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98] mt-4"
              :disabled="loading"
            >
              <span>{{ loading ? '提交中...' : '立即注册' }}</span>
            </button>
          </form>
        </div>

        <!-- 底部版权链接 -->
        <div class="mt-auto pt-8 text-center">
          <p class="text-xs text-gray-400">© 2026 青耘课堂-智慧教学平台 版权所有</p>
          <div class="flex justify-center gap-4 mt-2">
            <a href="#" class="text-xs text-gray-400 hover:text-[#3D9B6E]">关于我们</a>
            <a href="#" class="text-xs text-gray-400 hover:text-[#3D9B6E]">帮助中心</a>
            <a href="#" class="text-xs text-gray-400 hover:text-[#3D9B6E]">联系客服</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 全局Toast提示弹窗 -->
  <div
    class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm shadow-2xl z-50 flex items-center gap-2 transition-opacity duration-300 pointer-events-none"
    :style="{opacity: toastShow ? 1 : 0}"
  >
    <iconify-icon class="text-lg" :class="toastType==='success'?'text-green-400':'text-red-400'" :icon="toastType==='success'?'mdi:check-circle':'mdi:alert-circle'"></iconify-icon>
    <span>{{ toastMsg }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 页面切换标记：true=登录页 false=注册页
const isLoginPage = ref(true)
// 登录子类型 pwd账号登录 / code验证码登录
const loginType = ref('pwd')
// 加载状态
const loading = ref(false)

// ========== 登录表单数据 ==========
const pwdVisible = ref(false)
const rememberPwd = ref(false)
const loginPwdForm = ref({ account: '', password: '' })

const loginCodeCount = ref(0)
const loginCodeForm = ref({ phone: '', code: '' })

// ========== 注册表单数据 ==========
const userRole = ref('1')
const regPwdVisible = ref(false)
const regCodeCount = ref(0)
const agreeProtocol = ref(false)
const regForm = ref({
  phone: '',
  code: '',
  pwd: '',
  pwdConfirm: ''
})

// ========== Toast弹窗方法 ==========
const toastShow = ref(false)
const toastMsg = ref('')
const toastType = ref('success')
const showToast = (msg, type = 'success') => {
  toastMsg.value = msg
  toastType.value = type
  toastShow.value = true
  setTimeout(() => toastShow.value = false, 3000)
}

// ========== 验证码倒计时通用封装 ==========
const startCountDown = (countRef, phoneValue) => {
  if (!/^1[3-9]\d{9}$/.test(phoneValue)) {
    showToast('请输入有效的手机号', 'error')
    return
  }
  countRef.value = 60
  showToast('验证码已发送')
  const timer = setInterval(() => {
    countRef.value--
    if (countRef.value <= 0) clearInterval(timer)
  }, 1000)
}
const getLoginCode = () => startCountDown(loginCodeCount, loginCodeForm.value.phone)
const getRegCode = () => startCountDown(regCodeCount, regForm.value.phone)

// ===================== 模拟账号数据库（role：1学生 2教师 3管理员） =====================
const userDB = [
  { account: 'student1', pwd: '123456', role: '1' },
  { account: 'teacher1', pwd: '123456', role: '2' },
  { account: 'admin1', pwd: '123456', role: '3' }
]

// ========== 账号密码登录提交（按数字角色自动跳转对应首页） ==========
const submitLoginPwd = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    const user = userDB.find(item =>
      item.account === loginPwdForm.value.account &&
      item.pwd === loginPwdForm.value.password
    )
    if (!user) {
      showToast('账号或密码错误', 'error')
      return
    }
    // 存储登录状态 + 数字角色标识
    localStorage.setItem('isLogin', '1')
    localStorage.setItem('userRole', user.role)
    showToast('登录成功，自动跳转对应首页')
    // 根据 role 1/2/3 分别跳转
    if (user.role === '1') {
      router.push('/student')
    } else if (user.role === '2') {
      router.push('/teacher')
    } else {
      router.push('/admin')
    }
  }, 1200)
}

// ========== 验证码登录（默认角色1学生） ==========
const submitLoginCode = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    localStorage.setItem('isLogin', '1')
    localStorage.setItem('userRole', '1')
    showToast('验证码登录成功')
    router.push('/student')
  }, 1200)
}

// ========== 注册提交 + 注册成功自动切回登录 ==========
const submitRegister = () => {
  if (regForm.value.pwd !== regForm.value.pwdConfirm) {
    showToast('两次输入密码不一致', 'error')
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast('注册成功，请前往登录')
    setTimeout(() => isLoginPage.value = true, 1500)
  }, 1500)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
body {
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
/* 消除浏览器默认聚焦黑框 */
input:focus, button:focus {
  outline: none;
}
</style>