<template>
  <div class="min-h-screen bg-[#f0f7ff] p-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-[#3D9B6E]">青耘课堂 · 系统管理后台</h1>
        <button @click="logout" class="px-4 py-2 bg-[#3D9B6E] text-white rounded-lg hover:bg-[#2E8A5E]">
          退出登录
        </button>
      </div>
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-xl mb-4">欢迎系统管理员</h2>
        <p class="text-gray-600">可选功能：用户管理、角色权限、课程审核、系统配置</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  localStorage.clear()
  router.push('/login')
}
</script>
<style></style>