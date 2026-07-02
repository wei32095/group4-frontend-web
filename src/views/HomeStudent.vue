<template>
<div class="flex h-screen overflow-hidden bg-[#f5f8fc]">
  <!-- 左侧侧边栏 -->
  <aside class="w-60 bg-white border-r border-gray-100 flex flex-col z-20">
    <div class="h-16 flex items-center px-6 border-b border-gray-50">
      <img src="@/assets/logo.png" class="w-7 h-7 mr-2 object-contain" alt="logo">
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
        <span class="font-medium">自习室</span>
    </div>
    <!-- 个人中心 -->
    <div>
        <div class="sidebar-item flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors" @click="toggleSubmenu($event)">
        <div class="flex items-center">
            <iconify-icon class="text-xl mr-3 group-hover:scale-110 transition-transform" icon="solar:user-circle-linear"></iconify-icon>
            <span class="font-medium">个人中心</span>
        </div>
        <iconify-icon class="text-sm transition-transform duration-300" :class="subOpen?'rotate-180':''" icon="solar:alt-arrow-down-linear"></iconify-icon>
        </div>
        <div class="submenu-enter" :class="subOpen?'submenu-open':''">
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
        <div class="relative profile-wrap">
          <div class="flex items-center space-x-3 cursor-pointer group" @click="toggleProfileMenu($event)">
            <div class="text-right hidden sm:block">
              <div class="text-sm font-bold text-gray-700 group-hover:text-[#3D9B6E]">{{userInfo.name}}</div>
            </div>
            <div class="w-10 h-10 rounded-full border-2 border-[#3D9B6E]/20 p-0.5 overflow-hidden">
              <img :src="userInfo.avatar" alt="头像" class="w-full h-full rounded-full object-cover">
            </div>
          </div>
          <div class="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-50 py-2 z-50" :class="profileOpen?'block':'hidden'">
            <div class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center" @click="handlePersonalInfo">
              <iconify-icon class="mr-2" icon="solar:settings-linear"></iconify-icon>个人信息
            </div>
            <div class="px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer flex items-center" @click="handleLogout">
              <iconify-icon class="mr-2" icon="solar:logout-3-linear"></iconify-icon>退出登录
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 内容滚动容器 -->
    <div class="flex-1 overflow-y-auto p-8 fade-in" @click="closeScoreLogPanel">
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
            <div
              v-for="item in courseList"
              :key="item.id"
              @click="$router.push('/course/' + item.id)"
              class="bg-white rounded-2xl overflow-hidden custom-shadow group hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div class="h-32 bg-gradient-to-br from-[#3D9B6E] to-[#4A90D9] p-4 relative">
                <span class="absolute top-3 right-3 text-white text-xs px-2 rounded-full" :class="item.status === '进行中' ? 'bg-[#3D9B6E]' : 'bg-gray-500'">{{item.status}}</span>
                <div class="w-full h-full flex items-center justify-center text-white text-4xl font-black opacity-30">{{item.shortName}}</div>
              </div>
              <div class="p-5">
                <h3 class="font-bold group-hover:text-[#3D9B6E]">{{item.name}}</h3>
                <p class="text-xs text-gray-400 mt-1">{{item.teacher}}</p>
              </div>
            </div>
          </div>
          <div v-if="courseList.length === 0" class="bg-white p-12 rounded-2xl custom-shadow text-center">
            <iconify-icon class="text-4xl text-gray-300 mb-4" icon="solar:book-open-linear"></iconify-icon>
            <p class="text-gray-400">暂无课程，输入课程码加入课程吧</p>
          </div>
        </section>
      </div>

      <!-- 2 我的作业 -->
      <div v-if="page==='assignments'" class="space-y-6">
        <h2 class="text-xl font-bold text-gray-800">我的作业</h2>
        <div
          v-for="item in assignmentList"
          :key="item.id"
          @click="$router.push('/work/' + item.id)"
          class="bg-white rounded-2xl p-6 custom-shadow flex flex-col md:flex-row justify-between items-center border-l-4 cursor-pointer"
          :class="[getAssignmentStatus(item.status).border, item.status === 'SUBMITTED' ? 'opacity-75' : 'hover:border-[#3D9B6E]']"
        >
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                 :class="item.status === 'OVERDUE' ? 'bg-red-50 text-red-500' : item.status === 'SUBMITTED' ? 'bg-green-50 text-[#3D9B6E]' : 'bg-blue-50 text-[#4A90D9]'">
              <iconify-icon class="text-2xl" :icon="item.status === 'SUBMITTED' ? 'solar:check-read-linear' : 'solar:pen-new-square-linear'"></iconify-icon>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs bg-blue-50 text-[#4A90D9] px-2 rounded">{{item.courseName}}</span>
                <h3 class="font-bold">{{item.title}}</h3>
              </div>
              <p class="text-sm mt-1" :class="item.status === 'OVERDUE' ? 'text-red-500' : 'text-gray-400'">
                截止：{{formatDeadline(item.deadline)}}
              </p>
            </div>
          </div>
          <div class="mt-4 md:mt-0 flex gap-4 items-center">
            <div class="text-right">
              <span class="text-sm font-bold" :class="getAssignmentStatus(item.status).color">
                {{getAssignmentStatus(item.status).text}}
              </span>
              <div v-if="item.myScore !== null" class="text-xs text-gray-400">
                得分：{{item.myScore}}/{{item.maxScore}}
              </div>
            </div>
            <button 
              @click.stop="submitWork" 
              v-if="item.status !== 'SUBMITTED'"
              class="bg-[#3D9B6E] text-white px-5 py-2 rounded-xl"
            >提交作业</button>
            <button 
              @click.stop 
              v-else
              disabled 
              class="bg-gray-100 text-gray-400 px-5 py-2 rounded-xl cursor-not-allowed"
            >已提交</button>
          </div>
        </div>
        <div v-if="assignmentList.length === 0" class="bg-white p-12 rounded-2xl custom-shadow text-center">
          <iconify-icon class="text-4xl text-gray-300 mb-4" icon="solar:file-text-linear"></iconify-icon>
          <p class="text-gray-400">暂无作业</p>
        </div>
        <div v-if="assignmentPages > 1" class="flex justify-center items-center gap-4">
          <button 
            @click="fetchAssignmentList(assignmentPageNum - 1)" 
            :disabled="assignmentPageNum <= 1"
            class="px-4 py-2 border rounded-lg disabled:opacity-50"
          >上一页</button>
          <span class="text-sm text-gray-500">{{assignmentPageNum}}/{{assignmentPages}}</span>
          <button 
            @click="fetchAssignmentList(assignmentPageNum + 1)" 
            :disabled="assignmentPageNum >= assignmentPages"
            class="px-4 py-2 border rounded-lg disabled:opacity-50"
          >下一页</button>
        </div>
      </div>

      <!-- 3 系统通知 -->
      <div v-if="page==='notifications'" class="space-y-4">
        <div class="flex justify-between mb-4">
          <h2 class="text-xl font-bold">系统通知</h2>
          <span class="text-sm text-[#3D9B6E] cursor-pointer" @click="readAll">全部已读</span>
        </div>
        <div
          v-for="notice in notificationList"
          :key="notice.id"
          class="bg-white p-5 rounded-2xl custom-shadow flex cursor-pointer transition-all"
          :class="notice.noticeStatus === 0 ? 'border-l-4 border-[#3D9B6E]' : 'border-l-4 border-gray-200 opacity-70'"
          @click="readSingle(notice)"
        >
          <div class="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <iconify-icon :icon="getNoticeIcon(notice.noticeType)"></iconify-icon>
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h3 class="font-bold">{{notice.noticeTitle}}</h3>
              <span class="text-xs text-gray-400">{{formatNoticeTime(notice.pushTime)}}</span>
            </div>
            <p class="text-sm text-gray-500 mt-1">{{notice.noticeContent}}</p>
          </div>
          <span v-if="notice.noticeStatus === 0" class="w-2 h-2 bg-red-500 rounded-full mt-2 ml-4"></span>
        </div>
        <div v-if="notificationList.length === 0" class="bg-white p-12 rounded-2xl custom-shadow text-center">
          <iconify-icon class="text-4xl text-gray-300 mb-4" icon="solar:bell-off-linear"></iconify-icon>
          <p class="text-gray-400">暂无通知</p>
        </div>
      </div>

      <!-- 4 自习室【已按需求修改】 -->
      <div v-if="page==='studyroom'" class="space-y-8">
        <h2 class="text-xl font-bold">自习室</h2>
        <section class="bg-white rounded-2xl p-8 custom-shadow relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-lg font-bold">开启自习</h3>
              <p class="text-sm text-gray-400 mt-2">选择计时模式，自动记录时长兑换积分花卉道具</p>
              <div class="mt-6 space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs text-gray-500 block mb-1">自习目标</label>
                    <input v-model="studyTarget" type="text" placeholder="输入自习目标，默认'自习'" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] outline-none">
                  </div>
                  <div>
                    <label class="text-xs text-gray-500 block mb-1">计时模式</label>
                    <select v-model="timeMode" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] outline-none">
                      <option value="forward">正向计时</option>
                      <option value="countdown">倒计时</option>
                    </select>
                  </div>
                </div>
                <div v-if="timeMode === 'countdown'">
                  <label class="text-xs text-gray-500 block mb-1">倒计时时长（分钟）</label>
                  <input v-model.number="countMinute" type="number" min="1" placeholder="请输入分钟数" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] outline-none">
                </div>
                <div>
                  <label class="text-xs text-gray-500 block mb-1">专注模式</label>
                  <div class="flex gap-4">
                    <label class="cursor-pointer">
                      <input v-model="studyMode" value="normal" name="mode" type="radio" class="hidden peer">
                      <span class="px-4 py-1.5 border rounded-lg peer-checked:bg-[#3D9B6E] peer-checked:text-white">普通</span>
                    </label>
                    <label class="cursor-pointer">
                      <input v-model="studyMode" value="tomato" name="mode" type="radio" class="hidden peer">
                      <span class="px-4 py-1.5 border rounded-lg peer-checked:bg-[#3D9B6E] peer-checked:text-white">番茄钟</span>
                    </label>
                  </div>
                </div>
                <div class="text-center py-4 text-4xl font-bold text-[#3D9B6E]">{{ showTime }}</div>
                <div class="flex gap-4">
                  <button v-if="!studying" @click="startStudy" class="flex-1 py-3 bg-[#3D9B6E] text-white rounded-xl font-bold">开始自习</button>
                  <button v-if="studying" @click="endStudy" class="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">结束自习</button>
                </div>
              </div>
            </div>
            <div class="flex lg:flex-col justify-center items-center">
              <div class="relative w-48 h-48">
                <div class="absolute inset-0 rounded-full bg-green-50 flex items-center justify-center">
                  <div class="w-36 h-36 rounded-full border-8 border-gray-100 flex items-center justify-center relative">
                    <div class="w-28 h-28 rounded-full border-4 border-[#3D9B6E] flex items-center justify-center">
                      <div class="text-center">
                        <div class="text-xs text-gray-400">{{ studyMode === 'tomato' ? (tomatoPhase === 'study' ? '学习中' : '休息中') : '准备就绪' }}</div>
                        <iconify-icon class="text-4xl text-[#3D9B6E] mt-2" :class="studying ? 'animate-spin-slow' : ''" icon="solar:alarm-clock-linear"></iconify-icon>
                      </div>
                    </div>
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-[#3D9B6E] rounded-full origin-bottom" :style="{ transform: `translateX(-50%) rotate(${clockDegree}deg)` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3 class="text-lg font-bold mb-4">我的自习记录</h3>
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
                <tr v-for="item in studyRecord" :key="item.id" class="border-b border-gray-100 hover:bg-green-50/20">
                  <td class="px-6 py-4">{{item.date}}</td>
                  <td class="px-6 py-4">{{item.goal}}</td>
                  <td class="px-6 py-4">{{item.duration}}</td>
                  <td class="px-6 py-4" :class="item.isValid === 1 ? 'text-[#3D9B6E] font-medium' : 'text-gray-400'">{{item.isValid === 1 ? '有效学习' : '无效学习'}}</td>
                  <td class="px-6 py-4">+{{item.score}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 删除作业平均正确率卡片 -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-[#3D9B6E]">
              <div class="text-gray-400 text-sm mb-2">本月自习总时长</div>
              <div class="text-3xl font-black text-gray-800">{{totalStudyHour}} <span class="text-sm font-normal text-gray-400">小时</span></div>
            </div>
            <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-[#4A90D9]">
              <div class="text-gray-400 text-sm mb-2">本周自习时长</div>
              <div class="text-3xl font-black text-gray-800">{{weekStudyHour}} <span class="text-sm font-normal text-gray-400">小时</span></div>
            </div>
          </div>
        </section>
      </div>

      <!-- 5 学情分析 -->
      <div v-if="page==='analysis'" class="space-y-8">
        <h2 class="text-xl font-bold">学情分析</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-[#3D9B6E]">
            <div class="text-gray-400 text-sm">累计学习时长</div>
            <div class="text-3xl font-black mt-2">{{ totalStudyHour }} <span class="text-sm text-gray-400">小时</span></div>
          </div>
          <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-[#4A90D9]">
            <div class="text-gray-400 text-sm">本周学习时长</div>
            <div class="text-3xl font-black mt-2">{{ weekStudyHour }} <span class="text-sm text-gray-400">小时</span></div>
          </div>
          <div class="bg-white p-6 rounded-2xl custom-shadow border-t-4 border-yellow-400">
            <div class="text-gray-400 text-sm">作业正确率</div>
            <div class="text-3xl font-black mt-2">{{ analysisData.assignmentCorrectRate }} <span class="text-sm text-gray-400">%</span></div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl custom-shadow">
          <div class="flex mb-6">
            <button class="px-5 py-2 rounded-l-full transition-all" :class="reportTab==='week'?'bg-[#3D9B6E] text-white':'border border-gray-200 text-gray-600 hover:bg-gray-50'" @click="reportTab='week'">本周报告</button>
            <button class="px-5 py-2 rounded-r-full transition-all" :class="reportTab==='month'?'bg-[#3D9B6E] text-white':'border border-gray-200 text-gray-600 hover:bg-gray-50'" @click="reportTab='month'">本月报告</button>
          </div>
          <div v-if="reportTab==='week'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border-2 border-[#3D9B6E] rounded-2xl p-6">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <iconify-icon icon="solar:book-linear" class="text-xl"></iconify-icon>
                  <span class="text-gray-500">学习时长</span>
                </div>
              </div>
              <div class="text-5xl font-bold my-3">{{ weekStudyHour }} <span class="text-lg font-normal text-gray-500">小时</span></div>
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#3D9B6E] to-[#4A90D9]" :style="{width:Math.min(100, (weekStudyHour / 20) * 100) + '%'}"></div>
              </div>
              <div class="text-sm text-gray-400 mt-2">本周目标 20 小时</div>
            </div>
            <div class="border-2 border-[#4A90D9] rounded-2xl p-6">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <iconify-icon icon="solar:check-circle-bold" class="text-xl text-green-500"></iconify-icon>
                  <span class="text-gray-500">作业正确率</span>
                </div>
              </div>
              <div class="text-5xl font-bold my-3">{{ analysisData.assignmentCorrectRate }} <span class="text-lg font-normal text-gray-500">%</span></div>
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#4A90D9]" :style="{width:analysisData.assignmentCorrectRate + '%'}"></div>
              </div>
              <div class="flex justify-between text-sm text-gray-400 mt-2">
                <span>{{ analysisData.assignmentCorrectRate >= 90 ? 'A级' : (analysisData.assignmentCorrectRate >= 80 ? 'B级' : (analysisData.assignmentCorrectRate >= 60 ? 'C级' : 'D级')) }}</span>
              </div>
            </div>
          </div>
          <div v-if="reportTab==='month'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border-2 border-[#3D9B6E] rounded-2xl p-6">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <iconify-icon icon="solar:book-linear" class="text-xl"></iconify-icon>
                  <span class="text-gray-500">学习时长</span>
                </div>
              </div>
              <div class="text-5xl font-bold my-3">{{ totalStudyHour }} <span class="text-lg font-normal text-gray-500">小时</span></div>
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#3D9B6E] to-[#4A90D9]" :style="{width:Math.min(100, (totalStudyHour / 60) * 100) + '%'}"></div>
              </div>
              <div class="text-sm text-gray-400 mt-2">本月目标 60 小时</div>
            </div>
            <div class="border-2 border-[#4A90D9] rounded-2xl p-6">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <iconify-icon icon="solar:check-circle-bold" class="text-xl text-green-500"></iconify-icon>
                  <span class="text-gray-500">作业正确率</span>
                </div>
              </div>
              <div class="text-5xl font-bold my-3">{{ analysisData.assignmentCorrectRate }} <span class="text-lg font-normal text-gray-500">%</span></div>
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#4A90D9]" :style="{width:analysisData.assignmentCorrectRate + '%'}"></div>
              </div>
              <div class="flex justify-between text-sm text-gray-400 mt-2">
                <span>{{ analysisData.assignmentCorrectRate >= 90 ? 'A级' : (analysisData.assignmentCorrectRate >= 80 ? 'B级' : (analysisData.assignmentCorrectRate >= 60 ? 'C级' : 'D级')) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6 青耘花卉培育【已按需求修改：培育/图鉴切换 + 积分流水弹窗】 -->
      <div v-if="page==='flower'" class="space-y-8">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">青耘花卉培育</h2>
          <!-- 点击打开积分流水弹窗 -->
          <div class="relative" @click.stop="toggleScorePanel">
            <div class="bg-white px-4 py-2 rounded-xl custom-shadow flex items-center cursor-pointer">
              <iconify-icon class="text-yellow-400 mr-2" icon="solar:star-bold"></iconify-icon>
              <span class="text-sm font-bold">我的积分: {{score}}</span>
            </div>
            <!-- 积分流水弹窗 -->
            <div v-if="scoreLogPanelShow" class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4">
              <h4 class="font-bold mb-3 border-b pb-2">积分流水记录</h4>
              <div class="space-y-2 max-h-80 overflow-y-auto">
                <div v-for="log in scoreLog" :key="log.id" class="py-2 border-b border-gray-100">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-700">{{log.desc}}</span>
                    <span :class="log.type==='add'?'text-[#3D9B6E]':'text-red-500'" class="font-bold">{{log.type==='add'?'+':'-'}}{{log.num}}</span>
                  </div>
                  <div class="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{{log.time ? formatTime(log.time) : ''}}</span>
                    <span>剩余: {{log.leftPoints}}</span>
                  </div>
                </div>
                <div v-if="scoreLog.length === 0" class="text-center py-8 text-gray-400 text-sm">暂无积分记录</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 培育 / 图鉴 标签切换 -->
        <div class="inline-flex rounded-full bg-gray-50 p-1">
          <button
            @click="flowerTab='grow'"
            class="px-8 py-3 rounded-full transition-all flex items-center gap-2"
            :class="flowerTab==='grow'?'bg-white shadow text-[#3D9B6E] font-bold':'text-gray-500'"
          >
            <span class="text-2xl">🌱</span>
            <span class="text-xl">培育</span>
          </button>
          <button
            @click="flowerTab='book'"
            class="px-8 py-3 rounded-full transition-all flex items-center gap-2"
            :class="flowerTab==='book'?'bg-white shadow text-gray-700 font-bold':'text-gray-500'"
          >
            <span class="text-2xl">📖</span>
            <span class="text-xl">图鉴</span>
          </button>
        </div>

        <!-- 培育页面 -->
        <div v-if="flowerTab==='grow'">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 bg-white rounded-3xl p-8 custom-shadow relative flex flex-col items-center justify-center overflow-hidden min-h-[400px]">
              <div class="absolute inset-0 bg-gradient-to-b from-green-50/30 to-white pointer-events-none"></div>
              <div class="relative z-10 text-center">
                <div class="relative w-48 h-48 mx-auto">
                  <img v-if="getCurrentStageImage()" :src="getCurrentStageImage()" class="w-full h-full object-contain" />
                  <svg v-else-if="growthStage.icon === 'seed'" viewBox="0 0 100 100" class="w-full h-full">
                    <ellipse cx="50" cy="70" rx="15" ry="8" fill="#8B7355" />
                    <ellipse cx="50" cy="70" rx="12" ry="6" fill="#A0522D" />
                    <path d="M50 62 Q50 55 50 50" stroke="#8B7355" stroke-width="3" fill="none" />
                  </svg>
                  <svg v-else-if="growthStage.icon === 'sprout'" viewBox="0 0 100 100" class="w-full h-full">
                    <ellipse cx="50" cy="75" rx="15" ry="8" fill="#8B7355" />
                    <path d="M50 70 Q50 40 50 30" stroke="#90EE90" stroke-width="6" fill="none" stroke-linecap="round" />
                    <ellipse cx="50" cy="25" rx="12" ry="18" fill="#90EE90" transform="rotate(-30 50 25)" />
                    <ellipse cx="50" cy="25" rx="12" ry="18" fill="#90EE90" transform="rotate(30 50 25)" />
                  </svg>
                  <svg v-else-if="growthStage.icon === 'leaf'" viewBox="0 0 100 100" class="w-full h-full">
                    <ellipse cx="50" cy="80" rx="15" ry="8" fill="#8B7355" />
                    <path d="M50 75 Q50 50 50 30" stroke="#228B22" stroke-width="8" fill="none" stroke-linecap="round" />
                    <ellipse cx="50" cy="25" rx="15" ry="25" fill="#32CD32" transform="rotate(-45 50 25)" />
                    <ellipse cx="50" cy="25" rx="15" ry="25" fill="#32CD32" transform="rotate(45 50 25)" />
                    <ellipse cx="50" cy="45" rx="12" ry="20" fill="#228B22" transform="rotate(-30 50 45)" />
                    <ellipse cx="50" cy="45" rx="12" ry="20" fill="#228B22" transform="rotate(30 50 45)" />
                  </svg>
                  <svg v-else viewBox="0 0 100 100" class="w-full h-full animate-bounce">
                    <ellipse cx="50" cy="80" rx="15" ry="8" fill="#8B7355" />
                    <path d="M50 75 Q50 50 50 35" stroke="#228B22" stroke-width="6" fill="none" stroke-linecap="round" />
                    <ellipse cx="50" cy="30" rx="10" ry="15" fill="#32CD32" transform="rotate(-30 50 30)" />
                    <ellipse cx="50" cy="30" rx="10" ry="15" fill="#32CD32" transform="rotate(30 50 30)" />
                    <circle cx="50" cy="18" r="15" fill="#FFB6C1" />
                    <circle cx="50" cy="18" r="12" fill="#FF69B4" />
                    <ellipse cx="45" cy="15" rx="4" ry="6" fill="#FF1493" transform="rotate(-30 45 15)" />
                    <ellipse cx="55" cy="15" rx="4" ry="6" fill="#FF1493" transform="rotate(30 55 15)" />
                    <ellipse cx="50" cy="10" rx="4" ry="6" fill="#FF1493" />
                  </svg>
                </div>
                <h3 class="text-2xl font-black mt-4">{{currentFlower.name}}</h3>
                <p class="text-[#3D9B6E] font-medium mt-1">{{growthStage.name}}阶段</p>
                <div class="w-64 mx-auto mt-8">
                  <div class="flex justify-between text-xs mb-2 text-gray-400">
                    <span>生长进度</span>
                    <span>{{growthPercent}}%</span>
                  </div>
                  <div class="w-full h-4 bg-gray-100 rounded-full p-1">
                    <div class="h-full rounded-full transition-all duration-500" :style="{ width: growthPercent + '%', backgroundColor: growthStage.color }"></div>
                  </div>
                </div>
                <div class="flex justify-center gap-2 mt-4">
                  <div class="flex items-center gap-1">
                    <div class="w-3 h-3 rounded-full" :class="growthPercent >= 0 ? 'bg-gray-400' : 'bg-gray-200'"></div>
                    <span class="text-xs text-gray-400">种子</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <div class="w-3 h-3 rounded-full" :class="growthPercent >= 25 ? 'bg-green-300' : 'bg-gray-200'"></div>
                    <span class="text-xs text-gray-400">发芽</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <div class="w-3 h-3 rounded-full" :class="growthPercent >= 50 ? 'bg-green-500' : 'bg-gray-200'"></div>
                    <span class="text-xs text-gray-400">长叶</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <div class="w-3 h-3 rounded-full" :class="growthPercent >= 75 ? 'bg-[#3D9B6E]' : 'bg-gray-200'"></div>
                    <span class="text-xs text-gray-400">开花</span>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-4 w-full mt-8">
                  <div class="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-center">
                    <iconify-icon icon="solar:water-drops-linear" class="text-xl text-blue-500"></iconify-icon>
                    <div class="text-xs text-gray-500 mt-1">水分</div>
                    <div class="font-bold text-blue-600">{{currentFlower.water || 0}}/100</div>
                  </div>
                  <div class="bg-green-50/50 p-4 rounded-2xl border border-green-100 text-center">
                    <iconify-icon icon="solar:leaf-linear" class="text-xl text-[#3D9B6E]"></iconify-icon>
                    <div class="text-xs text-gray-500 mt-1">养分</div>
                    <div class="font-bold text-[#3D9B6E]">{{currentFlower.nutrient || 0}}/100</div>
                  </div>
                  <div class="bg-yellow-50/50 p-4 rounded-2xl border border-yellow-100 text-center">
                    <iconify-icon icon="solar:sun-2-linear" class="text-xl text-yellow-600"></iconify-icon>
                    <div class="text-xs text-gray-500 mt-1">阳光</div>
                    <div class="font-bold text-yellow-600">{{currentFlower.sunlight || 0}}/100</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-3xl p-6 custom-shadow flex flex-col">
              <h3 class="text-lg font-bold flex items-center gap-2 mb-6">
                <iconify-icon class="text-[#3D9B6E]" icon="solar:shop-2-linear"></iconify-icon>培育商城
              </h3>
              <div class="space-y-4 flex-1 overflow-y-auto pr-2">
                <div v-for="item in shopItems" :key="item.id" 
                     class="p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white hover:border-[#3D9B6E] transition-all">
                  <div class="flex items-center">
                    <span class="text-3xl mr-4">{{getShopItemIcon(item.itemName)}}</span>
                    <div class="flex-1">
                      <h4 class="font-bold text-sm">{{item.itemName}}</h4>
                      <div class="text-xs text-[#3D9B6E] mt-1">{{item.price}} 积分（{{getItemTypeName(item.itemType)}}+{{item.growthValue}}）</div>
                    </div>
                    <button @click="exchangeItem(item.id, item.price)" class="px-3 py-1.5 bg-[#3D9B6E] text-white rounded-lg text-xs font-bold">兑换</button>
                  </div>
                </div>
                <div v-if="shopItems.length === 0" class="text-center py-8 text-gray-400">
                  <iconify-icon class="text-4xl mb-2" icon="solar:shop-linear"></iconify-icon>
                  <p>暂无道具</p>
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-gray-100 text-center">
                <p class="text-xs text-gray-400">完成自习/作业获取积分兑换道具</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 图鉴页面 -->
        <div v-if="flowerTab==='book'" class="bg-white p-6 rounded-2xl custom-shadow">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <span>🌸</span>花卉图鉴
            </h3>
            <span class="text-gray-500">已收集 {{collectedCount}}/{{seedsList.length}}</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            <div v-for="seed in seedsList" :key="seed.id" 
                 class="rounded-xl flex flex-col items-center justify-center border-2 p-4 cursor-pointer transition-all"
                 :class="isFlowerUnlocked(seed.variety) ? 'border-[#3D9B6E] bg-green-50 ring-2 ring-[#3D9B6E]/30' : 'border-gray-200 bg-gray-100'">
              <img v-if="seed.image" :src="seed.image" class="w-16 h-16 object-contain" />
              <span v-else class="text-5xl">{{getFlowerIcon(seed.variety)}}</span>
              <span class="text-base mt-2 font-medium">{{seed.variety}}</span>
              <span class="text-xs text-gray-500 mt-1 text-center">{{seed.description}}</span>
              <span v-if="isFlowerUnlocked(seed.variety)" class="text-xs text-[#3D9B6E] mt-2 bg-green-100 px-2 py-1 rounded">已收集✓</span>
              <button v-else @click.stop="plantFlower(seed.id)" 
                      class="mt-2 px-3 py-1 bg-[#3D9B6E] text-white text-xs rounded-lg hover:bg-[#2E8A5E] transition-colors">
                {{seed.price === 0 ? '免费领取' : `${seed.price}积分种植`}}
              </button>
            </div>
          </div>
          <div class="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex gap-3 items-start">
            <iconify-icon icon="solar:bulb-linear" class="text-xl text-yellow-500 mt-0.5"></iconify-icon>
            <div class="text-sm text-gray-600">
              <div class="font-medium text-gray-700 mb-1">培育提示</div>
              持续浇水和施肥可以加快花卉生长，开花后采摘即可点亮图鉴！
            </div>
          </div>
        </div>

        <!-- 花卉详情弹窗 -->
        <div v-if="showFlowerDetail" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" @click="closeFlowerDetail">
          <div class="bg-white rounded-3xl p-8 max-w-lg w-full mx-4" @click.stop>
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">{{selectedFlower?.name}}</h3>
              <button @click="closeFlowerDetail" class="text-gray-400 hover:text-gray-600">
                <iconify-icon icon="solar:close-linear" class="text-2xl"></iconify-icon>
              </button>
            </div>
            <p class="text-gray-500 text-sm mb-6">{{selectedFlower?.desc}}</p>
            <div class="grid grid-cols-4 gap-4">
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-2 overflow-hidden">
                  <img v-if="getSeedStageImage(selectedFlower?.name, 0)" :src="getSeedStageImage(selectedFlower?.name, 0)" class="w-full h-full object-cover" />
                  <svg v-else viewBox="0 0 60 60" class="w-10 h-10">
                    <ellipse cx="30" cy="45" rx="8" ry="5" fill="#8B7355" />
                    <ellipse cx="30" cy="45" rx="6" ry="3" fill="#A0522D" />
                    <path d="M30 40 Q30 35 30 30" stroke="#8B7355" stroke-width="2" fill="none" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500">种子(0%)</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mb-2 overflow-hidden">
                  <img v-if="getSeedStageImage(selectedFlower?.name, 1)" :src="getSeedStageImage(selectedFlower?.name, 1)" class="w-full h-full object-cover" />
                  <svg v-else viewBox="0 0 60 60" class="w-10 h-10">
                    <ellipse cx="30" cy="48" rx="8" ry="5" fill="#8B7355" />
                    <path d="M30 45 Q30 25 30 18" stroke="#90EE90" stroke-width="4" fill="none" stroke-linecap="round" />
                    <ellipse cx="30" cy="15" rx="7" ry="10" fill="#90EE90" transform="rotate(-30 30 15)" />
                    <ellipse cx="30" cy="15" rx="7" ry="10" fill="#90EE90" transform="rotate(30 30 15)" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500">发芽(25%)</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-2 overflow-hidden">
                  <img v-if="getSeedStageImage(selectedFlower?.name, 2)" :src="getSeedStageImage(selectedFlower?.name, 2)" class="w-full h-full object-cover" />
                  <svg v-else viewBox="0 0 60 60" class="w-10 h-10">
                    <ellipse cx="30" cy="50" rx="8" ry="5" fill="#8B7355" />
                    <path d="M30 47 Q30 30 30 18" stroke="#228B22" stroke-width="5" fill="none" stroke-linecap="round" />
                    <ellipse cx="30" cy="15" rx="8" ry="14" fill="#32CD32" transform="rotate(-45 30 15)" />
                    <ellipse cx="30" cy="15" rx="8" ry="14" fill="#32CD32" transform="rotate(45 30 15)" />
                    <ellipse cx="30" cy="28" rx="6" ry="11" fill="#228B22" transform="rotate(-30 30 28)" />
                    <ellipse cx="30" cy="28" rx="6" ry="11" fill="#228B22" transform="rotate(30 30 28)" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500">长叶(50%)</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-green-200 rounded-xl flex items-center justify-center mb-2 overflow-hidden">
                  <img v-if="getSeedStageImage(selectedFlower?.name, 3)" :src="getSeedStageImage(selectedFlower?.name, 3)" class="w-full h-full object-cover" />
                  <svg v-else viewBox="0 0 60 60" class="w-10 h-10">
                    <ellipse cx="30" cy="50" rx="8" ry="5" fill="#8B7355" />
                    <path d="M30 47 Q30 30 30 22" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round" />
                    <ellipse cx="30" cy="18" rx="6" ry="9" fill="#32CD32" transform="rotate(-30 30 18)" />
                    <ellipse cx="30" cy="18" rx="6" ry="9" fill="#32CD32" transform="rotate(30 30 18)" />
                    <circle cx="30" cy="10" r="8" fill="#FFB6C1" />
                    <circle cx="30" cy="10" r="6" fill="#FF69B4" />
                    <ellipse cx="27" cy="8" rx="2" ry="4" fill="#FF1493" transform="rotate(-30 27 8)" />
                    <ellipse cx="33" cy="8" rx="2" ry="4" fill="#FF1493" transform="rotate(30 33 8)" />
                    <ellipse cx="30" cy="5" rx="2" ry="4" fill="#FF1493" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500">开花(100%)</span>
              </div>
            </div>
            <div class="mt-6 text-center">
              <button @click="closeFlowerDetail" class="px-8 py-2 bg-[#3D9B6E] text-white rounded-xl">关闭</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 个人信息弹窗 -->
    <div v-if="showPersonalInfo" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" @click="closePersonalInfo">
      <div class="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">个人信息</h3>
          <button @click="closePersonalInfo" class="text-gray-400 hover:text-gray-600">
            <iconify-icon icon="solar:close-linear" class="text-2xl"></iconify-icon>
          </button>
        </div>
        <div class="flex flex-col items-center mb-8">
          <div class="relative">
            <div class="w-24 h-24 rounded-full border-4 border-[#3D9B6E]/20 p-1 overflow-hidden">
              <img :src="userInfo.avatar" alt="头像" class="w-full h-full rounded-full object-cover">
            </div>
            <label class="absolute bottom-0 right-0 w-8 h-8 bg-[#3D9B6E] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2E8A5E] transition-colors">
              <iconify-icon icon="solar:camera-linear" class="text-white text-sm"></iconify-icon>
              <input type="file" accept="image/*" class="hidden" @change="handleAvatarChange">
            </label>
          </div>
          <div class="mt-4">
            <div class="flex items-center gap-2">
              <input v-model="userInfo.name" class="text-xl font-bold text-center bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#3D9B6E] outline-none transition-colors">
              <span class="text-xs text-gray-400 px-2 py-0.5 bg-gray-100 rounded">{{getRoleName(userInfo.role)}}</span>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-xs text-gray-400 mb-2">用户ID</label>
            <input v-model="userInfo.id" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] focus:ring-2 focus:ring-[#3D9B6E]/10 outline-none" disabled>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-2">我的积分</label>
            <div class="w-full px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl flex items-center">
              <iconify-icon icon="solar:coins-bold" class="text-yellow-500 mr-2"></iconify-icon>
              <span class="font-bold text-yellow-600">{{score}}</span>
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-2">手机号</label>
            <input v-model="userInfo.phone" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] focus:ring-2 focus:ring-[#3D9B6E]/10 outline-none" readonly>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-2">个人简介</label>
            <textarea v-model="userInfo.bio" rows="3" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] focus:ring-2 focus:ring-[#3D9B6E]/10 outline-none resize-none"></textarea>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-2">用户角色</label>
            <input :value="getRoleName(userInfo.role)" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] focus:ring-2 focus:ring-[#3D9B6E]/10 outline-none" readonly>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-2">原密码</label>
            <input v-model="oldPassword" type="password" placeholder="输入原密码" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] focus:ring-2 focus:ring-[#3D9B6E]/10 outline-none">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-2">新密码</label>
            <input v-model="userInfo.password" type="password" placeholder="输入新密码" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#3D9B6E] focus:ring-2 focus:ring-[#3D9B6E]/10 outline-none">
          </div>
        </div>
        <div class="mt-8 flex gap-4">
          <button @click="closePersonalInfo" class="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50">取消</button>
          <button @click="changePassword" class="flex-1 px-6 py-3 border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-50">修改密码</button>
          <button @click="savePersonalInfo" class="flex-1 px-6 py-3 bg-[#3D9B6E] text-white rounded-xl hover:bg-[#2E8A5E]">保存信息</button>
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
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
const router = useRouter()

// 页面控制
const page = ref('courses')
const breadcrumb = ref('我的课程')
const subOpen = ref(false)
const profileOpen = ref(false)

// 课程
const courseList = ref([])
const courseCode = ref('')

const fetchCourseList = async () => {
  try {
    const res = await request.get('/qingyun/course/student/list', {
      params: { pageNum: 1, pageSize: 10 }
    })
    
    if(res.data){
      courseList.value = res.data.map(item => ({
        id: item.courseId,
        name: item.courseTitle,
        shortName: item.courseTitle.slice(0, 3).toUpperCase(),
        teacher: item.teacherName,
        cover: item.cover,
        status: item.status === 'active' ? '进行中' : (item.status === 'completed' ? '已结束' : '待开始')
      }))
    }
  } catch (error) {
    showToast(error.message || '获取课程列表失败', 'error')
  }
}

// 自习变量
const timeMode = ref('forward')
const countMinute = ref(60) // 倒计时手动输入分钟
const studyTarget = ref('')
const studyMode = ref('normal') // 仅普通、番茄钟
const studying = ref(false)
const showTime = ref('00:00:00')
const tomatoPhase = ref('study') // study/rest
const clockDegree = ref(0)
let timer = null
let totalSec = 0
let studyRecordId = null
let screenSwitchCount = 0
let totalStudyTime = 0
const studyRecord = ref([])
const totalStudyHour = ref(0)
const weekStudyHour = ref(0)

const fetchStudyRecords = async () => {
  try {
    const res = await request.get('/qingyun/studyroom/records', {
      params: { page: 1, size: 10 }
    })
    
    const data = res.data || res
    if(data && data.location){
      studyRecord.value = data.location.map(item => {
        const totalSec = item.totalTime || 0
        const hours = Math.floor(totalSec / 3600)
        const minutes = Math.floor((totalSec % 3600) / 60)
        let duration = ''
        if(hours > 0) duration += `${hours}h`
        if(minutes > 0) duration += `${minutes}m`
        if(duration === '') duration = '<1m'
        
        const isValid = totalSec >= 900
        const score = isValid ? Math.floor(totalSec / 900) * 2 : 0
        
        return {
          id: item.id,
          goal: item.goal || '自习',
          date: item.endTime ? item.endTime.split('T')[0] : new Date().toLocaleDateString(),
          duration: duration,
          isValid: isValid,
          score: score
        }
      })
    }
  } catch (error) {
    showToast(error.message || '获取自习记录失败', 'error')
  }
}

const analysisData = ref({
  totalStudyDuration: 0,
  assignmentCorrectRate: 0,
  weekStudyDuration: 0
})

const fetchStudyStatistic = async () => {
  try {
    const res = await request.get('/qingyun/analysis/student')
    
    const data = res.data || res
    if(data){
      analysisData.value = {
        totalStudyDuration: data.totalStudyDuration || 0,
        assignmentCorrectRate: data.assignmentCorrectRate || 0,
        weekStudyDuration: data.weekStudyDuration || 0
      }
      
      weekStudyHour.value = (data.weekStudyDuration / 3600).toFixed(1)
      totalStudyHour.value = (data.totalStudyDuration / 3600).toFixed(1)
    }
  } catch (error) {
    showToast(error.message || '获取学情分析失败', 'error')
  }
}

// 学情分析报告切换
const reportTab = ref('week')

// 花卉变量
const score = ref(Number(localStorage.getItem('score') || 328))
const flowerTab = ref('grow') // grow培育 / book图鉴
const showFlowerDetail = ref(false)
const selectedFlower = ref(null)

const flowerList = ref([])

const fetchFlowerList = async () => {
  try {
    const res = await request.get('/qingyun/flowers/my', {
      params: { page: 1, size: 20 }
    })
    
    const data = res.data || res
    if (data && Array.isArray(data)) {
      flowerList.value = data.map(item => ({
        id: item.id,
        seedId: item.seedId,
        name: item.variety,
        icon: getFlowerIcon(item.variety),
        unlock: item.isUnlocked === 1,
        desc: getFlowerDesc(item.variety),
        stage: item.stage || 0,
        sunlight: item.sunlight || 0,
        water: item.water || 0,
        nutrient: item.nutrient || 0,
        growthPercent: item.growthPercent || 0,
        stages: ['seed','sprout','leaf','bloom']
      }))
    }
  } catch (error) {
    console.error('获取花卉列表失败', error)
    flowerList.value = [
      {id:1,seedId:1,name:'蓝风铃',icon:'🌸',unlock:true,desc:'清新淡雅的蓝色风铃花', stage: 0, sunlight: 0, water: 0, nutrient: 0, growthPercent: 0, stages: ['seed','sprout','leaf','bloom']}
    ]
  }
}

const getFlowerIcon = (variety) => {
  const icons = {
    '蓝风铃': '🌸',
    '向日葵': '🌻',
    '玫瑰': '🌹',
    '紫罗兰': '💜',
    '茉莉花': '🤍',
    '郁金香': '🌷',
    '百合花': '💐',
    '樱花': '🌸',
    '牡丹': '🌺'
  }
  return icons[variety] || '🌸'
}

const getFlowerDesc = (variety) => {
  const descs = {
    '蓝风铃': '清新淡雅的蓝色风铃花',
    '向日葵': '永远追随阳光的温暖花朵',
    '玫瑰': '热情绽放的经典玫瑰',
    '紫罗兰': '优雅神秘的紫色精灵',
    '茉莉花': '洁白芬芳的纯洁之花',
    '郁金香': '高贵优雅的郁金香',
    '百合花': '纯洁高雅的百合花',
    '樱花': '浪漫唯美的樱花',
    '牡丹': '国色天香的牡丹花'
  }
  return descs[variety] || '美丽的花卉'
}

const growthPercent = computed(() => {
  return currentFlower.value.growthPercent || 0
})

const growthStage = computed(() => {
  const stage = currentFlower.value.stage || 0
  const stages = [
    { name: '种子', icon: 'seed', color: '#8B7355' },
    { name: '发芽', icon: 'sprout', color: '#90EE90' },
    { name: '长叶', icon: 'leaf', color: '#228B22' },
    { name: '开花', icon: 'bloom', color: '#3D9B6E' }
  ]
  return stages[stage] || stages[0]
})

const currentFlower = computed(() => {
  const unlocked = flowerList.value.find(f => f.unlock)
  return unlocked || { id:1, seedId:1, name:'蓝风铃', icon:'🌸', unlock:true, stage: 0, sunlight: 0, water: 0, nutrient: 0, growthPercent: 0 }
})
const collectedCount = computed(()=>{
  return flowerList.value.filter(item=>item.unlock).length
})
const scoreLog = ref([])
const shopItems = ref([])
const seedsList = ref([])

const fetchShopItems = async () => {
  try {
    const res = await request.get('/qingyun/flowers/shop')
    
    const data = res.data || res
    if (data && Array.isArray(data)) {
      shopItems.value = data.map(item => ({
        id: item.id,
        itemName: item.itemName,
        icon: item.icon,
        price: item.price,
        boostValue: item.boostValue || 10,
        attributeType: item.attributeType,
        itemType: getAttributeType(item.attributeType)
      }))
    }
  } catch (error) {
    console.error('获取道具商店失败', error)
    shopItems.value = [
      {id:1, itemName:'有机肥料', icon:'', price:5, boostValue:10, attributeType:2, itemType:'feed'},
      {id:2, itemName:'纯净水', icon:'', price:10, boostValue:10, attributeType:3, itemType:'water'},
      {id:3, itemName:'阳光精华', icon:'', price:8, boostValue:10, attributeType:1, itemType:'sun'}
    ]
  }
}

const fetchSeeds = async () => {
  try {
    const res = await request.get('/qingyun/flowers/seeds')
    
    const data = res.data || res
    if (data && Array.isArray(data)) {
      seedsList.value = data.map(item => ({
        id: item.id,
        variety: item.variety,
        description: item.description,
        sunlightMax: item.sunlightMax || 100,
        waterMax: item.waterMax || 100,
        nutrientMax: item.nutrientMax || 100,
        image: item.image,
        stage0Image: item.stage0Image,
        stage1Image: item.stage1Image,
        stage2Image: item.stage2Image,
        stage3Image: item.stage3Image,
        price: item.price
      }))
    }
  } catch (error) {
    console.error('获取种子商店失败', error)
    seedsList.value = [
      {id:1, variety:'向日葵', description:'向阳而生，充满活力的花朵', sunlightMax:100, waterMax:80, nutrientMax:60, image:'', stage0Image:'', stage1Image:'', stage2Image:'', stage3Image:'', price:0},
      {id:2, variety:'玫瑰', description:'热情绽放的经典玫瑰', sunlightMax:80, waterMax:100, nutrientMax:100, image:'', stage0Image:'', stage1Image:'', stage2Image:'', stage3Image:'', price:50},
      {id:3, variety:'蓝风铃', description:'清新淡雅的蓝色风铃花', sunlightMax:60, waterMax:100, nutrientMax:80, image:'', stage0Image:'', stage1Image:'', stage2Image:'', stage3Image:'', price:30}
    ]
  }
}

const fetchScoreRecords = async () => {
  try {
    const res = await request.get('/qingyun/flowers/records')
    
    if(res.data){
      if(res.data.currentPoints !== undefined){
        score.value = res.data.currentPoints
        localStorage.setItem('score', score.value)
      }
      
      if(res.data.records){
        scoreLog.value = res.data.records.map(item => ({
          id: item.id,
          desc: getRecordDesc(item.changeType, item.sourceType),
          num: item.changePoints,
          type: item.changeType === 1 ? 'add' : 'minus',
          time: item.changeTime,
          leftPoints: item.leftPoints
        }))
      }
    }
  } catch (error) {
    console.error('获取积分流水失败', error)
  }
}

const getRecordDesc = (changeType, sourceType) => {
  const types = {
    1: {
      1: '自习时长奖励',
      2: '作业完成奖励',
      3: '签到奖励',
      4: '课程完成奖励',
      5: '其他奖励'
    },
    2: {
      1: '兑换道具',
      2: '购买种子',
      3: '积分扣除',
      4: '其他消费',
      5: '种植花卉'
    }
  }
  return types[changeType]?.[sourceType] || (changeType === 1 ? '积分增加' : '积分减少')
}

const formatTime = (timeStr) => {
  if(!timeStr) return ''
  const date = new Date(timeStr)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${month}-${day} ${hours}:${minutes}`
}

const plantFlower = async (seedId) => {
  const seed = seedsList.value.find(s => s.id === seedId)
  if(!seed) return showToast('种子不存在','error')
  
  if(seed.price > 0 && score.value < seed.price){
    return showToast('积分不足，无法购买种子','error')
  }
  
  try {
    const res = await request.post('/qingyun/flowers/plant', {
      seedId: seedId
    })
    
    water.value = 0
    feed.value = 0
    sun.value = 0
    
    fetchFlowerList()
    fetchSeeds()
    fetchScoreRecords()
    showToast(res.message || '播种成功')
  } catch (error) {
    showToast(error.message || '种植失败', 'error')
  }
}

const getItemType = (itemName) => {
  if (itemName.includes('水') || itemName.includes('壶')) return 'water'
  if (itemName.includes('肥') || itemName.includes('料')) return 'feed'
  if (itemName.includes('阳') || itemName.includes('光')) return 'sun'
  return 'water'
}

const getAttributeType = (type) => {
  const types = {
    1: 'sun',
    2: 'feed',
    3: 'water'
  }
  return types[type] || 'water'
}

const getItemTypeName = (type) => {
  const names = {
    'water': '水分',
    'feed': '养分',
    'sun': '阳光'
  }
  return names[type] || '属性'
}

const getSeedStageImage = (variety, stage) => {
  const seed = seedsList.value.find(s => s.variety === variety)
  if(!seed) return null
  const images = [seed.stage0Image, seed.stage1Image, seed.stage2Image, seed.stage3Image]
  return images[stage] || null
}

const getCurrentStageImage = () => {
  const flower = currentFlower.value
  if(!flower) return null
  return getSeedStageImage(flower.name, flower.stage || 0)
}

const isFlowerUnlocked = (variety) => {
  return flowerList.value.some(f => f.name === variety && f.unlock)
}

const getShopItemIcon = (itemName) => {
  const icons = {
    '浇水壶': '💧',
    '肥料包': '🌱',
    '阳光精华': '☀️',
    '纯净水': '💧',
    '有机肥料': '🌱',
    '高级肥料': '🌿'
  }
  return icons[itemName] || '🎁'
}

// 用户信息变量
const showPersonalInfo = ref(false)
const userInfo = ref({
  id: '',
  name: '',
  phone: '',
  avatar: '',
  bio: '',
  role: 1,
  status: 1,
  points: 0,
  password: ''
})

const fetchUserInfo = async () => {
  try {
    const res = await request.get('/qingyun/info')
    
    if(res.data){
      userInfo.value = {
        id: res.data.id || '',
        name: res.data.name || '',
        phone: res.data.phone || '',
        avatar: res.data.avatar || 'https://picsum.photos/id/1005/100/100',
        bio: res.data.bio || '',
        role: res.data.role || 1,
        status: res.data.status || 1,
        points: res.data.points || 0,
        password: ''
      }
      
      if(res.data.points !== undefined){
        score.value = res.data.points
        localStorage.setItem('score', score.value)
      }
    }
  } catch (error) {
    console.error('获取个人信息失败', error)
  }
}

const getRoleName = (role) => {
  const roles = {
    1: '学员',
    2: '讲师',
    3: '管理员'
  }
  return roles[role] || '学员'
}

const showFlowerDetailModal = (flower) => {
  selectedFlower.value = flower
  showFlowerDetail.value = true
}

const closeFlowerDetail = () => {
  showFlowerDetail.value = false
  selectedFlower.value = null
}

const handlePersonalInfo = () => {
  profileOpen.value = false
  showPersonalInfo.value = true
}

const closePersonalInfo = () => {
  showPersonalInfo.value = false
}

const savePersonalInfo = async () => {
  try {
    const res = await request.put('/qingyun/info', {
      name: userInfo.value.name,
      avatar: userInfo.value.avatar,
      bio: userInfo.value.bio
    })
    
    showToast(res.message || '个人信息修改成功')
    closePersonalInfo()
  } catch (error) {
    showToast(error.message || '修改失败', 'error')
  }
}

const oldPassword = ref('')

const changePassword = async () => {
  if(!oldPassword.value) return showToast('请输入原密码','error')
  if(!userInfo.value.password) return showToast('请输入新密码','error')
  
  try {
    const res = await request.put('/qingyun/password', {
      oldPassword: oldPassword.value,
      newPassword: userInfo.value.password
    })
    
    showToast(res.message || '密码修改成功')
    oldPassword.value = ''
    userInfo.value.password = ''
  } catch (error) {
    showToast(error.message || '密码修改失败', 'error')
  }
}

const handleAvatarChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('file', file)
  formData.append('dir', 'avatar')
  
  try {
    const res = await request.post('/qingyun/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    const data = res.data || res
    const avatarUrl = data.data || data
    
    if(avatarUrl){
      userInfo.value.avatar = avatarUrl
      
      await request.put('/qingyun/info', {
        avatar: avatarUrl
      })
      
      showToast('头像上传成功')
    }
  } catch (error) {
    console.error('头像上传失败', error)
    showToast('头像上传失败', 'error')
  }
}

const scoreLogPanelShow = ref(false)

// Toast
const toast = ref({ show: false, msg: '', type: 'success' })
const showToast = (msg, type='success') => {
  toast.value = { show:true, msg, type }
  setTimeout(()=>toast.value.show=false, 2500)
}

// 点击空白关闭积分面板
const closeScoreLogPanel = () => {
  scoreLogPanelShow.value = false
}
const toggleScorePanel = () => {
  scoreLogPanelShow.value = !scoreLogPanelShow.value
}

// 外部点击关闭下拉
const handleClickOutside = (e) => {
  const clickSub = e.target.closest('.sidebar-item') || e.target.closest('.submenu-enter')
  if (!clickSub) subOpen.value = false
  const clickPro = e.target.closest('.profile-wrap')
  if (!clickPro) profileOpen.value = false
}
onMounted(() => { 
  document.addEventListener('click', handleClickOutside)
  fetchUserInfo()
})
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// 页面切换
const switchPage = (name) => {
  page.value = name
  profileOpen.value = false
  const map = {
    courses:'我的课程',
    assignments:'我的作业',
    notifications:'系统通知',
    studyroom:'自习室',
    analysis:'个人中心 > 学情分析',
    flower:'个人中心 > 青耘花卉培育'
  }
  breadcrumb.value = map[name]
  
  if(name === 'studyroom'){
    fetchStudyRecords()
    fetchStudyStatistic()
  }
  
  if(name === 'notifications'){
    fetchNotifications()
    if(!notificationTimer){
      notificationTimer = setInterval(fetchNotifications, 30000)
    }
  } else {
    if(notificationTimer){
      clearInterval(notificationTimer)
      notificationTimer = null
    }
  }
  
  if(name === 'courses'){
    fetchCourseList()
  }
  
  if(name === 'flower'){
    fetchFlowerList()
    fetchShopItems()
    fetchSeeds()
    fetchScoreRecords()
    fetchUserInfo()
  }
  
  if(name === 'assignments'){
    fetchAssignmentList()
  }
}

// 下拉控制
const toggleSubmenu = (e) => { e.stopPropagation(); subOpen.value = !subOpen.value }
const toggleProfileMenu = (e) => { e.stopPropagation(); profileOpen.value = !profileOpen.value }

// 账号操作
const handleLogout = () => {
  localStorage.clear()
  router.push('/login')
  showToast('已退出登录')
}

// 课程
const joinCourse = async () => {
  if(!courseCode.value) return showToast('请输入6位课程码','error')
  try {
    const res = await request.post('/qingyun/course/join', {
      courseCode: courseCode.value
    })
    showToast(res.message || '课程加入成功')
    courseCode.value = ''
    fetchCourseList()
  } catch (error) {
    showToast(error.message || '加入课程失败', 'error')
  }
}

// 作业模块
const assignmentList = ref([])
const assignmentPageNum = ref(1)
const assignmentPageSize = ref(10)
const assignmentTotal = ref(0)
const assignmentPages = ref(0)

const getAssignmentStatus = (status) => {
  const statusMap = {
    'PENDING': { text: '未提交', color: 'text-gray-400', border: 'border-gray-100' },
    'SUBMITTED': { text: '已提交', color: 'text-[#3D9B6E]', border: 'border-[#3D9B6E]' },
    'OVERDUE': { text: '已逾期', color: 'text-red-500', border: 'border-red-400' }
  }
  return statusMap[status] || statusMap['PENDING']
}

const formatDeadline = (deadline) => {
  if(!deadline) return ''
  const date = new Date(deadline)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${month}-${day} ${hours}:${minutes}`
}

const fetchAssignmentList = async (pageNum = 1) => {
  try {
    const res = await request.get('/qingyun/assignment/student/list', {
      params: {
        page: pageNum,
        size: assignmentPageSize.value
      }
    })
    
    const data = res.data || res
    const list = data.list || (Array.isArray(data) ? data : [])
    const total = data.total || list.length
    const pages = data.pages || Math.ceil(total / assignmentPageSize.value)
    
    assignmentList.value = list.map(item => ({
      id: item.assignmentId || item.id,
      courseId: item.courseId,
      courseName: item.courseName || '未知课程',
      title: item.assignmentTitle || item.title || '未命名作业',
      deadline: item.deadline,
      maxScore: item.maxScore,
      status: item.status || 'PENDING',
      myScore: item.myScore,
      createdAt: item.createdAt
    }))
    
    assignmentTotal.value = total
    assignmentPageNum.value = pageNum
    assignmentPages.value = pages
  } catch (error) {
    console.error('获取作业列表失败', error)
  }
}

const submitWork = () => showToast('作业提交成功')

// 自习计时逻辑
const startStudy = async () => {
  if(timeMode.value === 'countdown' && (!countMinute.value || countMinute.value <= 0)){
    return showToast('请填写有效的倒计时分钟数','error')
  }
  
  const mode = timeMode.value === 'forward' ? 1 : 2
  const planTime = timeMode.value === 'forward' ? null : countMinute.value * 60
  const focusMode = studyMode.value === 'tomato' ? 1 : 0
  const goal = studyTarget.value || '自习'
  
  try {
    const res = await request.post('/qingyun/studyroom/create', {
      goal,
      mode,
      planTime,
      focusMode
    })
    
    studyRecordId = res.data.id
    studying.value = true
    tomatoPhase.value = 'study'
    clockDegree.value = 0
    totalSec = 0
    totalStudyTime = 0
    screenSwitchCount = 0
    clearInterval(timer)
    
    if(focusMode === 1){
      startTomatoCycle(mode, planTime)
    } else {
      timer = setInterval(()=>{
        if(mode === 1) totalSec++
        else totalSec--
        clockDegree.value += 0.1
        if(totalSec <= 0 && mode === 2){
          endStudy()
          return
        }
        updateTimeDisplay()
      },1000)
    }
    
    showToast(res.message || '开始学习')
  } catch (error) {
    showToast(error.message || '开始自习失败', 'error')
  }
}

const startTomatoCycle = async (mode, planTime) => {
  const studyTime = 15 * 60
  const restTime = 5 * 60
  let cycleSec = tomatoPhase.value === 'study' ? studyTime : restTime
  
  timer = setInterval(()=>{
    cycleSec--
    if(tomatoPhase.value === 'study'){
      totalSec++
      totalStudyTime++
    }
    clockDegree.value += 0.1
    
    if(cycleSec <= 0){
      clearInterval(timer)
      
      if(tomatoPhase.value === 'study'){
        showToast('学习时间结束，请休息5分钟')
        tomatoPhase.value = 'rest'
        
        if(planTime && totalStudyTime >= planTime){
          endStudy()
          return
        }
        
        setTimeout(() => {
          showToast('休息时间结束，请继续学习')
          tomatoPhase.value = 'study'
          startNextTomatoCycle(mode, planTime)
        }, restTime * 1000)
      }
    }
    updateTimeDisplay()
  },1000)
}

const startNextTomatoCycle = async (mode, planTime) => {
  const focusMode = 1
  const goal = studyTarget.value || '自习'
  
  try {
    const res = await request.post('/qingyun/studyroom/create', {
      goal,
      mode,
      planTime,
      focusMode
    })
    
    studyRecordId = res.data.id
    startTomatoCycle(mode, planTime)
  } catch (error) {
    showToast(error.message || '继续学习失败', 'error')
    studying.value = false
  }
}

const updateTimeDisplay = () => {
  const h = Math.floor(totalSec / 3600).toString().padStart(2,'0')
  const m = Math.floor((totalSec % 3600)/60).toString().padStart(2,'0')
  const s = (totalSec % 60).toString().padStart(2,'0')
  showTime.value = `${h}:${m}:${s}`
}

const endStudy = async () => {
  clearInterval(timer)
  studying.value = false
  
  try {
    let addScore = 0
    let actualTotalSec = totalSec
    
    if(studyRecordId){
      const res = await request.post('/qingyun/studyroom/end', {
        id: studyRecordId
      })
      
      const data = res.data || res
      if(data && data.totalTime !== undefined){
        actualTotalSec = data.totalTime
      }
    }
    
    addScore = actualTotalSec >= 900 ? Math.floor(actualTotalSec / 900) * 2 : 0
    
    const hour = (actualTotalSec / 3600).toFixed(1)
    const now = new Date().toLocaleDateString()
    const goal = studyTarget.value || '自习'
    studyRecord.value.unshift({
      id: studyRecordId || Date.now(),
      goal: goal,
      date: now,
      duration: `${hour}小时`,
      isValid: addScore > 0,
      score: addScore
    })
    totalStudyHour.value += Number(hour)
    weekStudyHour.value += Number(hour)
    score.value += addScore
    localStorage.setItem('score', score.value)
    showToast(addScore > 0 ? `自习结束，获得${addScore}积分` : '自习结束，时长不足15分钟，未获得积分')
    
    fetchStudyRecords()
    fetchStudyStatistic()
    fetchScoreRecords()
  } catch (error) {
    showToast(error.message || '结束自习失败', 'error')
  }
  
  showTime.value = '00:00:00'
  clockDegree.value = 0
  studyRecordId = null
  totalStudyTime = 0
  screenSwitchCount = 0
}

const exchangeItem = async (itemId, cost) => {
  const item = shopItems.value.find(i => i.id === itemId)
  if(!item) return showToast('道具不存在','error')
  
  if(score.value < cost) return showToast('积分不足','error')
  
  try {
    const res = await request.post('/qingyun/flowers/exchange', {
      itemId: itemId
    })
    
    fetchFlowerList()
    fetchScoreRecords()
    showToast(res.message || '兑换成功')
  } catch (error) {
    showToast(error.message || '兑换失败', 'error')
  }
}
const switchGrow = (f) => {
  if(!f.unlock) return showToast('该花卉尚未解锁','error')
  currentFlower.value = { id:f.id, name:f.name, percent:65, growText:'茁壮成长中' }
  flowerTab.value = 'grow'
}

// 通知
const notificationList = ref([])
let prevUnread = 0
let notificationTimer = null

const fetchNotifications = async () => {
  try {
    const res = await request.get('/qingyun/notices', {
      params: { page: 1, size: 10 }
    })
    
    if(res.data && res.data.location){
      notificationList.value = res.data.location
      
      if(res.data.unreadCount > prevUnread){
        showToast('您有新的通知')
      }
      prevUnread = res.data.unreadCount || 0
    }
  } catch (error) {
    console.error('获取通知失败', error)
  }
}

const readSingle = async (notice) => {
  if(notice.noticeStatus === 0){
    try {
      await request.put(`/qingyun/notices/read/${notice.id}`)
      notice.noticeStatus = 1
    } catch (error) {
      showToast('标记已读失败', 'error')
    }
  }
}

const readAll = async () => {
  try {
    await request.put('/qingyun/notices/read-all')
    notificationList.value.forEach(notice => {
      notice.noticeStatus = 1
    })
    showToast('全部标记已读')
  } catch (error) {
    showToast('操作失败', 'error')
  }
}

const getNoticeIcon = (type) => {
  const icons = {
    0: 'solar:megaphone-linear',
    1: 'solar:book-linear',
    4: 'solar:check-circle-linear'
  }
  return icons[type] || 'solar:bell-linear'
}

const formatNoticeTime = (time) => {
  if(!time) return ''
  return time.split('T')[0]
}
</script>

<style scoped>
body {
  font-family: system-ui, SimSun, Microsoft YaHei;
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
.animate-spin-slow {
  animation: spin 4s linear infinite;
}
@keyframes spin {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}
</style>