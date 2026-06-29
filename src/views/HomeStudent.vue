<template>
<div class="flex h-screen overflow-hidden bg-[#f5f8fc]">
  <!-- 左侧侧边栏 -->
  <aside class="w-60 bg-white border-r border-gray-100 flex flex-col z-20">
    <div class="h-16 flex items-center px-6 border-b border-gray-50">
      <svg class="w-7 h-7 mr-2" fill="none" viewBox="0 0 24 24">
        <path d="M12 2C12 2 10 8 12 12C14 8 12 2 12 2Z" fill="#3D9B6E"></path>
        <path d="M8 6C8 6 6 10 8 14C10 10 8 6 8 6Z" fill="#3D9B6E" opacity="0.7"></path>
        <path d="M16 6C16 6 14 10 16 14C18 10 16 6 16 6Z" fill="#3D9B6E" opacity="0.7"></path>
        <path d="M12 12V18" stroke="#3D9B6E" stroke-linecap="round" stroke-width="1.5"></path>
        <path d="M5 22C5 22 7 18 10 19" fill="none" stroke="#3D9B6E" stroke-linecap="round" stroke-width="1.5"></path>
        <path d="M19 22C19 22 17 18 14 19" fill="none" stroke="#3D9B6E" stroke-linecap="round" stroke-width="1.5"></path>
        <ellipse cx="9.5" cy="15" fill="#3D9B6E" opacity="0.6" rx="2" ry="1" transform="rotate(-30 9.5 15)"></ellipse>
        <ellipse cx="14.5" cy="14.5" fill="#3D9B6E" opacity="0.6" rx="2" ry="1" transform="rotate(30 14.5 14.5)"></ellipse>
      </svg>
      <span class="text-[#3D9B6E] font-bold text-lg tracking-tight">青耘-智慧教育</span>
    </div>
    <nav class="flex-1 py-4 overflow-y-auto hide-scrollbar">
    <div
        class="sidebar-item flex items-center px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
        :class="page==='courses'?'active':''"
        @click="switchPage('courses')"
    >
        <iconify-icon class="text-xl mr-3 group-hover:scale-110 transition-transform" icon="solar:book-bookmark-linear"></iconify-icon>
        <span class="font-medium">我的课程</span>
    </div>
    <div
        class="sidebar-item flex items-center px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
        :class="page==='assignments'?'active':''"
        @click="switchPage('assignments')"
    >
        <iconify-icon class="text-xl mr-3 group-hover:scale-110 transition-transform" icon="solar:document-text-linear"></iconify-icon>
        <span class="font-medium">我的作业</span>
    </div>
    <div
        class="sidebar-item flex items-center px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors relative"
        :class="page==='notifications'?'active':''"
        @click="switchPage('notifications')"
    >
        <iconify-icon class="text-xl mr-3 group-hover:scale-110 transition-transform" icon="solar:bell-linear"></iconify-icon>
        <span class="font-medium">系统通知</span>
        <span class="absolute left-10 top-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
    </div>
    <div
        class="sidebar-item flex items-center px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
        :class="page==='studyroom'?'active':''"
        @click="switchPage('studyroom')"
    >
        <iconify-icon class="text-xl mr-3 group-hover:scale-110 transition-transform" icon="solar:user-rounded-linear"></iconify-icon>
        <span class="font-medium">单人自习室</span>
    </div>

    <!-- 【已修改】点击整行任意位置都能展开收起个人中心，移除@click.self -->
    <div>
        <div class="sidebar-item flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors" @click="toggleSubmenu($event)">
        <div class="flex items-center">
            <iconify-icon class="text-xl mr-3 group-hover:scale-110 transition-transform" icon="solar:user-circle-linear"></iconify-icon>
            <span class="font-medium">个人中心</span>
        </div>
        <iconify-icon class="text-sm transition-transform duration-300" :class="subOpen?'rotate-180':''" icon="solar:alt-arrow-down-linear"></iconify-icon>
        </div>
        <div class="submenu-enter" :class="subOpen?'submenu-open':''">
        <!-- 子菜单@click.stop 阻止冒泡，点击子菜单不会关闭父下拉 -->
        <div class="pl-14 py-2 text-sm text-gray-600 hover:text-[#3D9B6E] cursor-pointer" @click.stop="switchPage('analysis')">学情分析</div>
        <div class="pl-14 py-2 text-sm text-gray-600 hover:text-[#3D9B6E] cursor-pointer" @click.stop="switchPage('flower')">青耘花卉培育</div>
        </div>
    </div>
    </nav>
    <div class="p-6 border-t border-gray-50">
      <div class="text-xs text-gray-400">青耘智慧教学系统 v2.4.0</div>
      <div class="text-xs text-gray-400 mt-1">© 2026 青耘教育科技</div>
    </div>
  </aside>

  <!-- 右侧主区域 -->
  <main class="flex-1 flex flex-col h-full overflow-hidden relative">
    <!-- 顶部导航 -->
    <header class="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 custom-shadow">
      <div class="flex items-center text-gray-500">
        <iconify-icon class="mr-2" icon="solar:map-point-wave-linear"></iconify-icon>
        <span class="text-sm font-medium">{{ breadcrumb }}</span>
      </div>
      <div class="flex items-center space-x-6">
        <div class="relative group">
          <button class="p-2 text-gray-400 hover:text-[#3D9B6E] transition-colors relative">
            <iconify-icon class="text-2xl" icon="solar:bell-bing-linear"></iconify-icon>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
        <!-- 头像外层增加 profile-wrap 用于精准区域判断 -->
        <div class="relative profile-wrap">
          <div class="flex items-center space-x-3 cursor-pointer group" @click="toggleProfileMenu($event)">
            <div class="text-right hidden sm:block">
              <div class="text-sm font-bold text-gray-700 group-hover:text-[#3D9B6E]">张同学</div>
            </div>
            <div class="w-10 h-10 rounded-full border-2 border-[#3D9B6E]/20 p-0.5 overflow-hidden">
              <img alt="头像" class="w-full h-full rounded-full object-cover" src="https://picsum.photos/id/1005/100/100">
            </div>
          </div>
          <div class="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-50 py-2 z-50" :class="profileOpen?'block':'hidden'">
            <div class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center" @click="handleSwitchAccount">
              <iconify-icon class="mr-2" icon="solar:users-group-two-rounded-linear"></iconify-icon>切换账号
            </div>
            <div class="px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer flex items-center" @click="handleLogout">
              <iconify-icon class="mr-2" icon="solar:logout-3-linear"></iconify-icon>退出登录
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 内容滚动容器 -->
    <div class="flex-1 overflow-y-auto p-8 fade-in">
      <!-- 1 我的课程 -->
      <div v-if="page==='courses'" class="space-y-8">
        <section class="bg-white rounded-2xl p-6 custom-shadow flex flex-col md:flex-row items-center justify-between">
          <div class="flex items-center mb-4 md:mb-0">
            <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#3D9B6E] mr-4">
              <iconify-icon class="text-2xl" icon="solar:key-minimalistic-square-linear"></iconify-icon>
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-800">加入新课程</h2>
              <p class="text-sm text-gray-400">输入6位课程邀请码开启学习</p>
            </div>
          </div>
          <div class="flex space-x-2 w-full md:w-auto">
            <input v-model="courseCode" maxlength="6" class="flex-1 md:w-48 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-[3px] focus-within:ring-[rgba(61,155,110,0.1)] focus:border-[#3D9B6E] outline-none text-center font-mono" placeholder="课程码">
            <button @click="joinCourse" class="px-6 py-2 bg-[#3D9B6E] text-white rounded-xl hover:bg-[#2E8A5E]">加入课程</button>
          </div>
        </section>
        <section>
          <div class="flex justify-between mb-6">
            <h2 class="text-xl font-bold">已加入课程</h2>
            <div class="flex gap-2">
              <button class="p-2 border rounded-lg"><iconify-icon icon="solar:list-linear"></iconify-icon></button>
              <button class="p-2 bg-[#3D9B6E] text-white rounded-lg"><iconify-icon icon="solar:widget-linear"></iconify-icon></button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-2xl overflow-hidden custom-shadow group hover:-translate-y-1 transition-all">
              <div class="h-32 bg-gradient-to-br from-[#3D9B6E] to-[#4A90D9] p-4 relative">
                <span class="absolute top-3 right-3 bg-white/20 text-white text-xs px-2 rounded-full">必修课</span>
                <div class="w-full h-full flex items-center justify-center text-white text-4xl font-black opacity-30">MATH</div>
              </div>
              <div class="p-5">
                <h3 class="font-bold group-hover:text-[#3D9B6E]">数学</h3>
                <p class="text-xs text-gray-400 mt-1">张教授</p>
                <div class="mt-4">
                  <div class="flex justify-between text-xs mb-1">
                    <span>进度</span><span class="text-[#3D9B6E] font-bold">75%</span>
                  </div>
                  <div class="w-full h-1.5 bg-gray-100 rounded-full">
                    <div class="h-full bg-[#3D9B6E] rounded-full" style="width:75%"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-2xl overflow-hidden custom-shadow group hover:-translate-y-1 transition-all">
              <div class="h-32 bg-gradient-to-br from-[#4A90D9] to-blue-600 p-4 relative">
                <span class="absolute top-3 right-3 bg-white/20 text-white text-xs px-2 rounded-full">公共课</span>
                <div class="w-full h-full flex items-center justify-center text-white text-4xl font-black opacity-30">ENGLISH</div>
              </div>
              <div class="p-5">
                <h3 class="font-bold group-hover:text-[#3D9B6E]">英语</h3>
                <p class="text-xs text-gray-400 mt-1">李老师</p>
                <div class="mt-4">
                  <div class="flex justify-between text-xs mb-1">
                    <span>进度</span><span class="text-[#3D9B6E] font-bold">90%</span>
                  </div>
                  <div class="w-full h-1.5 bg-gray-100 rounded-full">
                    <div class="h-full bg-[#3D9B6E] rounded-full" style="width:90%"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-2xl overflow-hidden custom-shadow group hover:-translate-y-1 transition-all">
              <div class="h-32 bg-gradient-to-br from-orange-400 to-red-500 p-4 relative">
                <span class="absolute top-3 right-3 bg-white/20 text-white text-xs px-2 rounded-full">专业课</span>
                <div class="w-full h-full flex items-center justify-center text-white text-4xl font-black opacity-30">语文</div>
              </div>
              <div class="p-5">
                <h3 class="font-bold group-hover:text-[#3D9B6E]">语文</h3>
                <p class="text-xs text-gray-400 mt-1">王老师</p>
                <div class="mt-4">
                  <div class="flex justify-between text-xs mb-1">
                    <span>进度</span><span class="text-[#3D9B6E] font-bold">45%</span>
                  </div>
                  <div class="w-full h-1.5 bg-gray-100 rounded-full">
                    <div class="h-full bg-[#3D9B6E] rounded-full" style="width:45%"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-2xl overflow-hidden custom-shadow group hover:-translate-y-1 transition-all">
              <div class="h-32 bg-gradient-to-br from-purple-500 to-indigo-600 p-4 relative">
                <span class="absolute top-3 right-3 bg-white/20 text-white text-xs px-2 rounded-full">必修课</span>
                <div class="w-full h-full flex items-center justify-center text-white text-4xl font-black opacity-30">PHYS</div>
              </div>
              <div class="p-5">
                <h3 class="font-bold group-hover:text-[#3D9B6E]">物理</h3>
                <p class="text-xs text-gray-400 mt-1">陈教授</p>
                <div class="mt-4">
                  <div class="flex justify-between text-xs mb-1">
                    <span>进度</span><span class="text-[#3D9B6E] font-bold">30%</span>
                  </div>
                  <div class="w-full h-1.5 bg-gray-100 rounded-full">
                    <div class="h-full bg-[#3D9B6E] rounded-full" style="width:30%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 2 我的作业 -->
      <div v-if="page==='assignments'" class="space-y-6">
        <h2 class="text-xl font-bold text-gray-800">我的作业</h2>
        <div class="bg-white rounded-2xl p-6 custom-shadow flex flex-col md:flex-row justify-between items-center border-l-4 border-gray-100 hover:border-[#3D9B6E]">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-50 rounded-xl text-[#4A90D9] flex items-center justify-center mr-4">
              <iconify-icon class="text-2xl" icon="solar:pen-new-square-linear"></iconify-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs bg-blue-50 text-[#4A90D9] px-2 rounded">高数</span>
                <h3 class="font-bold">第三章微分练习题</h3>
              </div>
              <p class="text-sm text-gray-400 mt-1">截止：2026-07-15 23:59</p>
            </div>
          </div>
          <div class="mt-4 md:mt-0 flex gap-4 items-center">
            <span class="text-sm text-gray-400">未提交</span>
            <button @click="submitWork" class="bg-[#3D9B6E] text-white px-5 py-2 rounded-xl">提交作业</button>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 custom-shadow flex flex-col md:flex-row justify-between items-center border-l-4 border-red-400">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-red-50 rounded-xl text-red-500 flex items-center justify-center mr-4">
              <iconify-icon class="text-2xl" icon="solar:clock-circle-linear"></iconify-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs bg-blue-50 text-[#4A90D9] px-2 rounded">英语</span>
                <h3 class="font-bold">作文 My University Life</h3>
              </div>
              <p class="text-sm text-red-500 mt-1">即将截止 2026-07-10</p>
            </div>
          </div>
          <div class="mt-4 md:mt-0 flex gap-4 items-center">
            <span class="text-sm text-gray-400">未提交</span>
            <button class="bg-[#3D9B6E] text-white px-5 py-2 rounded-xl">提交作业</button>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 custom-shadow flex flex-col md:flex-row justify-between items-center border-l-4 border-[#3D9B6E] opacity-75">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-50 rounded-xl text-[#3D9B6E] flex items-center justify-center mr-4">
              <iconify-icon class="text-2xl" icon="solar:check-read-linear"></iconify-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs bg-blue-50 text-[#4A90D9] px-2 rounded">数据结构</span>
                <h3 class="font-bold">二叉树实验报告</h3>
              </div>
              <p class="text-sm text-gray-400 mt-1">截止 2026-07-20</p>
            </div>
          </div>
          <div class="mt-4 md:mt-0 flex gap-4 items-center">
            <span class="text-[#3D9B6E] font-bold">已提交</span>
            <button disabled class="bg-gray-100 text-gray-400 px-5 py-2 rounded-xl cursor-not-allowed">重新提交</button>
          </div>
        </div>
      </div>

      <!-- 3 系统通知 -->
      <div v-if="page==='notifications'" class="space-y-4">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-bold">系统通知</h2>
          <span class="text-sm text-[#3D9B6E] cursor-pointer" @click="readAll">全部已读</span>
        </div>
        <div class="bg-white p-5 rounded-2xl custom-shadow flex cursor-pointer border-l-4 border-[#3D9B6E]" @click="readSingle($event)">
          <div class="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <iconify-icon icon="solar:megaphone-linear"></iconify-icon>
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h3 class="font-bold">期末考试安排已发布</h3>
              <span class="text-xs text-gray-400">2026-07-01</span>
            </div>
            <p class="text-sm text-gray-500 mt-1">各位同学，请及时查看期末时间安排，做好复习规划。</p>
          </div>
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 ml-4 unread"></span>
        </div>
        <div class="bg-white p-5 rounded-2xl custom-shadow flex cursor-pointer border-l-4 border-[#3D9B6E]" @click="readSingle($event)">
          <div class="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <iconify-icon icon="solar:book-linear"></iconify-icon>
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h3 class="font-bold">高数下周三期中测验</h3>
              <span class="text-xs text-gray-400">2026-06-28</span>
            </div>
            <p class="text-sm text-gray-500 mt-1">测验范围前三章，请提前复习。</p>
          </div>
          <span class="w-2 h-2 bg-red-500 rounded-full mt-2 ml-4 unread"></span>
        </div>
        <div class="bg-white p-5 rounded-2xl custom-shadow flex opacity-70 border-l-4 border-gray-200">
          <div class="w-10 h-10 bg-green-50 text-[#3D9B6E] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <iconify-icon icon="solar:check-circle-linear"></iconify-icon>
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h3 class="font-bold">数据结构作业已批改</h3>
              <span class="text-xs text-gray-400">2026-06-25</span>
            </div>
            <p class="text-sm text-gray-500 mt-1">本次得分A，可查看教师评语。</p>
          </div>
        </div>
      </div>

      <!-- 4 单人自习室 -->
      <div v-if="page==='studyroom'" class="space-y-8">
        <h2 class="text-xl font-bold">单人自习室</h2>
        <section class="bg-white rounded-2xl p-8 custom-shadow relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-lg font-bold">开启专属单人自习</h3>
              <p class="text-sm text-gray-400 mt-2">无打扰个人学习空间，自动记录时长、兑换积分花卉道具</p>
              <div class="mt-6 space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs text-gray-500 block mb-1">自习目标</label>
                    <select v-model="studyTarget" class="w-full px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#3D9B6E] outline-none">
                      <option>完成作业</option>
                      <option>课程复习</option>
                      <option>预习</option>
                      <option>自由学习</option>
                    </select>
                  </div>
                  <div>
                    <label class="text-xs text-gray-500 block mb-1">预计时长</label>
                    <select v-model="studyTime" class="w-full px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#3D9B6E] outline-none">
                      <option>30分钟</option>
                      <option>1小时</option>
                      <option>2小时</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="text-xs text-gray-500 block mb-1">专注模式</label>
                  <div class="flex gap-4">
                    <label class="cursor-pointer">
                      <input v-model="studyMode" value="normal" name="mode" type="radio" class="hidden peer">
                      <span class="px-4 py-1.5 border rounded-lg peer-checked:bg-[#3D9B6E] peer-checked:text-white">普通</span>
                    </label>
                    <label class="cursor-pointer">
                      <input v-model="studyMode" value="deep" name="mode" type="radio" class="hidden peer">
                      <span class="px-4 py-1.5 border rounded-lg peer-checked:bg-[#3D9B6E] peer-checked:text-white">深度</span>
                    </label>
                    <label class="cursor-pointer">
                      <input v-model="studyMode" value="tomato" name="mode" type="radio" class="hidden peer">
                      <span class="px-4 py-1.5 border rounded-lg peer-checked:bg-[#3D9B6E] peer-checked:text-white">番茄钟</span>
                    </label>
                  </div>
                </div>
                <button @click="startStudy" class="w-full py-3 bg-[#3D9B6E] text-white rounded-xl font-bold">开始自习</button>
              </div>
            </div>
            <div class="hidden lg:flex justify-center">
              <iconify-icon class="text-[180px] text-green-100" icon="solar:laptop-minimalistic-linear"></iconify-icon>
            </div>
          </div>
        </section>
        <section>
          <h3 class="text-lg font-bold mb-4">自习记录</h3>
          <div class="bg-white custom-shadow rounded-2xl overflow-hidden">
            <table class="w-full text-sm text-left">
              <thead class="bg-gray-50 text-xs uppercase">
                <tr>
                  <th class="px-6 py-3">日期</th>
                  <th class="px-6 py-3">目标</th>
                  <th class="px-6 py-3">时长</th>
                  <th class="px-6 py-3">状态</th>
                  <th class="px-6 py-3">积分</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-100 hover:bg-green-50/20">
                  <td class="px-6 py-4">2026-07-01</td>
                  <td class="px-6 py-4">高数复习</td>
                  <td class="px-6 py-4">1h20m</td>
                  <td class="px-6 py-4 text-[#3D9B6E] font-medium">完成</td>
                  <td class="px-6 py-4">+25</td>
                </tr>
                <tr class="border-b border-gray-100 hover:bg-green-50/20">
                  <td class="px-6 py-4">2026-06-30</td>
                  <td class="px-6 py-4">英语练习</td>
                  <td class="px-6 py-4">50m</td>
                  <td class="px-6 py-4 text-[#3D9B6E] font-medium">完成</td>
                  <td class="px-6 py-4">+18</td>
                </tr>
                <tr class="hover:bg-green-50/20">
                  <td class="px-6 py-4">2026-06-29</td>
                  <td class="px-6 py-4">数据结构刷题</td>
                  <td class="px-6 py-4">2h05m</td>
                  <td class="px-6 py-4 text-[#3D9B6E] font-medium">完成</td>
                  <td class="px-6 py-4">+42</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-[#3D9B6E]">
              <div class="text-gray-400 text-sm">本月总时长</div>
              <div class="text-3xl font-black mt-2">18 <span class="text-sm font-normal text-gray-400">小时</span></div>
              <div class="mt-4 text-xs text-green-500 flex items-center">
                <iconify-icon icon="solar:trend-up-linear" class="mr-1"></iconify-icon>环比+12%
              </div>
            </div>
            <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-[#4A90D9]">
              <div class="text-gray-400 text-sm">连续打卡</div>
              <div class="text-3xl font-black mt-2">7 <span class="text-sm font-normal text-gray-400">天</span></div>
              <div class="mt-4 text-xs text-gray-400">再3天解锁勋章</div>
            </div>
            <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-yellow-400">
              <div class="text-gray-400 text-sm">累计积分</div>
              <div class="text-3xl font-black mt-2">328 <span class="text-sm font-normal text-gray-400">分</span></div>
              <div class="mt-4 text-xs text-orange-500 flex items-center">
                <iconify-icon icon="solar:gift-linear" class="mr-1"></iconify-icon>可兑换培育道具
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 5 学情分析 -->
      <div v-if="page==='analysis'" class="space-y-8">
        <h2 class="text-xl font-bold">学情分析</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-[#3D9B6E]">
            <div class="text-gray-400 text-sm">进行中课程</div>
            <div class="text-3xl font-black mt-2">4 <span class="text-sm text-gray-400">门</span></div>
          </div>
          <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-[#4A90D9]">
            <div class="text-gray-400 text-sm">已完成课程</div>
            <div class="text-3xl font-black mt-2">6 <span class="text-sm text-gray-400">门</span></div>
          </div>
          <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-yellow-400">
            <div class="text-gray-400 text-sm">累计学分</div>
            <div class="text-3xl font-black mt-2">856 <span class="text-sm text-gray-400">分</span></div>
          </div>
        </div>
        <div class="bg-white p-8 rounded-2xl custom-shadow">
          <h3 class="text-lg font-bold mb-6">各课程进度</h3>
          <div class="space-y-6">
            <div>
              <div class="flex justify-between mb-2">
                <span>高等数学</span>
                <span class="text-[#3D9B6E] font-bold">75%</span>
              </div>
              <div class="w-full h-3 bg-gray-100 rounded-full">
                <div class="h-full bg-[#3D9B6E] rounded-full" style="width:75%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <span>大学英语</span>
                <span class="text-[#3D9B6E] font-bold">90%</span>
              </div>
              <div class="w-full h-3 bg-gray-100 rounded-full">
                <div class="h-full bg-[#3D9B6E] rounded-full" style="width:90%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <span>数据结构</span>
                <span class="text-[#4A90D9] font-bold">45%</span>
              </div>
              <div class="w-full h-3 bg-gray-100 rounded-full">
                <div class="h-full bg-[#4A90D9] rounded-full" style="width:45%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6 青耘花卉培育 -->
      <div v-if="page==='flower'" class="space-y-8">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">青耘花卉培育</h2>
          <div class="bg-white px-4 py-2 rounded-xl custom-shadow flex items-center gap-2">
            <iconify-icon icon="solar:star-bold" class="text-yellow-400"></iconify-icon>
            <span class="text-sm font-bold">我的积分：1250</span>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 bg-white rounded-3xl p-8 custom-shadow relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div class="relative z-10 text-center">
              <iconify-icon class="text-[120px] text-[#3D9B6E] animate-bounce" icon="solar:leaf-bold"></iconify-icon>
              <h3 class="text-2xl font-black mt-4">蓝风铃</h3>
              <p class="text-[#3D9B6E] font-medium mt-1">茁壮成长中 🌱</p>
              <div class="w-64 mx-auto mt-8">
                <div class="flex justify-between text-xs mb-2 text-gray-400">
                  <span>生长进度</span>
                  <span>65%</span>
                </div>
                <div class="w-full h-4 bg-gray-100 rounded-full p-1">
                  <div class="h-full bg-gradient-to-r from-[#3D9B6E] to-[#4A90D9] rounded-full" style="width:65%"></div>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4 w-full mt-12">
                <div class="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-center">
                  <iconify-icon icon="solar:water-drops-linear" class="text-xl text-blue-500"></iconify-icon>
                  <div class="text-xs text-gray-500 mt-1">水分</div>
                  <div class="font-bold text-blue-600">70/100</div>
                </div>
                <div class="bg-green-50/50 p-4 rounded-2xl border border-green-100 text-center">
                  <iconify-icon icon="solar:leaf-linear" class="text-xl text-[#3D9B6E]"></iconify-icon>
                  <div class="text-xs text-gray-500 mt-1">养分</div>
                  <div class="font-bold text-[#3D9B6E]">45/100</div>
                </div>
                <div class="bg-yellow-50/50 p-4 rounded-2xl border border-yellow-100 text-center">
                  <iconify-icon icon="solar:sun-2-linear" class="text-xl text-yellow-600"></iconify-icon>
                  <div class="text-xs text-gray-500 mt-1">阳光</div>
                  <div class="font-bold text-yellow-600">80/100</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-3xl p-6 custom-shadow flex flex-col">
            <h3 class="text-lg font-bold flex items-center gap-2 mb-6">
              <iconify-icon icon="solar:shop-2-linear" class="text-[#3D9B6E]"></iconify-icon>培育商城
            </h3>
            <div class="space-y-4 flex-1 overflow-y-auto pr-2">
              <div class="p-4 rounded-2xl bg-gray-50 flex items-center justify-between group hover:bg-white hover:border border-[#3D9B6E]">
                <div class="flex items-center gap-4">
                  <span class="text-3xl">🌱</span>
                  <div>
                    <h4 class="font-bold text-sm">有机肥料</h4>
                    <p class="text-xs text-[#3D9B6E]">10积分</p>
                  </div>
                </div>
                <button @click="buyItem('有机肥料')" class="px-3 py-1.5 bg-[#3D9B6E] text-white rounded-lg text-xs">购买</button>
              </div>
              <div class="p-4 rounded-2xl bg-gray-50 flex items-center justify-between group hover:bg-white hover:border border-[#3D9B6E]">
                <div class="flex items-center gap-4">
                  <span class="text-3xl">💧</span>
                  <div>
                    <h4 class="font-bold text-sm">纯净水</h4>
                    <p class="text-xs text-[#3D9B6E]">5积分</p>
                  </div>
                </div>
                <button @click="buyItem('纯净水')" class="px-3 py-1.5 bg-[#3D9B6E] text-white rounded-lg text-xs">购买</button>
              </div>
            </div>
            <div class="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">完成学习任务获取积分兑换道具</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast提示弹窗 -->
    <div class="fixed top-8 left-1/2 -translate-x-1/2 z-[9999]" v-if="toast.show">
      <div class="bg-gray-800 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
        <iconify-icon :icon="toast.type==='success'?'mdi:check-circle':'mdi:alert'" :class="toast.type==='success'?'text-green-400':'text-red-400'"></iconify-icon>
        <span>{{toast.msg}}</span>
      </div>
    </div>
  </main>
</div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 页面控制
const page = ref('courses')
const breadcrumb = ref('我的课程')
const subOpen = ref(false)
const profileOpen = ref(false)

// 自习表单
const studyTarget = ref('完成作业')
const studyTime = ref('1小时')
const studyMode = ref('normal')

// 课程码
const courseCode = ref('')

// Toast
const toast = ref({ show: false, msg: '', type: 'success' })
const showToast = (msg, type='success') => {
  toast.value = { show:true, msg, type }
  setTimeout(()=>toast.value.show=false, 2500)
}

// 外部点击关闭下拉菜单逻辑（已修复判断逻辑）
const handleClickOutside = (e) => {
  const target = e.target
  // 判断是否点击个人中心区域
  const clickInsideSubMenu = target.closest('.sidebar-item') || target.closest('.submenu-enter')
  if (!clickInsideSubMenu) {
    subOpen.value = false
  }
  // 判断是否点击头像下拉区域
  const clickInsideProfile = target.closest('.profile-wrap')
  if (!clickInsideProfile) {
    profileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 切换侧边页面
const switchPage = (name) => {
  page.value = name
  profileOpen.value = false
  const map = {
    courses:'我的课程',
    assignments:'我的作业',
    notifications:'系统通知',
    studyroom:'单人自习室',
    analysis:'个人中心 > 学情分析',
    flower:'个人中心 > 青耘花卉培育'
  }
  breadcrumb.value = map[name]
}

// 个人中心下拉展开收起（传入事件阻止冒泡）
const toggleSubmenu = (e) => {
  e.stopPropagation()
  subOpen.value = !subOpen.value
  profileOpen.value = false
}

// 头像下拉菜单（传入事件阻止冒泡）
const toggleProfileMenu = (e) => {
  e.stopPropagation()
  profileOpen.value = !profileOpen.value
  subOpen.value = false
}

// 切换账号
const handleSwitchAccount = () => {
  profileOpen.value = false
  showToast('切换账号')
}

// 加入课程
const joinCourse = () => {
  if(!courseCode.value) return showToast('请输入6位课程码','error')
  showToast('课程加入成功')
  courseCode.value = ''
}

// 提交作业
const submitWork = () => {
  showToast('作业提交成功')
}

// 自习开启
const startStudy = () => {
  showToast('单人自习已开启，专注学习！')
  setTimeout(()=>showToast('自习完成，获得20积分'), 2000)
}

// 商城购买道具
const buyItem = (name) => {
  showToast(`成功购买${name}`)
}

// 通知全部已读
const readAll = () => {
  showToast('全部标记已读')
}
const readSingle = (e) => {
  const mark = e.currentTarget.querySelector('.unread')
  if(mark) mark.remove()
  e.currentTarget.classList.remove('border-[#3D9B6E]')
  e.currentTarget.classList.add('border-gray-200','opacity-70')
}

// 退出登录
const handleLogout = () => {
  profileOpen.value = false
  localStorage.clear()
  router.push('/login')
  showToast('已退出登录')
}
</script>

<style scoped>
body {
  font-family: system-ui, SimSun, Microsoft YaHei, sans-serif;
}
.sidebar-item.active {
  background-color: #ecfdf5;
  color: #3D9B6E;
  border-left: 4px solid #3D9B6E;
}
.custom-shadow {
  box-shadow: 0 2px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0.05);
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.submenu-enter {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.submenu-open {
  max-height: 200px;
}
.rotate-180 {
  transform: rotate(180deg);
}
.fade-in {
  animation: pageFade 0.5s ease forwards;
}
@keyframes pageFade {
  from {opacity:0; transform: translateY(8px);}
  to {opacity:1; transform: translateY(0);}
}
.animate-bounce {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%,100% {transform: translateY(0);}
  50% {transform: translateY(-10px);}
}
</style>