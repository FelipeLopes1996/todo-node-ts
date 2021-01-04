import {Request, Response, NextFunction} from 'express'
import Model from './model'


const indexTwo = async (req : Request, res : Response, next : NextFunction) => {
 try {
     const users = await Model.indexTwo()
    if (!users) {
    res.status(401).json({message: "users it's not provider!"})
    }
     res.status(200).json(users)
    } catch (error) {
     res.status(401).json({ message: 'bateu no error!' })
 }
} 

const showTwo = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { id } = req.params
        const user = await Model.findTwo({ id })
        if(!user) {
        res.status(401).json({message: "user it's not provider!"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({ message: 'bateu no error!' })
    }
}

const storeTwo = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user = await Model.createTwo(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({ message: 'bateu no error!' })
    }
}

const updateTwo = async  (req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params
        const user = await Model.update(Number(id), req.body)
        if (!user) {
           return res.status(401).json({message: "update somethin is wrong!"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({message: error})
    }
   
    // try {
    //     const { id } = req.params
    //     const user = await Model.updateTwo(Number(id), req.body)
    //     if(!user) {
    //         return res.status(401).json({message: "update somethin is wrong!"})
    //     }
    //     res.status(200).json(user)
    // } catch (error) {
    //     res.status(401).json({ message: 'bateu no error!' })
    // }
}



const destroyTwo = async  (req : Request, res : Response, next : NextFunction) => {
    try {
        const { id } = req.params
        await Model.destroyTwo(Number(id))
        res.status(200).json()
    } catch (error) {
        res.status(401).json({ message: 'bateu no error!' })
    }
}



// -----------------------------------------CÓDIGO REFATORADO------------------------------

const index = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const users = await Model.index()
        if (!users) {
            res.status(401).json({message: "users it's not provider!"})
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(401).json({message: error})
    }
}

const show = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params
        const user = await Model.find({id})
        if (!user) {
            res.status(401).json({message: "user it's not provider!"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({message: error})
    }
}

const store = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user = await Model.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({message: error})
    }
}

const update = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params
        const user = await Model.update(Number(id), req.body)
        // if (!user) {
        //    return res.status(401).json({message: "update somethin is wrong!"})
        // }
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({message: error})
    }
}

const destroy = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params
        await Model.destroy(Number(id))
        res.status(200).send()
    } catch (error) {
        res.status(401).json({message: error})
    }
}


export {
    index,
    show,
    store,
    update,
    destroy,

    indexTwo,
    showTwo,
    storeTwo,
    updateTwo,
    destroyTwo
}
