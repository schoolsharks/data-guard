import { QnaResponses } from '../models/qnaResponses.model.js';
import { User } from '../models/user.model.js';

const updateQnaResponse = async (req, res) => {
    try {
        const { id: userId, quesId, response } = req.body;
        
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }


        const { session: sessionId } = await User.findById(userId).select("session");
        if (!sessionId) {
            return res.status(404).json({ message: 'Session not found for the user.' });
        }


        let userResponse = await QnaResponses.findOne({ user: userId, session: sessionId });

        if (!userResponse) {
            const defaultResponses = [1, 2, 3, 4].map((id) => ({
                quesId: id,
                response: null,
            }));

            userResponse = await QnaResponses.create({
                user: userId,
                session: sessionId,
                responses: defaultResponses,
            });
        }


        if (quesId != null && ['YES', 'NO', ''].includes(response)) {
            userResponse.responses = userResponse.responses.map((resp) =>
                resp.quesId === quesId ? { ...resp, response } : resp
            );
            await userResponse.save();
        }


        const aggregationResult = await QnaResponses.aggregate([
            { $match: { session: sessionId } },
            { $unwind: '$responses' },
            {
                $group: {
                    _id: '$responses.quesId',
                    totalYes: {
                        $sum: { $cond: [{ $eq: ['$responses.response', 'YES'] }, 1, 0] }
                    },
                    totalAnswered: {
                        $sum: { $cond: [{ $ne: ['$responses.response', null] }, 1, 0] }
                    },
                }
            },
            {
                $project: {
                    _id: 1,
                    percentageYes: {
                        $cond: [
                            { $gt: ['$totalAnswered', 0] },
                            { $multiply: [{ $divide: ['$totalYes', '$totalAnswered'] }, 100] },
                            null,
                        ],
                    },
                },
            },
        ]);


        const questionStats = [1, 2, 3, 4].map((id) => {
            const stat = aggregationResult.find((res) => res._id === id);
            return {
                quesId: id,
                percentageYes: stat ? stat.percentageYes?.toFixed(2) : null,
            };
        });


        const userAnsweredQuestions = userResponse.responses.filter((resp) => resp.response !== null);
        const finalResult = questionStats.map((stat) => ({
            quesId: stat.quesId,
            percentageYes: userAnsweredQuestions.find((resp) => resp.quesId === stat.quesId)
                ? stat.percentageYes
                : null,
        }));

        return res.status(200).json({
            message: quesId != null ? 'Response updated successfully' : 'Average response retrieved successfully',
            data: finalResult,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { updateQnaResponse };
