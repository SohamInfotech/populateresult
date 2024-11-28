let Usermodal = require('../modal/Mark')

exports.createdata = async (req, res) => {
    const data = req.body
    try {
        const createdata = await Usermodal.create(data)
        res.status(200).json({
            status: "success",
            Message: 'data enter succes',
            Data: createdata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            Message: "not enter"
        })
    }
}
exports.showdata = async (req, res) => {
    // const showdata = await Usermodal.find()
  
    try {

        const showdata = await Usermodal.aggregate([
            {
                $lookup: {
                    from: 'names', // Correct field name
                    localField: 'resultid',
                    foreignField: '_id',
                    as: 'StudentInfo'
                }
            },
            {
                $unwind: '$StudentInfo'
            },
            {
                $addFields: {
                    Total: {
                        $add: ['$guj', '$eng', '$sci', '$ss', '$maths']
                    },
                    Percentage: {
                        $multiply: [
                            { $divide: [{ $add: ['$guj', '$eng', '$sci', '$ss', '$maths'] }, 500] },
                            100
                        ]
                    },
                    max: {
                        $max: ['$guj', '$eng', '$sci', '$ss', '$maths']
                    },
                    min: {
                        $min: ['$guj', '$eng', '$sci', '$ss', '$maths']
                    },
                },
            },
            {
                $addFields: {
                    Grade: {
                        $switch: {
                            branches: [
                                { case: { $gte: ['$Percentage', 90] }, then: 'A+' },
                                { case: { $gte: ['$Percentage', 80] }, then: 'A' },
                                { case: { $gte: ['$Percentage', 70] }, then: 'B+' },
                                { case: { $gte: ['$Percentage', 60] }, then: 'B' },
                                { case: { $gte: ['$Percentage', 50] }, then: 'C' },
                            ],
                            default: 'F',
                        },
                    },
                    Result: {
                        $cond: {
                            if: {
                                $and: [
                                    { $gte: ['$guj', 35] },
                                    { $gte: ['$eng', 35] },
                                    { $gte: ['$sci', 35] },
                                    { $gte: ['$ss', 35] },
                                    { $gte: ['$maths', 35] },
                                ],
                            },
                            then: 'Pass',
                            else: 'Fail',
                        },
                    },
                },
            }
        ]);

        res.status(200).json({
            status: "success",
            Message: 'all data show',
            Data: showdata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            Message: error.Message,
            data: []
        })
    }
}
