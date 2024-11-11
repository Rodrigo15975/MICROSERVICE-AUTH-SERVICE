import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
  collection: 'user',
  timestamps: true,
})
export class User extends Document {
  @Prop()
  avatar?: string

  @Prop()
  dni: string

  @Prop({
    index: true,
    unique: true,
    type: Number,
  })
  id: number

  @Prop()
  lastname: string

  @Prop()
  name: string

  @Prop()
  password: string

  @Prop({
    index: true,
    unique: true,
    type: String,
  })
  phone: string

  @Prop()
  user_active: boolean

  @Prop()
  roleId: number

  @Prop({ type: Object })
  role: {
    id: number
    role: string
  }
}

export const SchemaUser = SchemaFactory.createForClass(User)
