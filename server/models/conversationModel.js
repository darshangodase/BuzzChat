const mongose= require('mongoose');

const messageSchema = new mongose.Schema({
    text: {
        type: string,
        default:""
    },
    imageURL: {
        type: String,
        default:""
    },
    vedioURL: {
        type: String,
        default:""
    },
    seen:
    {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

const conversationSchema=new mongose.Schema({
     sender: {
        type: mongose.schema.ObjectsId,
        required: true,
        ref: 'User'

     },
     receiver: {
        type: mongose.schema.ObjectsId,
        required: true,
        ref: 'User'
     },
     messages:[
        {
        type: mongose.schema.ObjectsId,
        ref: 'Message'
        }
     ]
     
},{
    timestamps: true
});
const MessageModel = new mongose.model('Message', messageSchema);
const ConversationModel = new mongose.model('Conversation', conversationSchema);

module.exports = {
    MessageModel,
    ConversationModel
};