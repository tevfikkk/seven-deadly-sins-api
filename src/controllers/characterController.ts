import { NextFunction, Request, Response, Router } from 'express'

import { Character } from '../models/character'

const charRouter: Router = Router()

//! Create and save a new character
//! POST /api/characters
//! Public route
charRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
      
  }
)
