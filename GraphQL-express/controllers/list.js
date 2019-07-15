// controllers/list.js
import mongoose from 'mongoose'
const List = mongoose.model('List')
// 获取所有数据
export const getAllList = (req, res, next) => {
    List.find({}).sort({
        date: -1
    }) // 数据查询
    .then(Lists => {
        if (Lists.length) {
            res.send({
                success: true,
                list: Lists
            })
        } else {
            res.send({
                success: false
            })
        }
    })
}
// 新增
export const addOne = (req, res, next) => {
    // 获取请求的数据
    const opts = req.body

    const list = new List(opts)
    list.save() // 保存数据
    .then(saveList => {
        console.log(saveList)
        if (saveList) {
            res.send({
                success: true,
                id: opts.id
            })
        } else {
            res.send({
                success: false,
                id: opts.id
            })
        }
    })
}
// 编辑
export const editOne = (req, res, next) => {
    const obj = req.body
    let hasError = false
    let error = null
    List.findOne({
        id: obj.id
    }, (err, doc) => {
        if (err) {
            hasError = true
            error = err
        } else {
            doc.title = obj.title;
            doc.desc = obj.desc;
            doc.date = obj.date;
            doc.save();
        }
    })
    if (hasError) {
        res.send({
            success: false,
            id: obj.id
        })
    } else {
        res.json({
            success: true,
            id: obj.id
        })
    }
}

// 更新完成状态
export const tickOne = (req, res, next) => {
    const obj = req.body
    let hasError = false
    let error = null
    List.findOne({
        id: obj.id
    }, (err, doc) => {
        if (err) {
            hasError = true
            error = err
        } else {
            doc.checked = obj.checked;
            doc.save();
        }
    })
    if (hasError) {
        res.send({
            success: false,
            id: obj.id
        })
    } else {
        res.send({
            success: true,
            id: obj.id
        })
    }
}

// 删除
export const delOne = (req, res, next) => {
    const obj = req.body
    let hasError = false
    let msg = null
    List.remove({
        id: obj.id
    }, (err, doc) => {
        if (err) {
            hasError = true
            msg = err
        } else {
            msg = doc
        }
    })
    if (hasError) {
        res.send({
            success: false,
            id: obj.id
        })
    } else {
        res.send({
            success: true,
            id: obj.id
        })
    }
}