import express from 'express'
import { createTaskController, getSingleTaskController, getAllTaskController, updateTaskController, deleteTaskController } from '../controllers/taskController.js'
import { isAuthenticate } from '../middleware/isAuthenticate.js'

const router = express()

// define routes
router.post('/createTask', isAuthenticate, createTaskController)
router.get('/getSingleTask/:taskId', isAuthenticate, getSingleTaskController)
router.get('/getAllTask', isAuthenticate, getAllTaskController)
router.put('/updateTask/:taskId', isAuthenticate, updateTaskController)
router.delete('/deleteTask/:taskId', isAuthenticate, deleteTaskController)


export default router