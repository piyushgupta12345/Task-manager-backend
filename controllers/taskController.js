import Task from '../models/taskModel.js'

export const createTaskController = async (req, res) => {
    try {
        // get data from frontend
        const { title, description, status, priority } = req.body

        // check all field required or not
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all fields',
            })
        }

        // create task
        const task = await Task.create({
            title,
            description,
            status,
            priority,
            user: req.user._id
        })

        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}

export const getSingleTaskController = async (req, res) => {
    try {
        // get taskId
        const taskId = req.params.taskId

        // get single task
        const task = await Task.findOne({ _id: taskId, user: req.user._id })
        if (!task) {
            return res.status(400).json({
                success: false,
                message: 'Single task not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Get Single task successfully',
            data: task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}

export const getAllTaskController = async (req, res) => {
    try {
        // get all tasks
        const tasks = await Task.find({ user: req.user._id })
        if (!tasks) {
            return res.status(400).json({
                success: true,
                message: 'Get all Tasks not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Get All tasksed successfully',
            data: tasks
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}

export const updateTaskController = async (req, res) => {
    try {
        // get data from frontend
        const { title, description, status, priority } = req.body
        const taskId = req.params.taskId

        // find and update task
        const task = await Task.findOneAndUpdate({_id:taskId, user:req.user._id}, {
            title,
            description,
            status,
            priority
        }, { new: true })

        if (!task) {
            return res.status(400).json({
                success: false,
                message: 'Task not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}

export const deleteTaskController = async (req, res) => {
    try {
        // get taskId
        const taskId = req.params.taskId

        // find and delete task
        const task = await Task.findOneAndDelete({_id:taskId, user:req.user._id})
        if (!task) {
            return res.status(400).json({
                success: true,
                message: 'Task not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        })
    }
}
