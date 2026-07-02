<template>
  <div class="min-h-screen bg-[#f5f8fc] p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <button @click="$router.back()" class="px-4 py-2 bg-gray-100 rounded-lg">返回课程详情</button>
        <h1 class="text-2xl font-bold text-gray-800">{{courseInfo.courseTitle}}</h1>
        <span class="text-sm text-gray-500">{{classroomInfo.title || '课堂'}}</span>
      </div>

      <div class="flex border-b border-gray-2xl mb-8">
        <div v-for="tab in tabs" :key="tab.key" @click="activeTab=tab.key"
             class="px-6 py-3 cursor-pointer border-b-2 transition-colors"
             :class="activeTab===tab.key?'border-[#3D9B6E] text-[#3D9B6E] font-medium':'border-transparent text-gray-500'">
          {{tab.label}}
        </div>
      </div>

      <!-- 1签到 -->
      <div v-if="activeTab==='sign'" class="bg-white rounded-2xl p-6 custom-shadow">
        <h2 class="text-lg font-bold mb-4">课堂签到</h2>
        <div v-if="classroomInfo.checkinStatus === 1">
          <p class="text-[#3D9B6E]">您已完成签到</p>
        </div>
        <div v-else-if="classroomInfo.status === 'in_progress'">
          <p class="text-green-600 mb-4">教师已发起签到，请尽快完成</p>
          <button @click="doSign" class="px-6 py-3 bg-[#3D9B6E] text-white rounded-xl">立即签到</button>
        </div>
        <div v-else-if="classroomInfo.status === 'not_started'">
          <p class="text-gray-500">课堂尚未开始，暂无法签到</p>
        </div>
        <div v-else-if="classroomInfo.status === 'ended'">
          <p class="text-gray-500">课堂已结束</p>
        </div>
        <div v-else>
          <p class="text-gray-500">暂无签到信息</p>
        </div>
      </div>

      <!-- 2投票 -->
      <div v-if="activeTab==='vote'" class="bg-white rounded-2xl p-6 custom-shadow">
        <h2 class="text-lg font-bold mb-4">课堂投票</h2>
        <div v-if="!voteData">
          <p class="text-gray-500">暂无教师发起投票</p>
        </div>
        <div v-else>
          <h3 class="font-bold mb-4">{{voteData.title}}</h3>
          <div class="space-3">
            <label v-for="opt in ['A','B','C','D']" :key="opt" class="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-[#3D9B6E]">
              <input v-model="selectOpt" :value="opt" type="radio" name="vote"/>
              <span>{{opt}}. {{voteData[opt]}}</span>
            </label>
          </div>
          <button @click="submitVote" class="mt-6 px-6 py-3 bg-[#3D9B6E] text-white rounded-xl">提交投票</button>
        </div>
      </div>

      <!-- 3聊天 -->
      <div v-if="activeTab==='chat'" class="bg-white rounded-2xl custom-shadow flex flex-col h-[500px]">
        <div class="flex-1 p-6 overflow-y-auto space-y-4 chat-container">
          <div v-for="msg in chatList" :key="msg.id" class="flex gap-3">
            <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm flex-shrink-0">
              {{ msg.user ? msg.user.charAt(0) : '?' }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium">{{msg.user}}</span>
                <span class="text-xs text-gray-400">{{msg.time}}</span>
              </div>
              <div class="mt-1 bg-gray-50 inline-block px-3 py-2 rounded-lg">{{msg.content}}</div>
            </div>
          </div>
          <div v-if="chatList.length === 0" class="text-center py-12 text-gray-400">
            <iconify-icon class="text-4xl mb-2" icon="solar:message-circle-linear"></iconify-icon>
            <p>暂无消息</p>
          </div>
        </div>
        <div class="p-4 border-t flex gap-3">
          <input v-model="chatText" class="flex-1 border rounded-lg px-4 py-2" placeholder="输入发言..."/>
          <button @click="sendChat" class="px-4 py-2 bg-[#3D9B6E] text-white rounded-lg">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import request from '@/utils/request'
const route = useRoute()
const cid = route.params.cid
const rid = route.params.rid

const courseInfo = ref({
  courseTitle: '',
  teacherName: ''
})

const classroomInfo = ref({
  title: '',
  checkinStatus: null,
  status: ''
})

const tabs = ref([
  {key:'sign',label:'签到'},
  {key:'vote',label:'课堂投票'},
  {key:'chat',label:'课堂聊天'}
])
const activeTab = ref('sign')

const fetchData = async () => {
  try {
    const courseRes = await request.get('/qingyun/course/detail', {
      params: { courseId: cid }
    })
    courseInfo.value = {
      courseTitle: courseRes.data.courseTitle || '',
      teacherName: courseRes.data.teacherName || ''
    }

    const classRes = await request.get('/qingyun/class/list', {
      params: { courseId: cid, page: 1, size: 10 }
    })

    const classData = classRes.data || classRes
    if(classData && Array.isArray(classData)){
      const classroom = classData.find(item => item.id === parseInt(rid))
      if(classroom){
        classroomInfo.value = {
          title: classroom.classTitle,
          checkinStatus: classroom.checkinStatus,
          status: classroom.status
        }
      }
    }
  } catch (error) {
    showToast(error.message || '获取数据失败', 'error')
  }
}

onMounted(() => {
  fetchData()
})

watch(activeTab, (newVal) => {
  if(newVal === 'chat'){
    fetchChatList()
    if(chatPolling) clearInterval(chatPolling)
    chatPolling = setInterval(fetchChatList, 3000)
  } else {
    if(chatPolling){
      clearInterval(chatPolling)
      chatPolling = null
    }
  }
})

// 签到
const doSign = async () => {
  if(classroomInfo.value.checkinStatus === 1){
    return showToast('您已签到过', 'error')
  }

  try {
    const res = await request.post('/qingyun/checkin/submit', {
      classId: parseInt(rid)
    })
    
    showToast(res.message || '签到成功')
    classroomInfo.value.checkinStatus = 1
    fetchData()
  } catch (error) {
    showToast(error.message || '签到失败', 'error')
  }
}

// 投票
const voteData = ref({
  title:'本次章节难度如何？',
  A:'简单',B:'适中',C:'偏难',D:'很难'
})
const selectOpt = ref('')
const submitVote = () => {
  if(!selectOpt.value) return showToast('请选择选项','error')
  showToast('投票提交成功')
}

// 聊天
const chatText = ref('')
const chatList = ref([])
let chatPolling = null

const fetchChatList = async () => {
  try {
    const res = await request.get('/qingyun/class/chat/list', {
      params: { classId: rid, pageNum: 1, pageSize: 50 }
    })
    
    if(res.data){
      chatList.value = res.data.map(item => ({
        id: item.id,
        user: item.userName,
        avatar: item.userAvatar,
        time: item.sentTime ? formatChatTime(item.sentTime) : '',
        content: item.content
      }))
      nextTick(() => {
        const chatContainer = document.querySelector('.chat-container')
        if(chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
      })
    }
  } catch (error) {
    console.error('获取消息列表失败', error)
  }
}

const sendChat = async () => {
  if(!chatText.value.trim()) return
  
  try {
    await request.post('/qingyun/class/chat/send', {
      classId: parseInt(rid),
      messageType: 1,
      content: chatText.value.trim()
    })
    
    chatText.value = ''
    fetchChatList()
  } catch (error) {
    showToast(error.message || '发送失败', 'error')
  }
}

const formatChatTime = (time) => {
  if(!time) return ''
  const date = new Date(time)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const showToast = (msg,type='success') => {
  const toast = document.createElement('div')
  toast.className='fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg z-[9999]'
  toast.innerText = msg
  document.body.appendChild(toast)
  setTimeout(()=>toast.remove(),2500)
}
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 2px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0.05);
}
</style>