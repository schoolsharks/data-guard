import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  company:{
    type:String,
    default:"_"
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  responses: [{
    quesId: {
      type: Number,
      required: true,
    },
    response: {
      type: String,
      enum: ['A', 'B', ''],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  sq: {
    type: String,
    required: true,
  },
  answered_count: {
    type: Number,
    required: true,
    default: 0,
  },
  turnover: {
    type: Number,
    required: true,
    default: 0,
  },
  businessGrowth:{
    type:Number,
    required:true,
    default:0
  },
  finePaid:{
    type:Number,
    required:true,
    default:0
  },
  longTermImpact:{
    type:Number,
    required:true,
    default:0
  },
  avgResponseTime: {
    type: Number,
    default: 0,
  },
  connected:{
    type:Boolean,
    default:false,
  },
  version: {
    type: Number,
    default: 0
  }
}, { timestamps: true, versionKey: false });

// Index definitions
userSchema.index({ session: 1 }); 
userSchema.index({ wealth: -1 }); 
userSchema.index({ investment: -1 }); 

const User = mongoose.model('User', userSchema);

export { User };