import express from 'express'
import storeCtrl from '../controllers/storeControllers.js'

const router = express.Router()

router.route('/').post(storeCtrl.createStore).get(storeCtrl.list)

export default router
