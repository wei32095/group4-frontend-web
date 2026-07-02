<template>
  <div class="min-h-screen bg-[#f5f8fc] p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <button @click="$router.back()" class="px-4 py-2 bg-gray-100 rounded-lg">返回课程列表</button>
        <h1 class="text-2xl font-bold text-gray-800">{{courseInfo.courseTitle}}</h1>
        <span class="text-sm text-gray-500">授课老师：{{courseInfo.teacherName}}</span>
        <span :class="{
          'bg-green-100 text-green-600': courseInfo.status === 'active',
          'bg-gray-100 text-gray-500': courseInfo.status === 'not_started',
          'bg-red-100 text-red-600': courseInfo.status === 'completed'
        }" class="px-3 py-1 rounded-full text-xs">
          {{ courseInfo.status === 'active' ? '进行中' : (courseInfo.status === 'completed' ? '已结束' : '待开始') }}
        </span>
      </div>
      <!-- 顶部标签切换 -->
      <div class="flex border-b border-gray-2xl mb-8">
        <div v-for="tab in tabs" :key="tab.key" @click="activeTab=tab.key"
             class="px-6 py-3 cursor-pointer border-b-2 transition-colors"
             :class="activeTab===tab.key?'border-[#3D9B6E] text-[#3D9B6E] font-medium':'border-transparent text-gray-500'">
          {{tab.label}}
        </div>
      </div>

      <!-- 1课堂详情 -->
      <div v-if="activeTab==='info'" class="bg-white rounded-2xl p-6 custom-shadow">
        <h2 class="text-lg font-bold mb-4">课堂详情</h2>
        <p class="text-gray-600">{{courseInfo.description}}</p>
        <div class="grid grid-cols-3 gap-6 mt-6">
          <div class="bg-gray-50 p-4 rounded-xl">
            <div class="text-sm text-gray-400">课程码</div>
            <div class="text-xl font-bold font-mono">{{courseInfo.courseCode}}</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl">
            <div class="text-sm text-gray-400">学生人数</div>
            <div class="text-xl font-bold">{{courseInfo.studentCount}}人</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl">
            <div class="text-sm text-gray-400">创建时间</div>
            <div class="text-xl font-bold text-[#3D9B6E]">{{courseInfo.createdAt}}</div>
          </div>
        </div>
        <div v-if="courseInfo.cover" class="mt-6">
          <div class="text-sm text-gray-400 mb-2">课程封面</div>
          <img :src="courseInfo.cover" :alt="courseInfo.courseTitle" class="w-full max-w-md rounded-xl">
        </div>
      </div>

      <!-- 2课堂列表 -->
      <div v-if="activeTab==='classes'" class="bg-white rounded-2xl p-6 custom-shadow">
        <h2 class="text-lg font-bold mb-6">课堂列表</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="item in classList" :key="item.id" @click="$router.push(`/course/${cid}/classroom/${item.id}`)" 
               class="border rounded-xl p-4 hover:border-[#3D9B6E] transition-colors cursor-pointer">
            <div class="flex items-center justify-between">
              <h3 class="font-bold">{{item.title}}</h3>
              <div class="flex items-center gap-2">
                <span v-if="item.checkinStatus === 1" class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">已签到</span>
                <span :class="item.status === '进行中' ? 'text-green-600' : (item.status === 'not_started' ? 'text-gray-400' : 'text-gray-400')" 
                      class="text-xs bg-gray-100 px-2 py-1 rounded">{{item.status}}</span>
              </div>
            </div>
            <p class="text-sm text-gray-400 mt-2">{{item.date}} · {{item.time}}</p>
            <div class="flex items-center gap-2 mt-4 text-sm text-[#3D9B6E]">
              <span>进入课堂</span>
              <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
            </div>
          </div>
          <div v-if="classList.length === 0" class="col-span-2 text-center py-12 text-gray-400">
            <iconify-icon class="text-4xl mb-4" icon="solar:calendar-linear"></iconify-icon>
            <p>暂无课堂安排</p>
          </div>
        </div>
      </div>

      <!-- 3课程资源 -->
      <div v-if="activeTab==='resource'" class="bg-white rounded-2xl p-6 custom-shadow">
        <h2 class="text-lg font-bold mb-6">课程资源</h2>
        <div class="space-y-4">
          <div v-for="item in resourceList" :key="item.resourceId" class="border rounded-xl p-4 hover:border-[#3D9B6E] transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#f0f9f4] rounded-xl flex items-center justify-center text-[#3D9B6E]">
                  <iconify-icon :icon="getFileIcon(item.fileType)" class="text-xl"></iconify-icon>
                </div>
                <div>
                  <h3 class="font-bold">{{ item.fileName }}</h3>
                  <p class="text-sm text-gray-400">{{ item.description }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-xs text-gray-400">上传者：{{ item.teacherName }}</span>
                <span class="text-xs text-gray-400">{{ formatFileSize(item.fileSize) }}</span>
                <span class="text-xs text-gray-400">下载 {{ item.downloadCount }}次</span>
                <button @click="downloadResource(item.resourceId)" class="px-4 py-2 bg-[#3D9B6E] text-white rounded-lg text-sm hover:bg-[#2d7a55] transition-colors">
                  <iconify-icon icon="solar:download-linear" class="inline-block mr-1"></iconify-icon>下载
                </button>
              </div>
            </div>
          </div>
          <div v-if="resourceList.length === 0" class="text-center py-12 text-gray-400">
            <iconify-icon class="text-4xl mb-4" icon="solar:folder-linear"></iconify-icon>
            <p>暂无课程资源</p>
          </div>
        </div>
      </div>

      <!-- 4互动问答 -->
      <div v-if="activeTab==='problem'" class="space-y-6">
        <div class="bg-white rounded-2xl p-6 custom-shadow">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold">互动问答</h2>
            <button @click="showPostProblem = true" class="px-4 py-2 bg-[#3D9B6E] text-white rounded-lg">发布问题</button>
          </div>
          <div class="space-y-4">
            <div v-for="item in problemList" :key="item.problemId" @click="openProblemDetail(item)" class="border rounded-xl p-4 hover:border-[#3D9B6E] transition-colors cursor-pointer">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                    {{ item.userName ? item.userName.charAt(0) : '?' }}
                  </div>
                  <div>
                    <h3 class="font-bold">{{ item.title }}</h3>
                    <p class="text-sm text-gray-400">{{ item.userName }} · {{ formatTime(item.createdAt) }}</p>
                  </div>
                </div>
                <span class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">回复 {{ item.replyCount }}</span>
              </div>
              <p class="mt-3 text-gray-600">{{ item.content }}</p>
            </div>
            <div v-if="problemList.length === 0" class="text-center py-12 text-gray-400">
              <iconify-icon class="text-4xl mb-4" icon="solar:help-circle-linear"></iconify-icon>
              <p>暂无问题，快来发布第一个问题吧</p>
            </div>
          </div>
        </div>

        <!-- 发布问题弹窗 -->
        <div v-if="showPostProblem" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" @click="showPostProblem = false">
          <div class="bg-white rounded-2xl p-6 w-full max-w-lg mx-4" @click.stop>
            <h3 class="text-lg font-bold mb-4">发布问题</h3>
            <input v-model="problemTitle" class="w-full border rounded-xl p-3 mb-4" placeholder="问题标题"/>
            <textarea v-model="problemContent" rows="5" class="w-full border rounded-xl p-3 mb-4" placeholder="问题描述"></textarea>
            <div class="flex justify-end gap-3">
              <button @click="showPostProblem = false" class="px-4 py-2 border rounded-lg">取消</button>
              <button @click="postProblem" class="px-4 py-2 bg-[#3D9B6E] text-white rounded-lg">发布</button>
            </div>
          </div>
        </div>

        <!-- 问题详情弹窗 -->
        <div v-if="showProblemDetail" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" @click="showProblemDetail = false">
          <div class="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col" @click.stop>
            <div class="p-6 border-b flex justify-between items-center">
              <h3 class="text-lg font-bold">问题详情</h3>
              <button @click="showProblemDetail = false" class="text-gray-400 hover:text-gray-600">
                <iconify-icon icon="solar:close-line-duotone"></iconify-icon>
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  {{ problemDetail?.userName ? problemDetail.userName.charAt(0) : '?' }}
                </div>
                <div>
                  <h4 class="font-bold">{{ problemDetail?.title }}</h4>
                  <p class="text-sm text-gray-400">{{ problemDetail?.userName }} · {{ formatTime(problemDetail?.createdAt) }}</p>
                </div>
              </div>
              <p class="text-gray-600 mb-6">{{ problemDetail?.content }}</p>
              <div class="border-t pt-4">
                <h5 class="font-bold mb-4">全部回复 ({{ problemDetail?.replies?.length || 0 }})</h5>
                <div class="space-y-4">
                  <div v-for="reply in problemDetail?.replies" :key="reply.replyId" class="bg-gray-50 rounded-xl p-4">
                    <div class="flex items-center gap-3 mb-2">
                      <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                        {{ reply.userName ? reply.userName.charAt(0) : '?' }}
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-sm">{{ reply.userName }}</span>
                        <span v-if="reply.isTeacher" class="text-xs bg-[#3D9B6E] text-white px-2 py-0.5 rounded">教师</span>
                      </div>
                      <span class="ml-auto text-xs text-gray-400">{{ formatTime(reply.createdAt) }}</span>
                    </div>
                    <p class="text-gray-600 pl-11">{{ reply.content }}</p>
                  </div>
                  <div v-if="(!problemDetail?.replies || problemDetail.replies.length === 0)" class="text-center py-8 text-gray-400">
                    <iconify-icon class="text-3xl mb-2" icon="solar:message-circle-linear"></iconify-icon>
                    <p>暂无回复，快来抢沙发吧</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4 border-t">
              <div class="flex gap-3">
                <textarea v-model="replyContent" rows="2" class="flex-1 border rounded-xl p-3" placeholder="写下你的回答..."></textarea>
                <button @click="submitReply" class="px-6 py-3 bg-[#3D9B6E] text-white rounded-xl">提交</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6课程评价 -->
      <div v-if="activeTab==='eval'" class="bg-white rounded-2xl p-6 custom-shadow">
        <h2 class="text-lg font-bold mb-4">课程评价</h2>
        <textarea v-model="evalText" rows="5" class="w-full border rounded-xl p-4" placeholder="写下你对本课程的评价..."></textarea>
        <button @click="submitEval" class="mt-4 px-6 py-3 bg-[#3D9B6E] text-white rounded-xl">提交评价</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '@/utils/request'

const route = useRoute()
const router = useRouter()
const cid = route.params.cid

const courseInfo = ref({
  courseId: null,
  courseTitle: '',
  description: '',
  cover: '',
  studentCount: 0,
  courseCode: '',
  status: '',
  teacherName: '',
  teacherAvatar: '',
  createdAt: ''
})

const tabs = ref([
  {key:'info',label:'课程详情'},
  {key:'classes',label:'课堂列表'},
  {key:'resource',label:'课程资源'},
  {key:'problem',label:'互动问答'},
  {key:'eval',label:'课程评价'}
])
const activeTab = ref('info')

const classList = ref([])
const totalClasses = ref(0)
const currentPage = ref(1)

const resourceList = ref([])
const resourcePageNum = ref(1)
const resourcePageSize = ref(10)
const totalResources = ref(0)

const evalText = ref('')

const problemList = ref([])
const showPostProblem = ref(false)
const showProblemDetail = ref(false)
const problemTitle = ref('')
const problemContent = ref('')
const replyContent = ref('')
const problemDetail = ref(null)

const showToast = (msg, type = 'success') => {
  const toast = document.createElement('div')
  toast.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg z-[9999]'
  toast.innerText = msg
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 2500)
}

