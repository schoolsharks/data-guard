import mongoose from 'mongoose';

const qnaResponsesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  responses: {
    type: [{
      quesId: {
        type: Number,
        required: true,
      },
      response: {
        type: String,
        enum: ['YES', 'NO', ''],
      },
    }],
    default:[1,2,3,4].map((item)=>({id:item,response:null}))

  },

}, { timestamps: true });


const QnaResponses = mongoose.model('QnaResponses', qnaResponsesSchema);

export { QnaResponses };