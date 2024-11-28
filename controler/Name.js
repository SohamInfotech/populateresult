let Usermodal = require('../modal/Name')
exports.createdata = async (req, res) => {
    // const { name, resultid } = req.body;
    try {
        const createdata = await Usermodal.create(req.body );
        res.status(200).json({
            status: "success",
            message: 'Data entered successfully',
            data: createdata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Data not entered",
        });
    }
};
exports.showdata = async (req, res) => {

    try {
        // const showdata = await Usermodal.find().populate('resultid'); 
    
        res.status(200).json({
            status: "success",
            message: 'All data fetched successfully',
            data: showdata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
            data: []
        });
    }
};
