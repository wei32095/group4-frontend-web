<template>
<div class="min-h-screen bg-[#f5f8fc] p-8">
  <div class="max-w-4xl mx-auto">
    <button @click="$router.back()" class="px-4 py-2 bg-gray-100 rounded-lg mb-6">返回作业列表</button>
    <div class="bg-white rounded-2xl p-8 custom-shadow">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h1 class="text-xl font-bold mb-2">{{assignmentDetail.title}}</h1>
          <span class="text-xs bg-blue-50 text-[#4A90D9] px-2 rounded">{{assignmentDetail.courseName}}</span>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-400 mb-1">满分：{{assignmentDetail.maxScore}}分</p>
          <p v-if="assignmentDetail.status === 'SUBMITTED' && assignmentDetail.myScore !== null" class="text-sm text-[#3D9B6E]">我的得分：{{assignmentDetail.myScore}}分</p>
        </div>
      </div>
      <p class="text-sm text-red-500 mb-6">截止时间：{{formatDeadline(assignmentDetail.deadline)}}</p>

      <div class="space-y-6">
        <div 
          v-for="(question, idx) in questions" 
          :key="question.id"
          class="p-4 bg-gray-50 rounded-xl"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="font-medium">{{question.sortOrder}}. {{question.stem}}</span>
            <span class="text-xs text-gray-400">{{getQuestionType(question.type)}} - {{question.perscore}}分</span>
          </div>
          
          <div v-if="question.type === 1" class="space-y-2">
            <label 
              v-for="(opt, optIdx) in question.options" 
              :key="optIdx"
              class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer"
              :class="getOptionClass(question, optIdx)"
            >
              <input 
                v-if="assignmentDetail.status !== 'SUBMITTED'"
                v-model="question.userAnswer" 
                :value="opt.split('、')[0] || opt.split('.')[0]" 
                type="radio" 
                name="q{{question.id}}"
              />
              <span>{{opt}}</span>
            </label>
            <div v-if="assignmentDetail.status === 'SUBMITTED'" class="mt-3">
              <p v-if="question.isCorrect !== null" class="text-xs" :class="question.isCorrect ? 'text-[#3D9B6E]' : 'text-red-500'">
                {{question.isCorrect ? '✓ 回答正确' : '✗ 回答错误'}}
              </p>
              <p v-if="question.myAnswer" class="text-xs text-gray-500">我的答案：{{question.myAnswer}}</p>
              <p v-if="question.explanation" class="text-xs text-gray-400 mt-1">解析：{{question.explanation}}</p>
            </div>
          </div>

          <div v-else class="mt-2">
            <textarea 
              v-model="question.userAnswer" 
              rows="4" 
              class="w-full border rounded-lg p-3" 
              placeholder="请输入你的答案"
              :disabled="assignmentDetail.status === 'SUBMITTED'"
            ></textarea>
            <div v-if="assignmentDetail.status === 'SUBMITTED'" class="mt-3">
              <p v-if="question.myAnswer" class="text-xs text-gray-500">我的答案：{{question.myAnswer}}</p>
              <p v-if="question.score !== null" class="text-xs" :class="question.score > 0 ? 'text-[#3D9B6E]' : 'text-red-500'">
                得分：{{question.score}}/{{question.perscore}}
              </p>
              <p v-if="question.teacherComment" class="text-xs text-blue-500 mt-1">教师评语：{{question.teacherComment}}</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        @click="submitWork" 
        class="w-full mt-8 py-3 bg-[#3D9B6E] text-white rounded-xl font-bold" 
        :disabled="assignmentDetail.status === 'SUBMITTED'"
      >
        {{assignmentDetail.status === 'SUBMITTED' ? '已提交' : '提交作业'}}
      </button>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '../utils/request'

const route = useRoute()
const router = useRouter()
const assignmentId = route.params.wid

const assignmentDetail = ref({
  id: '',
  courseId: '',
  courseName: '',
  title: '',
  deadline: '',
  maxScore: 0,
  status: '',
  myScore: null
})

const questions = ref([])

const getQuestionType = (type) => {
  const types = {
    1: '选择题',
    5: '简答题'
  }
  return types[type] || '其他'
}

const getOptionClass = (question, optIdx) => {
  if(assignmentDetail.value.status !== 'SUBMITTED'){
    return question.userAnswer === (question.options[optIdx].split('、')[0] || question.options[optIdx].split('.')[0]) 
      ? 'border-[#3D9B6E] bg-green-50' 
      : 'border-gray-200 hover:border-gray-300'
  }
  const correctAnswer = question.myAnswer
  const currentOption = question.options[optIdx].split('、')[0] || question.options[optIdx].split('.')[0]
  if(question.isCorrect && currentOption === correctAnswer){
    return 'border-[#3D9B6E] bg-green-50'
  }
  if(!question.isCorrect && currentOption === correctAnswer){
    return 'border-[#3D9B6E] bg-green-50'
  }
  if(currentOption === question.myAnswer){
    return 'border-red-400 bg-red-50'
  }
  return 'border-gray-200 opacity-50'
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

const fetchAssignmentDetail = async () => {
  try {
    const res = await request.get('/qingyun/assignment/detail', {
      params: {
        assignmentId: assignmentId
      }
    })
    
    if(res.data){
      assignmentDetail.value = {
        id: res.data.assignmentId,
        courseId: res.data.courseId,
        courseName: res.data.courseName || '',
        title: res.data.assignmentTitle || '',
        deadline: res.data.deadline || '',
        maxScore: res.data.maxScore || 0,
        status: res.data.status || '',
        myScore: res.data.myScore
      }
      
      questions.value = res.data.questions?.map(q => ({
        id: q.questionId,
        type: q.type,
        stem: q.stem || '',
        options: q.options || [],
        perscore: q.perscore || 0,
        sortOrder: q.sortOrder || 0,
        myAnswer: q.myAnswer || '',
        userAnswer: q.myAnswer || '',
        isCorrect: q.isCorrect,
        score: q.score,
        explanation: q.explanation || '',
        teacherComment: q.teacherComment || ''
      })) || []
    }
  } catch (error) {
    console.error('获取作业详情失败', error)
    showToast('获取作业详情失败', 'error')
  }
}

const submitWork = async () => {
  const answers = questions.value.map(q => ({
    questionId: q.id,
    answer: q.userAnswer
  }))
  
  try {
    const res = await request.post('/qingyun/assignment/submit', {
      assignmentId: assignmentDetail.value.id,
      answers: answers
    })
    
    showToast(res.message || '作业提交成功')
    setTimeout(() => router.back(), 1200)
  } catch (error) {
    showToast(error.message || '提交失败', 'error')
  }
}

const showToast = (msg, type='success') => {
  const toast = document.createElement('div')
  toast.className = `fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg z-[9999] ${type === 'error' ? 'bg-red-500' : 'bg-gray-800'} text-white`
  toast.innerText = msg
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 2500)
}

onMounted(() => {
  fetchAssignmentDetail()
})
</script>
<style scoped>
.custom-shadow {
  box-shadow: 0 2px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0.05);
}
</style>