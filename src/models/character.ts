import mongoose, { Schema } from 'mongoose'

const characterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  gender: String,
  race: String,
  age: Number,
  blood_type: String,
  height: Number,
  weight: Number,
  hair_color: String,
  eye_color: String,
  power_level: {
    total: Number,
    magic: Number
  }
})

characterSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Character = mongoose.model('character', characterSchema)
