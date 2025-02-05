import { User } from '../models/user.model.js';
import { INITIAL_AMOUNT, questions } from '../utils/data/questions.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Admin } from '../models/admin.model.js';
import signToken from '../utils/signJwt.js';
import { Session } from '../models/session.model.js';
import { getPersonalityInfo } from '../utils/data/getPersonalityInfo.js';

dotenv.config();



export const handleCreateUser = async (req, res) => {
  const { name, email, phone,company } = req.body;

  try {
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    if (!admin.active) {
      return res.status(403).json({ message: 'No Active Session' });
    }




    const shuffledQuestionIds = questions.map(q => q.id);
    const sq = jwt.sign({ sequence: shuffledQuestionIds }, process.env.JWT_SECRET, { expiresIn: '1d' });

    
    const newUser = new User({
      name,
      email,
      company,
      session: admin.current_session,
      responses: [],
      answered_count: 0,
      turnover:INITIAL_AMOUNT,
      sq: sq,
      phone: phone || null,
    });

    const token = signToken(newUser._id.toString(), "USER")

    await newUser.save();

    const updatedSession = await Session.findByIdAndUpdate(
      newUser.session,
      { $inc: { totalPlayers: 1 } },
      { new: true }
    )


    return res.status(201).json({ user: newUser._id, session: newUser.session, sq, token, totalPlayers: updatedSession.totalPlayers });

  } catch (error) {
    console.log('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const handleGetUser = async (req, res) => {
  const userId = req.query.user;

  try {
    const [userData, admin, session] = await Promise.all([
      User.findById(userId),
      Admin.findOne(),
      User.findById(userId).then(user => user?.session ? Session.findById(user.session).select("totalPlayers finePaid") : null)
    ]);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (!userData.session || userData.session.toString() !== admin.current_session?.toString()) {
      return res.status(403).json({ success: false, message: `Session mismatch: ${userData.session} vs ${admin.current_session}` });
    }
   
    const isCompleted=userData.responses?.length===questions.length

    if(isCompleted){
      
    }
    res.status(200).json({
      success: true,
      user: userData._id,
      name: userData.name,
      email: userData.email,
      company:userData.company,
      session: userData.session,
      sq: userData.sq,
      turnover:isCompleted ? userData.turnover + userData.longTermImpact : userData.turnover,
      businessGrowth:isCompleted?userData.businessGrowth:undefined,
      finePaid:isCompleted?userData.finePaid:undefined,
      finePaidByGroup:isCompleted?(session.finePaid/session.totalPlayers):undefined,
      personalityInfo:isCompleted?getPersonalityInfo(userData.businessGrowth,userData.finePaid):undefined,
      answered: userData.answered_count,
      connected:userData.connected
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const countUsersInSession = async (sessionId) => {
  return await User.countDocuments({ session: sessionId });
};




export const handleConnectRequest = async (req, res) => {
  try {
    const { userId,email } = req.body
    if (!userId) {
      return res.status(403).json({ success: false, message: "Bad Request" })
    }
    const result = await User.findByIdAndUpdate(userId,
      { $set: { connected: true ,email:email} },
      { new: true })

    if (result) {
      res.status(200).json({ success: true, message: "Connection request received successfully" })
    }
    else {
      res.status(500).json({ success: false, message: "Something went wrong" })
    }
  }
  catch (err) {
    return res.status(500).json({ success: false, message: "Error connecting" })
  }
}