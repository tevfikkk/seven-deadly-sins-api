import { NextFunction, Request, Response, Router } from 'express'

import { Character } from '../models/character'
import type { charType } from '../types/char'

export const charRouter: Router = Router()

//! Create and save a new character
//! POST /api/characters
//! Public route
charRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      gender,
      race,
      age,
      blood_type,
      height,
      weight,
      hair_color,
      eye_color,
      power_level: { total, magic }
    }: charType = req.body

    const character = new Character({
      name,
      gender,
      race,
      age,
      blood_type,
      height,
      weight,
      hair_color,
      eye_color,
      power_level: {
        total,
        magic
      }
    })

    await character
      .save()
      .then((char: charType) => {
        res.status(201).json(char)
      })
      .catch((error: Error) => {
        next(error)
      })
  }
)

//! Find one character by id
//! GET /api/characters/:id
//! Public route
charRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    await Character.findById(req.params.id)
      .then((char: charType) => {
        char
          ? res.status(200).json(char)
          : res.status(404).json({ message: 'Character not found' })
      })
      .catch((error: Error) => next(error))
  }
)

//! Find all characters
//! GET /api/characters
//! Public route
charRouter.get('/', async (req: Request, res: Response) => {
  await Character.find().then((chars: charType[]) => {
    res.status(200).json(chars)
  })
})

//! Update a character by id
//! PUT /api/characters/:id
//! Public route
charRouter.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      gender,
      race,
      age,
      blood_type,
      height,
      weight,
      hair_color,
      eye_color,
      power_level: { total, magic }
    }: charType = req.body

    const char = {
      name,
      gender,
      race,
      age,
      blood_type,
      height,
      weight,
      hair_color,
      eye_color,
      power_level: {
        total,
        magic
      }
    }

    await Character.findByIdAndUpdate(req.params.id, char, { new: true })
      .then((updatedChar: charType) => {
        res.status(200).json(updatedChar)
      })
      .catch((error: Error) => next(error))
  }
)

//! Delete a character by id
//! DELETE /api/characters/:id
//! Public route
charRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    await Character.findByIdAndDelete(req.params.id)
      .then((char: charType) => {
        char
          ? res.status(200).json({ message: 'Character deleted' })
          : res.status(404).json({ message: 'Character not found' })
      })
      .catch((error: Error) => next(error))
  }
)