const formatTime = (time) => {
  if (!time) return ''
  const date = new Date(time)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${month}-${day} ${hours}:${minutes}`
}

const fetchCourseDetail = async () => {
  try {
    console.log('开始获取课程详情, courseId:', cid)
    const res = await request.get('/qingyun/course/detail', {
      params: { courseId: cid }
    })
    console.log('课程详情返回数据:', res)
    
    const data = res.data || res
    if (data) {
      courseInfo.value = {
        courseId: data.id || data.courseId || '',
        courseTitle: data.courseTitle || '未知课程',
        description: data.description || '',
        cover: data.cover || '',
        studentCount: data.studentCount || 0,
        courseCode: data.courseCode || '',
        status: data.status || '',
        teacherName: data.teacherName || '',
        teacherAvatar: data.teacherAvatar || '',
        createdAt: data.createdAt || ''
      }
    }
  } catch (error) {
    console.error('获取课程详情失败:', error)
    showToast(error.message || '获取课程详情失败', 'error')
  }
}

const fetchClassList = async () => {
  try {
    const res = await request.get('/qingyun/class/list', {
      params: { courseId: parseInt(cid), page: currentPage.value, size: 10 }
    })
    
    const data = res.data || res
    const list = data.list || (Array.isArray(data) ? data : [])
    const total = data.total || list.length
    
    classList.value = list.map(item => ({
      id: item.id,
      title: item.classTitle,
      status: item.status === 'active' ? '进行中' : (item.status === 'ended' ? '已结束' : '未开始'),
      date: item.createTime ? item.createTime.split(' ')[0] : '',
      time: item.createTime && item.endTime ? `${item.createTime.split(' ')[1]?.slice(0,5)} - ${item.endTime.split(' ')[1]?.slice(0,5)}` : '',
      checkinStatus: item.checkinStatus
    }))
    totalClasses.value = total
  } catch (error) {
    showToast(error.message || '获取课堂列表失败', 'error')
  }
}

const fetchResourceList = async () => {
  try {
    const res = await request.get('/qingyun/course/resource/list', {
      params: { courseId: parseInt(cid), page: resourcePageNum.value, size: resourcePageSize.value }
    })
    
    const data = res.data || res
    const list = data.list || (Array.isArray(data) ? data : [])
    const total = data.total || list.length
    
    resourceList.value = list.map(item => ({
      resourceId: item.resourceId,
      fileName: item.fileName,
      fileUrl: item.fileUrl,
      fileSize: item.fileSize,
      fileType: item.fileType,
      description: item.description,
      downloadCount: item.downloadCount,
      teacherName: item.teacherName,
      createdAt: item.createdAt
    }))
    totalResources.value = total
  } catch (error) {
    showToast(error.message || '获取课程资源失败', 'error')
  }
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileIcon = (type) => {
  const icons = {
    'pdf': 'solar:file-text-linear',
    'doc': 'solar:file-text-linear',
    'docx': 'solar:file-text-linear',
    'ppt': 'solar:presentation-linear',
    'pptx': 'solar:presentation-linear',
    'xls': 'solar:table-linear',
    'xlsx': 'solar:table-linear',
    'zip': 'solar:archive-linear',
    'rar': 'solar:archive-linear',
    'jpg': 'solar:image-linear',
    'jpeg': 'solar:image-linear',
    'png': 'solar:image-linear',
    'mp4': 'solar:play-circle-linear',
    'mp3': 'solar:music-linear'
  }
  if (!type) return 'solar:file-linear'
  return icons[type.toLowerCase()] || 'solar:file-linear'
}

const downloadResource = async (resourceId) => {
  try {
    const res = await request.get(`/qingyun/course/resource/download/${resourceId}`, {
      responseType: 'blob'
    })
    
    const blob = res.data || res
    if (blob instanceof Blob) {
      const resource = resourceList.value.find(r => r.resourceId === resourceId)
      const fileName = resource?.fileName || `resource_${resourceId}`
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      showToast('下载成功')
      await fetchResourceList()
    }
  } catch (error) {
    showToast(error.message || '下载失败', 'error')
  }
}

const fetchProblemList = async () => {
  try {
    const res = await request.get('/qingyun/course/problem/list', {
      params: { courseId: parseInt(cid), page: 1, size: 10 }
    })
    
    const data = res.data || res
    const list = data.list || (Array.isArray(data) ? data : [])
    problemList.value = list
  } catch (error) {
    showToast(error.message || '获取问题列表失败', 'error')
  }
}

const submitEval = () => {
  if (!evalText.value) return showToast('请输入评价内容', 'error')
  showToast('评价提交完成')
}

const postProblem = async () => {
  if (!problemTitle.value.trim()) return showToast('请输入问题标题', 'error')
  if (!problemContent.value.trim()) return showToast('请输入问题描述', 'error')
  
  try {
    await request.post('/qingyun/course/problem/create', {
      courseId: cid,
      title: problemTitle.value,
      content: problemContent.value
    })
    
    showToast('问题发布成功')
    showPostProblem.value = false
    problemTitle.value = ''
    problemContent.value = ''
    fetchProblemList()
  } catch (error) {
    showToast(error.message || '发布失败', 'error')
  }
}

const openProblemDetail = async (problem) => {
  try {
    const res = await request.get(`/qingyun/course/problem/${problem.problemId}`)
    
    if (res.data) {
      problemDetail.value = res.data
      showProblemDetail.value = true
    }
  } catch (error) {
    showToast(error.message || '获取问题详情失败', 'error')
  }
}

const submitReply = async () => {
  if (!replyContent.value.trim()) return showToast('请输入回答内容', 'error')
  if (!problemDetail.value) return
  
  try {
    await request.post('/qingyun/course/problem/reply', {
      problemId: problemDetail.value.problemId,
      content: replyContent.value
    })
    
    showToast('回答提交成功')
    replyContent.value = ''
    await openProblemDetail(problemDetail.value)
    fetchProblemList()
  } catch (error) {
    showToast(error.message || '回答失败', 'error')
  }
}

watch(activeTab, (newVal) => {
  if (newVal === 'problem') {
    fetchProblemList()
  } else if (newVal === 'classes') {
    fetchClassList()
  } else if (newVal === 'resource') {
    fetchResourceList()
  }
})

onMounted(() => {
  fetchCourseDetail()
})
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 2px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0.05);
}
</style>