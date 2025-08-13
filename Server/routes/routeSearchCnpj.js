import express from 'express'
import { SearchCnpj } from '../controller/searchCnpj.js'

export const router = express.Router()

router.get('/search_cnpj', SearchCnpj)